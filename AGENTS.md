# AGENTS.md — FateLoop

> This file tells AI coding agents (Codex / Claude Code / etc.) how this project works.
> Read this before making any changes.

---

## What this project is

FateLoop is an AI-powered Chinese metaphysics divination web app for an overseas English-speaking audience. It offers AI-driven readings (Bazi, Zi Wei, Plum Blossom / I Ching, Five Elements, Tarot, Oracle sticks, Chinese zodiac, daily fortune). The flagship feature is "The Master" — a conversational AI fortune teller.

- **Live site**: https://fate-loop.vercel.app
- **Business goal**: Freemium → free trial questions → paid subscription. Optimize for conversion.
- **Target users**: overseas English speakers interested in Eastern mysticism.

---

## Tech stack

- **Frontend**: React 18 + Vite + React Router DOM
- **i18n**: react-i18next (EN/ZH toggle, localStorage key `yidu-lang`)
- **Backend**: Vercel Serverless Function at `api/chat.js`
- **AI**: Gemini 2.5 Flash via OpenAI-compatible endpoint
- **Hosting**: Vercel (custom domain bound)
- **Analytics**: PostHog (US region), key in `src/lib/analytics.js`

### Environment variables (set in Vercel dashboard + local `.env.local`)
- `ANTHROPIC_API_KEY` — actually a Gemini key (legacy name, do not rename)
- `API_BASE_URL` — default `https://generativelanguage.googleapis.com/v1beta/openai`
- `AI_MODEL` — default `gemini-2.5-flash`

Never commit `.env.local`. Never hardcode API keys in source.

---

## Project structure

```
fateloop/
├── api/chat.js              # Serverless AI endpoint. Takes { system, messages }, returns { text }
├── src/
│   ├── App.jsx              # Router root + SplashScreen wrapper
│   ├── main.jsx             # Entry. Inits PostHog, i18n, app.css
│   ├── app.css              # Global styles
│   ├── i18n/                # Internationalization config
│   ├── data/quotes.js       # Daily Wisdom quote bank + getDailyQuote()
│   ├── lib/analytics.js     # PostHog init + track() helper
│   ├── components/
│   │   ├── Layout.jsx       # Global frame: nebula bg, floating glass header, footer. Defines global .fl-* CSS classes
│   │   └── SplashScreen.jsx # 3-second mandala intro, plays every refresh
│   └── pages/
│       ├── Home.jsx         # Landing page
│       ├── Master.jsx       # AI master chat (core conversion page)
│       ├── Elements.jsx     # Five Elements
│       ├── ZodiacMatch.jsx  # Zodiac compatibility
│       ├── MeiHua.jsx       # Plum Blossom / I Ching
│       ├── Tarot.jsx        # Tarot
│       ├── Qian.jsx         # Oracle sticks
│       ├── Bazi.jsx         # Bazi compatibility
│       ├── Fortune.jsx      # Daily fortune
│       ├── Privacy.jsx      # Privacy policy
│       └── NotFound.jsx     # 404
├── vercel.json              # SPA rewrites (all routes → index.html, except /api)
└── vite.config.js
```

### Routes (defined in src/App.jsx)
```
/          Home
/master    Master (AI chat — primary CTA target)
/elements  Elements
/zodiac    ZodiacMatch
/meihua    MeiHua
/tarot     Tarot
/qian      Qian
/bazi      Bazi
/fortune   Fortune
/privacy   Privacy
*          NotFound
```

---

## Design system (V4 "Glass Nebula")

The current design is Apple-Vision-Pro-inspired glassmorphism over a deep cosmic nebula. DO NOT revert to the old black/red/gold "V2" theme — it was rejected for looking cheap.

### Color palette
```javascript
const gold = "#D4B07A";        // moonlit champagne gold (primary accent)
const goldLight = "#E8C99A";
const goldBright = "#F5E5C0";
const ivory = "#F5F1E8";        // warm ivory, main text
const ivorySoft = "rgba(245,241,232,0.7)";
const ivoryMute = "rgba(245,241,232,0.5)";
const ivoryDim = "rgba(245,241,232,0.3)";
// Red is mostly retired — use only sparingly for status (e.g. errors / depletion)
```

### Nebula background (defined in Layout.jsx)
```
radial-gradient purple (120,90,180) + amber (180,120,90) + blue (60,80,140) + gold (200,160,100)
over linear-gradient(#0A0612 → #050A18 → #07050F)
```

### Global CSS classes (defined in Layout.jsx, reusable on every page)
```
.fl-glass         standard frosted glass card
.fl-glass-strong  stronger blur, for featured cards
.fl-glass-pill    pill shape (header / buttons)
.fl-label         9px, letter-spacing 4px, uppercase, muted
.fl-serif         Cormorant Garamond serif
.fl-container     responsive width: 720 / 880 / 1080 / 1200 px breakpoints
```

### Fonts
- Headings / serif: `'Cormorant Garamond'`
- Body: `-apple-system, 'SF Pro Display', system-ui`

### Page styling rule
Because Layout.jsx renders the nebula background globally, individual pages should use `transparent` backgrounds and wrap content in `.fl-glass` classes to inherit the glass aesthetic. Do not hardcode opaque page backgrounds.

---

## Analytics events (PostHog)

Already tracked:
- `enter_reading_clicked` — Home CTA click
- `card_clicked` (with `{ card: id }`) — feature card click
- `master_message_sent` — user sends a message to The Master

When adding features, add a `track("event_name")` call via `import { track } from "../lib/analytics"` for any meaningful user action.

---

## Commands

```bash
npm install        # install deps
npm run dev        # local dev server at localhost:5173
npm run build      # production build — MUST pass before deploy
```

Deploy is done manually via Vercel CLI (`vercel --prod`) by the project owner. Do not assume CI auto-deploy.

---

## Rules for agents

1. **Always run `npm run build` and ensure it passes before proposing a PR.** A failing build must never be merged.
2. **One concern per PR.** Don't mix a feature + a refactor + a style change.
3. **Preserve the V4 glass design.** Match existing colors/classes. Never reintroduce the old red/gold theme.
4. **Never break the router.** `src/App.jsx` must keep all routes + the SplashScreen wrapper.
5. **Never commit secrets.** No API keys in source.
6. **Icon rendering**: use direct switch-based rendering (see Home.jsx CardIcon), never dynamic lookup like `icons[id]()` — that caused a crash before.
7. **Keep the AI endpoint contract stable**: `api/chat.js` expects `{ system, messages }` and returns `{ text }`. Master.jsx depends on this shape.
8. Use clear commit messages with prefixes: `feat:` / `fix:` / `style:` / `docs:`.

---

## Known pitfalls (learned the hard way)

- Dynamic icon lookup `icons[item.id]()` crashes if a key is missing → always use a `switch` with a default case.
- Chinese curly quotes `"`/`"` inside JS string literals break the build → use backticks or escape.
- The SplashScreen must remain crash-proof: wrap `sessionStorage`/`getDailyQuote` in try/catch.

---

## Current backlog (priority order)

1. Finish migrating all 8 feature pages to V4 glass style (Master/Tarot/Zodiac/Bazi/Elements/MeiHua/Qian/Fortune). Master is highest priority (conversion page).
2. Add "Free · 3 questions" limit to Master + a soft paywall prompt on hitting the limit. Track `hit_free_limit`.
3. Share-card generation (Master result → shareable image) for organic growth.
4. SEO meta tags (title / description / OG image).
5. (Later) User auth (Supabase) + Stripe subscription.
