# Landing Page Build Spec — airporttransfermorocco.com
## AI Prompt Document for Cursor (Claude Opus / Sonnet)

---

## HOW TO USE THIS FILE IN CURSOR

Open this file in Cursor, then paste this prompt to Claude:

> "Read this entire spec file and build the complete landing page as a single `index.html` file with all CSS and JS embedded. Follow every section, copy, and design instruction exactly. The page must be production-ready, mobile-first, fast-loading, and in French. Do not use any external CSS frameworks. Use Google Fonts only for typography."

---

## 1. PROJECT CONTEXT

**Domain:** airporttransfermorocco.com  
**Business:** Private airport transfer broker — Casablanca, Morocco  
**Target audience:** French tourists arriving at Casablanca Mohammed V Airport (CMN)  
**Primary goal:** Generate WhatsApp/form booking requests  
**Payment model:** Cash on arrival — no online payment required  
**Language:** French (primary), English fallback  
**Campaign source:** Google Ads (France targeting)

---

## 2. COMPETITIVE RESEARCH — WHAT TO STEAL FROM EACH COMPETITOR

### 2.1 navettecasablanca.com — What they do well
- Booking widget above the fold (From / To dropdowns + passenger count)
- TripAdvisor badge visible and prominent
- Lists specific hotel names (Sheraton, Sofitel, Hyatt, Four Seasons) — builds trust + SEO
- Lists specific Casablanca neighborhoods (Casanearshore, Sidi Maarouf, Marina)
- Prices displayed publicly (350 DH city center, etc.)
- Multiple vehicle categories with photos and prices
- WEAKNESS: Dated design, no clear CTA hierarchy, overwhelming options

### 2.2 casatransfers.com — What they do well
- Luxury visual identity — full-width car photos, cinematic hero
- Mercedes Vito prominently featured as premium signal
- Clear service breakdown with icons (airport, hotel, tours, events)
- WhatsApp button always visible
- Multilingual (FR/EN/ES)
- Driver name sign / meet & greet described in detail
- WEAKNESS: No prices, no online booking form, contact-only CTA, slow loading

### 2.3 transfers.ma — What they do well (BEST OVERALL — study closely)
- Multi-step booking widget (Route → Vehicle → Payment) above the fold
- Trust ticker bar scrolling: "4.8★ Trustpilot · Fixed price · Free flight tracking · WhatsApp 24/7"
- Per-vehicle pricing (not per person) — clear differentiator
- Free flight tracking prominently featured
- Small deposit + cash on arrival payment model
- FAQ section with real objection handling
- Real reviews with full name, date, and route details
- Popular routes section with prices
- Free cancellation 24h
- Trust signals stacked: Trustpilot + Google Reviews + review count
- WEAKNESS: Surf-niche focused, not optimized for Casablanca airport tourists

### 2.4 What NO competitor does well (our opportunity)
- NONE have a proper French-first landing page for Casablanca CMN
- NONE show the price immediately in the hero section
- NONE have a simple 1-page form that converts (they all redirect to contact pages)
- NONE emphasize "Cash on arrival — no credit card needed" as a headline benefit
- NONE have WhatsApp as a primary booking CTA with pre-filled message

---

## 3. PAGE DESIGN DIRECTION

**Aesthetic:** Luxury-minimal meets Moroccan warmth. Not generic SaaS white. Think: warm off-white background, deep charcoal text, gold accent, clean geometric sans-serif.

**Fonts (Google Fonts):**
- Headlines: `Playfair Display` — elegant, trustworthy, premium feel
- Body/UI: `DM Sans` — modern, readable, neutral

**Color palette:**
```css
--bg:          #FAF8F5;   /* warm off-white */
--bg-card:     #FFFFFF;
--text:        #1A1A1A;
--text-muted:  #6B6B6B;
--gold:        #C9A84C;   /* Moroccan gold accent */
--gold-light:  #F5EDD6;   /* gold tint for backgrounds */
--green:       #2D6A4F;   /* confirmation/trust */
--border:      #E8E2D9;
--shadow:      rgba(0,0,0,0.08);
```

**Mobile-first:** 100% of tourists arrive from their phone. Build for 375px width first, then scale up.

