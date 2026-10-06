<div align="center">

# Rahul Vishnuvardhana — Portfolio

Personal portfolio of **Rahul Vishnuvardhana**, a Machine Learning Engineer.
A clean, fast, single-page site with an editorial type system and a restrained black-and-purple theme.

**🔗 Live:** [rahulvishnuvardhana.vercel.app](https://rahulvishnuvardhana.vercel.app)

</div>

---

## ✨ Features

- **Single-page, single source of truth** — all content lives in one typed file ([`src/data/portfolio.ts`](src/data/portfolio.ts))
- **Light / dark mode** — toggled by the animated **R1** brand mark
- **Editorial type system** — Newsreader (serif headings), Inter (body), JetBrains Mono (metrics)
- **Subtle, purposeful motion** — blur-fade on scroll, count-up stats, flagship border-beam, scroll-spy nav, and a recolored glitch on the name/logo (all respect `prefers-reduced-motion`)
- **Fully responsive** and accessibility-minded

## 🛠️ Tech Stack

| Area | Tech |
|------|------|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) · React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion · [Lenis](https://lenis.darkroom.engineering/) smooth scroll |
| Fonts | Newsreader · Inter · JetBrains Mono (via `next/font`) |
| Deployment | Vercel |

## 🚀 Getting Started

```bash
# 1. clone
git clone https://github.com/rahulvishnuvardhana/portfolio.git
cd portfolio

# 2. install
npm install

# 3. run the dev server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build
```

## ✏️ Editing the content

Almost everything on the site (profile, about, projects, skills, experience, publications)
is driven by a single typed file — edit it and the whole page updates:

```text
src/data/portfolio.ts
```

Swap the photo at `public/me.jpeg`.

## 📁 Project Structure

```text
src/
├─ app/                 # layout, page, global styles, favicon (icon.svg), OG images
├─ components/site/     # all UI components (Hero, Projects, Skills, Contact, …)
└─ data/portfolio.ts    # ← all site content
public/                 # photo, static assets
```

## 📦 Deployment

Hosted on **Vercel**. Any push to `main` (once connected) or `vercel --prod` publishes a new build.

## 📄 License

The **code** is free to use as a template — fork it and replace the content.
The **content and personal branding** are © Rahul Vishnuvardhana; please don't reuse those verbatim.
