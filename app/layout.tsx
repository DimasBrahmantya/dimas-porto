import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dimas Brahmantya Aryasena – Portfolio 2026",
  description:
    "Portfolio Dimas Brahmantya Aryasena – Full Stack Developer, Web Developer & Front-End Developer. Lulusan Teknik Informatika UMM (IPK 3.80).",
};

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dimas Brahmantya Aryasena",
  url: "https://dimasbrahmantyaaryasena.vercel.app",
  email: "dimasbrahmantyaaryasena@gmail.com",
  sameAs: [
    "https://github.com/DimasBrahmantya",
    "https://www.linkedin.com/in/dimas-brahmantya-aryasena-169a51174/",
    "https://instagram.com/dimasbas_",
  ],
  jobTitle: "Full Stack Developer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Universitas Muhammadiyah Malang",
  },
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Portfolio Dimas Brahmantya Aryasena",
  url: "https://dimasbrahmantyaaryasena.vercel.app",
  description:
    "Portfolio dan karya Dimas Brahmantya Aryasena – Full Stack Developer, Web Developer & Front-End Developer.",
};

const jsonLdProfilePage = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Portfolio 2026 – Dimas Brahmantya Aryasena",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
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
      <body className="min-h-full flex flex-col font-sans bg-[#060b13] text-slate-100 antialiased selection:bg-cyan-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