**Performance:** Single HTML file. No frameworks. No jQuery. Vanilla JS only. Images: use CSS gradients + emoji for icons (no icon libraries). Target: under 50kb total page weight for the HTML/CSS/JS.

---

## 4. PAGE STRUCTURE — SECTION BY SECTION

Build all sections in this exact order.

---

### SECTION 1: STICKY HEADER

**Left:** Logo — "Airport Transfer Morocco" in Playfair Display, gold color  
**Right:** WhatsApp button — green pill — "📱 WhatsApp" — links to `https://wa.me/212XXXXXXXXX?text=Bonjour%2C%20je%20voudrais%20réserver%20un%20transfert%20depuis%20l%27aéroport%20de%20Casablanca`

Header sticks on scroll. Thin gold line at the bottom. Background: `--bg` with blur backdrop-filter.

---

### SECTION 2: HERO — Above the fold

**Top trust bar** (small text above headline):
```
🇫🇷  Casablanca · Aéroport Mohammed V (CMN) → Votre hôtel
```

**Headline (H1, Playfair Display, large):**
```
Transfert Privé
Aéroport de Casablanca
```

**Subheadline (DM Sans):**
```
Chauffeur privé — Prix fixe — Disponible 24h/7
Paiement cash à l'arrivée · Confirmation WhatsApp en 15 min
```

**Price badge** (gold pill, prominent):
```
À partir de 480 DH — prix fixe, aucune surprise
```

**Trust pills row (horizontal scroll on mobile):**
```
✓ Vol suivi en temps réel   ✓ Panneau à votre nom   ✓ Chauffeur francophone   ✓ Annulation gratuite   ✓ Pas de carte bancaire
```

**Primary CTA button (gold, large, full-width on mobile):**
```
📋 Réserver maintenant — c'est gratuit
```
Scrolls to booking form section.

**Secondary CTA (text link style):**
```
💬 Ou réservez via WhatsApp →
```

**Below hero — 3 stat cards:**
```
[24/7]              [Prix fixe]             [15 min]
Disponible          Convenu avant           Confirmation
à toute heure       de monter en voiture    WhatsApp garantie
```

---

### SECTION 3: SCROLLING TRUST TICKER

Full-width, `--gold-light` background, infinite horizontal CSS animation. Content:
```
★★★★★ Noté 5/5 sur Google  ·  Prix fixe garanti  ·  Suivi de vol inclus  ·  Chauffeur francophone  ·  Paiement cash à l'arrivée  ·  Annulation gratuite 24h avant  ·  WhatsApp 24h/7  ·  Siège enfant gratuit  ·
```

Use CSS `@keyframes` with `translateX`. Duplicate the content string twice so the loop is seamless.

---

### SECTION 4: BOOKING FORM (THE CONVERSION ENGINE)

Clean card with gold top border (4px solid `--gold`).

**Card title:** "Réservez votre transfert"  
**Subtitle:** "Gratuit · Sans carte bancaire · Confirmation sous 15 min"

**Form fields:**

```
Row 1 (2 cols on desktop, 1 col on mobile):
[Type de transfert ▼]                [Nombre de passagers ▼]
  - Aéroport → Hôtel                   - 1 personne
  - Hôtel → Aéroport                   - 2 personnes
  - Aller-retour                        - 3 personnes
                                        - 4 personnes
                                        - 5-7 personnes (minivan)

Row 2 (2 cols on desktop):
[Date d'arrivée 📅]                  [Heure d'atterrissage 🕐]
type="date"                          type="time"

Row 3 (full width):
[Numéro de vol]
placeholder="Optionnel — ex: AT602 — nous suivons votre vol en cas de retard"

Row 4 (full width):
[Hôtel / adresse de destination à Casablanca]
placeholder="ex: Hyatt Regency, Four Seasons, Anfa Place, Marina..."

Row 5 (2 cols on desktop):
[Prénom et nom]                      [Numéro WhatsApp]
placeholder="Votre nom complet"      placeholder="+33 6 XX XX XX XX"

Row 6 (full width):
[Remarques]
textarea, placeholder="Siège enfant, bagages supplémentaires, heure exacte de pickup..."
```

**Dynamic price estimator** (updates via JS on field change):
```
┌─────────────────────────────────────────────────────────┐
│  Prix estimé : 480 MAD                                  │
│  Prix fixe · Convenu avant votre montée en voiture      │
│  Paiement cash au chauffeur à l'arrivée                 │
└─────────────────────────────────────────────────────────┘
```

