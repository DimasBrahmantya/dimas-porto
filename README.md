<div align="center">

# Dimas Brahmantya Aryasena — Portfolio 2026

**Full-Stack Developer • Web Developer • Front-End & UI Engineer**

[![Next.js](https://img.shields.io/badge/Next.js-16.2-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

[**Live Portfolio**](https://dimasbas.vercel.app) · [**Project Archive**](https://dimasbas.vercel.app/projects) · [**LinkedIn**](https://www.linkedin.com/in/dimas-brahmantya-aryasena-169a51174/) · [**GitHub**](https://github.com/DimasBrahmantya)

</div>

---

## About

Personal portfolio of **Dimas Brahmantya Aryasena (Dimas Bas)**, a Full-Stack & Web Developer based in **South Jakarta, Indonesia** (Informatics Engineering graduate, Universitas Muhammadiyah Malang). Built with **Next.js App Router (Turbopack)**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion** to showcase deployed web applications, backend systems, and UI/UX case studies.

---

## Key Features

- **Scroll-Synced Navigation:** Floating pill navbar syncing active state across `Home`, `Works`, `About`, and `Contact` with a responsive mobile drawer.
- **Featured Works & Flagship Spotlight:** Editorial showcase on the homepage with category filtering (`All`, `Web App`, `UI/UX`) and direct GitHub & live demo links.
- **Searchable Project Archive (`/projects`):**
  - Real-time search by title, description, or tech stack.
  - Category filters and quick stack chips (`#Next.js`, `#Supabase`, `#Laravel`, `#NestJS`, `#Figma`, `#MongoDB`, `#TypeScript`).
  - **Project Detail Modal:** Full case study overview, key features, role, tech stack, and external links.
- **Direct Contact API (`/api/contact`):** Validated, rate-limited contact endpoint supporting Resend, Formspree, and FormSubmit with honeypot spam protection.
- **SEO & Accessibility:** Structured `JSON-LD` (`Person`, `WebSite`, `ProfilePage`), dynamic `sitemap.xml` & `robots.txt`, keyboard focus trapping, and `prefers-reduced-motion` support.

---

## Featured Projects (10 Works)

| Project | Category | Summary | Links |
| :--- | :---: | :--- | :--- |
| **LoyaltyCard Web App** *(Flagship)* | Web App | Multi-tenant digital loyalty stamp platform for SMEs (QR auto-stamp, Supabase PostgreSQL RLS, Atomic RPC) | [GitHub](https://github.com/DimasBrahmantya/loyaltycard) · [Live](https://loyaltycard-sable.vercel.app/) |
| **SIMRS Rawat Jalan** | Web App | Outpatient hospital registration system with doctor quota scheduling, NIK/Medical Record lookup, and live queue boards | [GitHub](https://github.com/DimasBrahmantya/Simrs-Rawat-Jalan.git) |
| **Secure Hub** | Web App | Anti-phishing URL scanner built with NestJS microservices, Next.js, and MongoDB | [GitHub](https://github.com/DimasBrahmantya/Secure-Hub.git) |
| **RSUD Grati Registration** | Web App | Outpatient clinic registration module for BPJS Kesehatan and general patient intake (Laravel, MySQL) | [GitHub](https://github.com/DimasBrahmantya/PendaftaranRawatJalan.git) |
| **Remadja.Inc Landing Page** | Web App | Responsive streetwear catalog and landing page with direct WhatsApp ordering | [GitHub](https://github.com/DimasBrahmantya/remadja-inc) · [Live](https://remadja-inc.vercel.app/) |
| **Rismansyah Portfolio** | Web App | Responsive software engineering portfolio with interactive project cards and career timeline | [GitHub](https://github.com/DimasBrahmantya/porto-aris) · [Live](https://rismansyah-portofolio.vercel.app/) |
| **Dimas Portfolio** | Web App | Personal Next.js portfolio with searchable project archive, editorial UI, and direct contact API | [GitHub](https://github.com/DimasBrahmantya/dimas-porto) · [Live](https://dimasbas.vercel.app/) |
| **Smart Laundry UI/UX** | UI/UX | Mobile laundry pickup booking and real-time washing status tracker prototype in Figma | [Figma Prototype](https://www.figma.com/proto/RyEi7OnUZznUxftePXkO9z/Smart-Laundry?node-id=15-6&p=f&t=BFnwWDWCeQl0zySa-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=15%3A6) |
| **Sale Pisang UI/UX** | UI/UX | Mobile e-commerce shopping prototype for regional banana snack SMEs with a 3-step checkout flow | [Figma Prototype](https://www.figma.com/proto/pO33hTo6vxXsdHI7UqNmmZ/sale-pisang-malang-web?node-id=1-3&p=f&t=VbTr62KlYEpm4D01-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1) |
| **Readly UI/UX** | UI/UX | Accessible digital library and customizable e-reader prototype designed in Figma | [Figma Prototype](https://www.figma.com/proto/dgaeEnl2KOLXDfcm1klSyY/IMK-Prototype?node-id=0-137&p=f&t=qPIvXnIm4UGve2yu-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=0%3A137) |

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **UI & Styling** | React 19, Tailwind CSS v4, Lucide React |
| **Animation** | Framer Motion |
| **Language** | TypeScript (Strict) |
| **Fonts** | `next/font/google` (Inter, Playfair Display, Barlow Condensed, JetBrains Mono) |
| **Deployment** | Vercel |

---

## Project Structure

```text
dimas-porto/
├── app/
│   ├── api/contact/
│   │   ├── route.ts             # Contact form API (Resend / Formspree / FormSubmit)
│   │   └── route.test.mjs       # Unit tests for validation, honeypot, and rate limiting
│   ├── projects/
│   │   ├── layout.tsx           # Project Archive metadata & Open Graph tags
│   │   └── page.tsx             # Searchable Project Archive
│   ├── globals.css              # Tailwind v4 theme & base styles
│   ├── layout.tsx               # Root layout, fonts, and Person/WebSite JSON-LD
│   ├── page.tsx                 # Homepage (Hero, Works, Profile, Contact)
│   ├── robots.ts                # robots.txt route
│   └── sitemap.ts               # sitemap.xml route
├── components/
│   ├── portfolio/               # Navbar, Hero, Projects, ProjectCard, Profile, Contact, Motion
│   ├── ui/                      # Button, Badge, Card, Dialog, Input, Textarea
│   └── ProjectDetailModal.tsx   # Case study modal
├── data/
│   └── projects.ts              # Centralized portfolio project data
├── lib/
│   ├── site.ts                  # Shared SITE_URL and CV_HREF constants
│   └── utils.ts                 # Class name helper
├── public/
│   └── projects/                # Project preview images & assets
└── types/
    └── project.ts               # TypeScript Project interface
```

---

## Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DimasBrahmantya/dimas-porto.git
   cd dimas-porto
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables (optional, for `/api/contact`):**
   Copy `.env.example` to `.env.local` and set `RESEND_API_KEY` (or `FORMSPREE_ENDPOINT`) and `CONTACT_RECIPIENT_EMAIL`.

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Test, lint, and build:**
   ```bash
   npm test
   npm run lint
   npm run build
   ```

---

## Contact

- **Email:** [dimasbrahmantyaaryasena@gmail.com](mailto:dimasbrahmantyaaryasena@gmail.com)
- **LinkedIn:** [Dimas Brahmantya Aryasena](https://www.linkedin.com/in/dimas-brahmantya-aryasena-169a51174/)
- **GitHub:** [@DimasBrahmantya](https://github.com/DimasBrahmantya)
- **Instagram:** [@dimasbas_](https://instagram.com/dimasbas_)
