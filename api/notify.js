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

    // ─── 1. Send Telegram Notification ────────────────────────────────────
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID   = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error("Missing Telegram env vars");
    } else {
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

      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'Markdown'
        })
      });
    }

    // ─── 2. Send to Google Sheets (via Apps Script) ───────────────────────
    const SHEETS_URL = process.env.GOOGLE_SCRIPT_URL;
    if (SHEETS_URL) {
      // Fire-and-forget — we don't await this to keep response fast
      fetch(SHEETS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).catch(err => console.error('Sheets error:', err));
    }

    return res.status(200).json({ status: 'success' });

  } catch (err) {
    console.error('Notify handler error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
