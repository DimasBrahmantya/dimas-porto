import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = "https://dimas-portfolio-smoky.vercel.app";

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dimas Brahmantya Aryasena | Front-End Developer & UI/UX Designer",
    template: "%s | Dimas Brahmantya Aryasena",
  },
  description:
    "Portfolio resmi Dimas Brahmantya Aryasena - Front-End Web Developer & UI/UX Designer. Lulusan Teknik Informatika Universitas Muhammadiyah Malang (IPK 3.80) berpengalaman dalam Next.js, React, TypeScript, Laravel, NestJS, Tailwind CSS, dan Figma UI/UX.",
  keywords: [
    "Dimas Brahmantya Aryasena",
    "Dimas Brahmantya",
    "DimasBas",
    "Dimas",
    "Dimas Portfolio",
    "Portfolio Dimas",
    "Dimas Brahmantya UMM",
    "Dimas Brahmantya Developer",
    "Front End Developer Malang",
    "Front End Developer Pasuruan",
    "UI UX Designer Malang",
    "Teknik Informatika UMM",
    "RSUD Grati Developer",
    "Next.js Developer Indonesia",
    "React Developer Indonesia",
    "Portfolio Neo Brutalism",
    "Software Engineer Portfolio",
  ],
  authors: [{ name: "Dimas Brahmantya Aryasena", url: siteUrl }],
  creator: "Dimas Brahmantya Aryasena",
  publisher: "Dimas Brahmantya Aryasena",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Dimas Brahmantya Aryasena | Front-End Developer & UI/UX Designer",
    description:
      "Portfolio resmi Dimas Brahmantya Aryasena - Front-End Web Developer & UI/UX Designer. Lulusan Teknik Informatika UMM (IPK 3.80) berpengalaman dalam web app modern.",
    url: siteUrl,
    siteName: "Dimas Brahmantya Aryasena Portfolio",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dimas Brahmantya Aryasena | Front-End Developer & UI/UX Designer",
    description:
      "Portfolio resmi Dimas Brahmantya Aryasena - Front-End Web Developer & UI/UX Designer. Lulusan Teknik Informatika UMM (IPK 3.80).",
    creator: "@dimasbas_",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdPerson = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: "Dimas Brahmantya Aryasena",
    givenName: "Dimas Brahmantya",
    familyName: "Aryasena",
    alternateName: ["Dimas Brahmantya", "DimasBas", "Dimas"],
    url: siteUrl,
    image: `${siteUrl}/opengraph-image`,
    jobTitle: "Front-End Web Developer & UI/UX Designer",
    description:
      "Front-End Developer & UI/UX Designer lulusan Teknik Informatika Universitas Muhammadiyah Malang (IPK 3.80). Berfokus pada antarmuka web modern, presisi, dan responsif.",
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Universitas Muhammadiyah Malang",
      sameAs: "https://www.umm.ac.id/",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pasuruan",
      addressRegion: "Jawa Timur",
      addressCountry: "ID",
    },
    knowsAbout: [
      "Front-End Web Development",
      "UI/UX Design",
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Laravel",
      "NestJS",
      "Figma",
      "HTML5",
      "CSS3",
      "JavaScript",
    ],
    sameAs: [
      "https://github.com/DimasBrahmantya",
      "https://www.linkedin.com/in/dimas-brahmantya-aryasena-169a51174/",
      "https://instagram.com/dimasbas_",
    ],
  };

  const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: "Dimas Brahmantya Aryasena Portfolio",
    alternateName: ["Dimas Portfolio", "DimasBas Portfolio"],
    description: "Portfolio resmi Dimas Brahmantya Aryasena - Front-End Web Developer & UI/UX Designer.",
    publisher: {
      "@id": `${siteUrl}/#person`,
    },
    inLanguage: "id-ID",
  };

  const jsonLdProfilePage = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteUrl}/#webpage`,
    url: siteUrl,
    name: "Dimas Brahmantya Aryasena | Front-End Developer & UI/UX Designer",
    isPartOf: {
      "@id": `${siteUrl}/#website`,
    },
    about: {
      "@id": `${siteUrl}/#person`,
    },
    mainEntity: {
      "@id": `${siteUrl}/#person`,
    },
    inLanguage: "id-ID",
  };

  return (
    <html
      lang="id"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProfilePage) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#fafafa] text-neutral-900 antialiased selection:bg-black selection:text-white">
        {children}
      </body>
    </html>
  );
}