Price logic (JS):
- 1-3 passagers: **480 MAD** (berline)
- 4-7 passagers: **650 MAD** (minivan)
- Aller-retour: multiply base price × 1.8, round to nearest 10

**Submit button (gold, full-width, 56px height):**
```
Envoyer ma demande de réservation →
```

**Below submit:**
```
🔒 Aucune carte bancaire requise
✓ Vous payez cash au chauffeur à l'arrivée
✓ Nous vous confirmons par WhatsApp dans les 15 min
```

**On form submit (JS):**
1. Validate required fields: type, date, heure, hotel, nom, tel
2. If invalid: highlight fields red with error messages
3. If valid: show success overlay message, then open WhatsApp with pre-filled message

**WhatsApp URL:**
```
https://wa.me/212XXXXXXXXX?text=ENCODED_MESSAGE
```

**Message template:**
```
Bonjour Airport Transfer Morocco 👋

Je souhaite réserver un transfert :

🚗 Type : {type}
👥 Passagers : {pax}
📅 Date : {date}
🕐 Heure d'atterrissage : {heure}
✈️ Numéro de vol : {vol}
🏨 Destination : {hotel}

👤 Nom : {nom}
📱 Téléphone : {tel}

💬 Remarques : {remarques}

Merci de confirmer la disponibilité et le prix.
```

---

### SECTION 5: WHY CHOOSE US

Section title (Playfair Display): "Pourquoi les voyageurs nous choisissent"

**6 feature cards in 2×3 grid (desktop: 3×2):**

```
💎 Prix fixe garanti
Votre prix est confirmé avant de monter dans le véhicule.
Aucun compteur, aucune mauvaise surprise à l'arrivée.

✈️ Suivi de vol en temps réel
Votre chauffeur suit votre vol en direct. En cas de retard,
il vous attend sans frais supplémentaires.

🪧 Accueil personnalisé
Votre chauffeur vous attend à la sortie des arrivées
avec un panneau à votre nom.

💬 Confirmation WhatsApp en 15 min
Réservez en ligne ou par WhatsApp. Confirmation garantie
en moins de 15 minutes.

💵 Paiement cash à l'arrivée
Pas besoin de carte bancaire. Vous payez directement
au chauffeur en dirhams marocains.

🌍 Chauffeur francophone & anglophone
Tous nos chauffeurs parlent français et anglais couramment.
Aucune barrière de langue.
```

---

### SECTION 6: VEHICLES & PRICES

Section title: "Nos véhicules & tarifs"

**3 vehicle cards (horizontal on desktop, stacked on mobile):**

```
Card 1:
🚗 BERLINE CONFORT
1 à 3 passagers · Toyota Camry ou similaire
✓ Climatisation  ✓ WiFi disponible  ✓ 3 valises incluses
Prix : À partir de 480 MAD
[Réserver cette voiture] → scrolls to form, pre-selects berline

Card 2 (most popular badge):
🚐 MINIVAN FAMILIAL  ← badge "Le plus demandé"
4 à 7 passagers · Mercedes Vito ou similaire
✓ Climatisation  ✓ Espace bagages XL  ✓ Idéal familles
Prix : À partir de 650 MAD
[Réserver cette voiture] → scrolls to form, pre-selects minivan

Card 3:
⭐ ALLER-RETOUR
Arrivée + Départ · Meilleur rapport qualité/prix
✓ 2 transferts inclus  ✓ Chauffeur dédié  ✓ Économisez 20%
Prix : À partir de 850 MAD
[Réserver aller-retour] → scrolls to form, pre-selects aller-retour
```

---

### SECTION 7: POPULAR ROUTES WITH PRICES

Section title: "Destinations depuis l'aéroport CMN"

**Route list (clean table/card style):**
```
✈️ Aéroport CMN → Centre-ville Casablanca      480 MAD    ~35 min
✈️ Aéroport CMN → Ain Diab / Corniche          480 MAD    ~40 min
✈️ Aéroport CMN → Sidi Maarouf / Casanearshore 450 MAD    ~25 min
✈️ Aéroport CMN → Marina de Casablanca         480 MAD    ~35 min
✈️ Aéroport CMN → Mohammedia                   550 MAD    ~30 min
✈️ Aéroport CMN → Rabat Centre                 900 MAD    ~1h15
✈️ Aéroport CMN → Marrakech                  1 800 MAD    ~3h30
✈️ Aéroport CMN → Essaouira                  2 200 MAD    ~5h00
```

