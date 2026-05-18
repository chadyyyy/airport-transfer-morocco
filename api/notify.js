// Vercel Serverless Function — /api/notify.js
// Telegram token stored securely in Vercel environment variables.
// Call this from the frontend with: fetch('/api/notify', { method: 'POST', body: JSON.stringify(data) })

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const data = req.body;

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID   = process.env.TELEGRAM_CHAT_ID;
    const SHEETS_URL = process.env.GOOGLE_SCRIPT_URL;
    
    const tasks = [];

    // ─── 1. Telegram Notification Task ────────────────────────────────────
    if (BOT_TOKEN && CHAT_ID) {
      const message =
        `🚨 *Nouvelle Réservation (Site Web)* 🚨\n\n` +
        `👤 *Client :* ${data.name}\n` +
        `📱 *WhatsApp :* ${data.phone}\n` +
        `🔄 *Trajet :* ${data.direction}\n` +
        `📅 *Date :* ${data.date} à ${data.time}\n` +
        `📍 *Hôtel/Dest :* ${data.hotel}\n` +
        `✈️ *Vol :* ${data.flight || 'Non précisé'}\n` +
        `👥 *Passagers :* ${data.pax}\n` +
        `💰 *Prix Fixé :* ${data.price}`;

      const telegramTask = fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'Markdown'
        })
      }).catch(err => console.error('Telegram error:', err));
      
      tasks.push(telegramTask);
    } else {
      console.error("Missing Telegram env vars");
    }

    // ─── 2. Google Sheets Task ────────────────────────────────────────────
    if (SHEETS_URL) {
      const sheetsTask = fetch(SHEETS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).catch(err => console.error('Sheets error:', err));
      
      tasks.push(sheetsTask);
    } else {
      console.error("Missing Google Sheets env var");
    }

    // Await ALL tasks before returning. Serverless functions kill background tasks instantly on return!
    await Promise.allSettled(tasks);

    return res.status(200).json({ status: 'success' });

  } catch (err) {
    console.error('Notify handler error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
