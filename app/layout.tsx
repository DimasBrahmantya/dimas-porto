import type { Metadata } from "next";
import {
  Barlow_Condensed,
  Inter,
  JetBrains_Mono,
  Playfair_Display,
} from "next/font/google";
import { MotionProvider } from "@/components/portfolio/MotionProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dimas Brahmantya Aryasena | Full Stack Developer & Web Developer",
  description:
    "Portfolio of Dimas Brahmantya Aryasena, Full Stack Developer & Web Developer (Next.js, Laravel, TypeScript) based in South Jakarta, with UI/UX prototyping as a supporting skill. Open to on-site Jakarta, remote, and freelance opportunities.",
};

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dimas Brahmantya Aryasena",
  url: "https://dimasbrahmantyaaryasena.vercel.app",
  sameAs: [
    "https://github.com/DimasBrahmantya",
    "https://www.linkedin.com/in/dimas-brahmantya-aryasena-169a51174/",
    "https://instagram.com/dimasbas_",
  ],
  jobTitle: "Full Stack Developer & Web Developer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jakarta Selatan",
    addressRegion: "DKI Jakarta",
    addressCountry: "ID",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Universitas Muhammadiyah Malang",
  },
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Dimas Brahmantya Aryasena Portfolio",
  url: "https://dimasbrahmantyaaryasena.vercel.app",
  description:
    "Built and deployed web applications, backend systems, and UI/UX design case studies by Dimas Brahmantya Aryasena.",
};

const jsonLdProfilePage = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Creative & Engineering Portfolio: Dimas Brahmantya Aryasena",
  url: "https://dimasbrahmantyaaryasena.vercel.app",
  mainEntity: {
    "@type": "Person",
    name: "Dimas Brahmantya Aryasena",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${barlowCondensed.variable} ${jetbrainsMono.variable} antialiased`}
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
      <body className="min-h-full flex flex-col font-sans bg-[#FAF8F4] text-[#111216] antialiased selection:bg-[#2563EB] selection:text-white">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