Note below: "* Prix par véhicule, pas par personne. Confirmé avant votre montée. Pour d'autres destinations, contactez-nous sur WhatsApp."

---

### SECTION 8: HOW IT WORKS — 4 STEPS

Section title: "Comment ça marche"

**4 numbered steps with connecting line on desktop:**

```
① Réservez en ligne
Remplissez le formulaire ou envoyez-nous un message WhatsApp en 2 minutes.

② Confirmation sous 15 min
Notre équipe confirme votre réservation et vous envoie les détails du chauffeur.

③ Arrivée à Casablanca
Votre chauffeur vous attend à la sortie des arrivées avec votre nom sur un panneau.

④ Payez à l'arrivée
Vous réglez en cash directement au chauffeur. Pas de carte bancaire, pas de surprise.
```

---

### SECTION 9: REVIEWS

Section title: "Ce que disent nos voyageurs"

**Star rating header:** ★★★★★  Noté 5/5 · Google Reviews · TripAdvisor

**3 review cards:**

```
★★★★★
"Chauffeur à l'heure malgré notre retard de vol. Panneau à notre nom,
voiture propre, et un prix exactement comme convenu. Parfait du début
à la fin. Je recommande sans hésitation pour un transfert depuis
l'aéroport de Casablanca."
— Sophie M. · Paris, France · Janvier 2025

★★★★★
"Réservé la veille via WhatsApp, réponse en 10 minutes. Le chauffeur
parlait parfaitement français, très professionnel. Trajet confortable
jusqu'à l'Hyatt Regency. Prix honnête et fixe. On utilisera ce service
à chaque voyage au Maroc."
— Thomas & Julie B. · Lyon, France · Mars 2025

★★★★★
"Famille de 5 avec beaucoup de bagages. Le minivan était parfait,
chauffeur ponctuel et sympa. Il a attendu 40 minutes supplémentaires
sans frais vu le retard de notre vol. Un service vraiment fiable."
— Famille Lacoste · Bordeaux, France · Novembre 2024
```

---

### SECTION 10: FAQ ACCORDION

Section title: "Questions fréquentes"

**8 questions, accordion (one open at a time, smooth CSS transition):**

```
Q: Comment puis-je payer ?
A: Vous payez directement en cash au chauffeur à l'arrivée, en dirhams marocains (MAD).
   Aucune carte bancaire n'est nécessaire. Le prix est confirmé avant votre montée
   dans le véhicule — pas de mauvaises surprises.

Q: Que se passe-t-il si mon vol est retardé ?
A: Nous suivons votre vol en temps réel grâce à votre numéro de vol. Votre chauffeur
   ajuste son heure d'arrivée automatiquement et vous attend sans frais supplémentaires
   pour un retard standard.

Q: Comment mon chauffeur me reconnaîtra-t-il à l'aéroport ?
A: Votre chauffeur vous attendra à la sortie des arrivées avec un panneau portant votre
   nom, bien visible. Vous n'avez qu'à suivre les indications vers la zone des arrivées.

Q: Combien de bagages puis-je apporter ?
A: Berline : jusqu'à 3 valises standard. Minivan : bagages XL pour les groupes.
   Si vous avez des bagages exceptionnels, mentionnez-le dans les remarques.

Q: Puis-je annuler ou modifier ma réservation ?
A: Oui, l'annulation est gratuite jusqu'à 24h avant votre transfert.
   Envoyez-nous simplement un message WhatsApp.

Q: Le service est-il disponible de nuit ?
A: Oui, 24h/7, 365 jours par an. Que votre vol arrive à 3h du matin ou à 23h,
   votre chauffeur sera là.

Q: Acceptez-vous les groupes ?
A: Oui. Pour les groupes de 4 à 7 personnes, nous mettons à disposition un minivan
   spacieux. Pour les groupes plus importants (+8 personnes), contactez-nous sur
   WhatsApp pour un devis personnalisé.

Q: Comment réserver un aller-retour ?
A: Sélectionnez "Aller-retour" dans le formulaire de réservation. Vous bénéficiez
   d'un tarif préférentiel et d'un service cohérent avec le même chauffeur si possible.
```

