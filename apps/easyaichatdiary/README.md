# ✨ EasyAI Diary

**A complete, production-ready AI diary app — installable, offline-capable, and powered by Gemini.**

No backend. No database. No monthly costs. Just deploy and go.

---

## Why This Exists

People want to journal but don't stick with it. EasyAI Diary fixes that by turning journaling into a **conversation** — you chat with an AI that remembers your life, asks thoughtful questions, and generates summaries of your days, weeks, months, and years.

It's the simplest possible AI app: no accounts, no servers, no infrastructure. Everything runs on the user's device. They bring their own Gemini API key, and it just works.

---

## What You're Getting

This is not a template. This is a **complete, working product** ready to deploy.

### 🧠 AI-Powered Journaling
- **Conversational diary** — Chat with an AI assistant that adapts to your intent
- **Smart summaries** — Auto-generated daily, weekly, monthly, and yearly reflections
- **Conversation compression** — Long chats get intelligently compressed to save space
- **Context-aware** — The AI remembers your recent history and adjusts its responses

### 📱 Installable PWA
- **Add to home screen** — Works like a native app on any device
- **Offline support** — Browse past entries without internet (AI responses need connectivity)
- **Service worker caching** — Instant page loads after first visit
- **Responsive** — Built for mobile-first, works beautifully on desktop

### 🔔 Smart Notifications
- **Configurable reminders** — "Remind me every 2 hours between 9 AM and 9 PM"
- **Intelligent suppression** — No reminders on days you've already written
- **Friendly, rotating messages** — Not annoying, feels like a gentle nudge

### 🔐 Privacy-First Architecture
- **100% local storage** — All data lives in IndexedDB on the user's device
- **Bring-your-own API key** — Users provide their own Gemini key during onboarding
- **No accounts, no auth** — Zero server-side data collection
- **No backend costs** — Deploy as a static site, there's nothing to maintain

### 🎨 Polished UX
- **Multi-step onboarding** — API key setup → intent → notification preferences
- **Calendar view** — Browse entries by date
- **Message editing & deletion** — Full control over diary entries
- **Read-only past days** — Previous entries are preserved, current day is editable
- **Settings page** — Update API key, intent, and notifications at any time
- **Smooth animations** — Framer Motion transitions throughout

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 4 |
| **AI** | Google Gemini API (`@google/genai`) |
| **Storage** | IndexedDB via Dexie.js |
| **PWA** | `@ducanh2912/next-pwa` + Workbox |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |

Zero external services. Zero API routes. Zero server costs.

---

## Project Structure

```
app/
├── layout.tsx                    # Root layout with PWA metadata
├── page.tsx                      # Landing page with onboarding redirect
├── providers.tsx                 # IndexedDB + settings providers
├── schema.ts                     # Database schema definitions
├── notification-scheduler.tsx    # Background notification engine
├── globals.css
├── onboarding/page.tsx           # 4-step onboarding flow
├── chat/[date]/page.tsx          # Main diary chat interface
├── calendar/page.tsx             # Calendar date picker
└── settings/page.tsx             # User preferences
src/
├── ai/index.ts                   # All Gemini API calls (chat, summaries, compression)
├── settings/                     # Settings schema + provider
├── days/                         # Day/chat schema + provider
└── summaries/                    # Summary schema + provider
public/
├── manifest.json                 # PWA manifest
└── icons/                        # App icons
```

Clean, modular, easy to extend.

---

## Quick Start

```bash
git clone <repo>
npm install
npm run dev
```

Open `http://localhost:3000`. The onboarding flow handles everything — API key, intent, notifications.

For production:

```bash
npm run build
npm start
```

The PWA features (install prompt, offline, service worker) activate in production builds only.

---

## Deploy in 60 Seconds

**Vercel (recommended, free):**
```bash
npx vercel
```

That's it. No environment variables needed — users bring their own API key.

**Any static host:** Build with `npm run build` and deploy the output.

---

## What You Can Do With It

- **Sell it as-is** — Deploy, create a landing page, charge users a one-time fee
- **Add a paywall** — Gate the app behind Stripe/Gumroad checkout
- **White-label it** — Rebrand and resell as your own product
- **Extend it** — Add authentication, cloud sync, multiple diaries, image support
- **Publish it** — Wrap in a TWA and put it on Google Play Store ($25 one-time fee)
- **Use it yourself** — It's a genuinely good diary app

---

## License

You receive a **full, unrestricted license** to use, modify, resell, and distribute this codebase. No attribution required.

---

<p align="center">
  <strong>Questions?</strong> Reach out before you buy — I'm happy to answer anything.
</p>