---

### SECTION 11: WHATSAPP STICKY CTA

**Floating button (fixed bottom-right, always visible on mobile):**
- Green circle, WhatsApp icon (SVG inline)
- Tooltip on hover: "Répondons en 15 min"
- Links to WhatsApp pre-filled message

**Full-width CTA banner before footer:**
```
Prêt à réserver votre transfert ?
Répondons en 15 minutes sur WhatsApp.

[📋 Formulaire de réservation]    [💬 WhatsApp direct]
```

---

### SECTION 12: FOOTER

```
Airport Transfer Morocco
Casablanca, Maroc

📞 WhatsApp : +212 6XX XXX XXX
📧 contact@airporttransfermorocco.com

Services :
Transfert aéroport Casablanca · Transfert hôtel Casablanca
Excursions depuis Casablanca · Transport groupe Maroc

© 2025 Airport Transfer Morocco — Tous droits réservés
```

---

## 5. TECHNICAL SPECIFICATIONS

### File structure
```
index.html    ← Single file, all CSS + JS embedded
```

### HTML requirements
- `lang="fr"` on `<html>`
- Full `<head>` with SEO meta tags (see below)
- Schema.org LocalBusiness JSON-LD
- Open Graph tags for social sharing
- Mobile viewport meta tag
- Canonical URL

### SEO meta tags
```html
<title>Transfert Aéroport Casablanca — Chauffeur Privé CMN | Prix Fixe 24h/7</title>
<meta name="description" content="Transfert privé depuis l'aéroport Mohammed V de Casablanca vers votre hôtel. Prix fixe à partir de 480 DH. Chauffeur francophone, disponible 24h/7. Paiement cash à l'arrivée. Réservation WhatsApp en 2 minutes.">
<meta name="keywords" content="transfert aéroport casablanca, taxi aéroport casablanca, navette CMN casablanca, chauffeur privé aéroport maroc, transfert mohammed V casablanca">
<link rel="canonical" href="https://airporttransfermorocco.com/">
<meta property="og:title" content="Transfert Aéroport Casablanca — Prix Fixe 480 DH">
<meta property="og:description" content="Chauffeur privé depuis l'aéroport CMN. Paiement cash. Confirmation WhatsApp en 15 min.">
<meta property="og:url" content="https://airporttransfermorocco.com/">
<meta property="og:type" content="website">
```

### Schema.org JSON-LD
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Airport Transfer Morocco",
  "description": "Service de transfert privé depuis l'aéroport Mohammed V de Casablanca.",
  "url": "https://airporttransfermorocco.com",
  "telephone": "+212XXXXXXXXX",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Casablanca",
    "addressCountry": "MA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 33.5731,
    "longitude": -7.5898
  },
  "openingHours": "Mo-Su 00:00-24:00",
  "priceRange": "480-2200 MAD",
  "areaServed": "Casablanca, Morocco"
}
```

### JavaScript requirements
- Form validation (required fields + phone format)
- Dynamic price calculator (updates on vehicle type / pax count change)
- FAQ accordion (smooth max-height CSS transition, one open at a time)
- WhatsApp message pre-fill from all form data
- Smooth scroll to form on all CTA button clicks
- Trust ticker infinite CSS scroll
- Sticky header shadow after 60px scroll
- Vehicle card buttons pre-select correct option in the form

### CSS requirements
- CSS custom properties (variables) for all colors and spacing
- Mobile-first media queries: `min-width: 768px` and `min-width: 1024px`
- Flexbox and CSS Grid for layout
- `@keyframes ticker` for trust ticker infinite scroll
- Smooth hover transitions on all interactive elements (0.2s ease)
- No external CSS dependencies
- Google Fonts via `<link>` in `<head>`:
  - `Playfair Display`: weights 400, 600, 700
  - `DM Sans`: weights 300, 400, 500
  - Add `&display=swap` to font URL

---

## 6. FORM PRICE CALCULATOR LOGIC

```javascript
function calculatePrice(type, pax) {
  const numPax = parseInt(pax) || 1;
  let basePrice = numPax <= 3 ? 480 : 650;
  if (type === 'aller-retour') {
    basePrice = Math.round(basePrice * 1.8 / 10) * 10;
  }
  return basePrice;
}

// Update estimator whenever type or pax changes
['transferType', 'passengers'].forEach(id => {
  document.getElementById(id).addEventListener('change', () => {
    const type = document.getElementById('transferType').value;
    const pax = document.getElementById('passengers').value;
    const price = calculatePrice(type, pax);
    document.getElementById('priceEstimate').textContent = price.toLocaleString('fr-FR') + ' MAD';
  });
});
```

---

## 7. WHATSAPP MESSAGE BUILDER

```javascript
const WHATSAPP_NUMBER = "212XXXXXXXXX";

function buildWhatsAppMessage(data) {
  return encodeURIComponent(
`Bonjour Airport Transfer Morocco 👋

Je souhaite réserver un transfert :

🚗 Type : ${data.type}
👥 Passagers : ${data.pax}
📅 Date : ${data.date}
🕐 Heure d'atterrissage : ${data.heure}
✈️ Numéro de vol : ${data.vol || 'Non renseigné'}
🏨 Destination : ${data.hotel}

👤 Nom : ${data.nom}
📱 Téléphone : ${data.tel}

💬 Remarques : ${data.remarques || 'Aucune'}

Merci de confirmer la disponibilité et le prix.`
  );
}

function submitBooking(e) {
  e.preventDefault();
  // 1. Validate
  // 2. Build message
  // 3. Show success overlay
  // 4. Open WhatsApp
  const msg = buildWhatsAppMessage(getFormData());
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  // Also track conversion if Google Ads is set up
  if (typeof gtag !== 'undefined') {
    gtag('event', 'conversion', { send_to: 'AW-XXXXXXXXXX/XXXXXXXXXX' });
  }
}
```

---

## 8. PERFORMANCE CHECKLIST

Before finalizing, verify:

- [ ] Page loads under 2 seconds on mobile 3G
- [ ] Form submits correctly to WhatsApp with all data
- [ ] Price calculator updates in real time
- [ ] Sticky WhatsApp button visible at all times on mobile
- [ ] Trust ticker scrolls infinitely without JS
- [ ] FAQ accordion works without page jump
- [ ] No horizontal scroll on mobile (overflow-x hidden on body)
- [ ] CTA buttons minimum 48px height (mobile touch target)
- [ ] Input fields minimum 16px font-size (prevents iOS auto-zoom)
- [ ] Smooth scroll works on all form anchor links
- [ ] Google Fonts load with font-display: swap
- [ ] All links open correctly (WhatsApp, tel:, mailto:)

---

## 9. CONTENT TO REPLACE BEFORE GOING LIVE

| Placeholder | Real value needed |
|---|---|
| `212XXXXXXXXX` | Your WhatsApp Business number |
| `contact@airporttransfermorocco.com` | Your actual email |
| `AW-XXXXXXXXXX/XXXXXXXXXX` | Google Ads conversion ID |
| `G-XXXXXXXXXX` | Google Analytics ID |
| Review dates | Update to current year once real reviews come in |

---

## 10. GOOGLE ADS TRACKING SNIPPET

Add before `</head>`:

```html
<!-- Google tag — replace with your actual IDs -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 11. FINAL INSTRUCTION TO CURSOR / CLAUDE

**Use Claude Opus for the initial full build.**  
**Use Claude Sonnet for bug fixes, revisions, and mobile polish.**

Build the complete `index.html` file following every section above. Output requirements:

1. Single self-contained HTML file — `index.html`
2. All CSS inside `<style>` in `<head>`
3. All JS inside `<script>` before `</body>`
4. Google Fonts via `<link>` only — no other external dependencies
5. No frameworks, no jQuery, no Alpine, no Bootstrap
6. Fully responsive: 320px → 1440px
7. Production-ready — no lorem ipsum, all content from this spec
8. All French copy exactly as written above
9. Clean commented code sections for easy editing in WordPress
10. WhatsApp number as `212XXXXXXXXX` (easy to find/replace)
11. Placeholder Google Analytics and Ads IDs clearly marked

**The single most important thing:** The booking form must work perfectly on mobile and open WhatsApp with the pre-filled message. That is the entire conversion funnel.
