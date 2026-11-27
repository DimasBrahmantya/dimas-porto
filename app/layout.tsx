import type { Metadata } from "next";
import {
  Barlow_Condensed,
  Inter,
  JetBrains_Mono,
  Playfair_Display,
} from "next/font/google";
import { MotionProvider } from "@/components/portfolio/MotionProvider";
import { SITE_URL } from "@/lib/site";
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

const FULL_NAME = "Dimas Brahmantya Aryasena";
const ALTERNATE_NAMES = [
  "Dimas Bas",
  "Dimas Brahmantya",
  "Dimas Aryasena",
  "dimasbas",
  "dimasbas_",
];
const SITE_TITLE =
  "Dimas Brahmantya Aryasena (Dimas Bas) | Full Stack & Web Developer";
const SITE_DESCRIPTION =
  "Portfolio of Dimas Brahmantya Aryasena (Dimas Bas), Full Stack Developer & Web Developer (Next.js, Laravel, TypeScript) based in South Jakarta, with UI/UX prototyping as a supporting skill. Open to on-site Jakarta, remote, and freelance opportunities.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: "Dimas Bas Portfolio",
  authors: [{ name: FULL_NAME, url: SITE_URL }],
  creator: FULL_NAME,
  keywords: [
    FULL_NAME,
    ...ALTERNATE_NAMES,
    "Dimas Bas portfolio",
    "Full Stack Developer Jakarta",
    "Web Developer Jakarta",
    "Next.js Developer",
    "Laravel Developer",
    "Universitas Muhammadiyah Malang",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    firstName: "Dimas",
    lastName: "Brahmantya Aryasena",
    username: "dimasbas",
    locale: "en_US",
    alternateLocale: ["id_ID"],
    url: SITE_URL,
    siteName: "Dimas Brahmantya Aryasena Portfolio",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1917,
        height: 1047,
        alt: "Dimas Brahmantya Aryasena — Full Stack & Web Developer Creative Portfolio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  verification: {
    google: "xldoMSdwb1lUUzyqGUUnoJ1GeaNZkuhFRvzv9ikFwdA",
  },
};

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: FULL_NAME,
  alternateName: ALTERNATE_NAMES,
  givenName: "Dimas",
  familyName: "Aryasena",
  additionalName: "Brahmantya",
  url: SITE_URL,
  image: `${SITE_URL}/dimas-hero-cutout.png`,
  description: SITE_DESCRIPTION,
  nationality: { "@type": "Country", name: "Indonesia" },
  knowsAbout: [
    "Full Stack Development",
    "Web Development",
    "Next.js",
    "React",
    "Laravel",
    "TypeScript",
    "UI/UX Design",
  ],
  sameAs: [
    "https://github.com/DimasBrahmantya",
    "https://www.linkedin.com/in/dimas-brahmantya-aryasena-169a51174/",
    "https://instagram.com/dimasbas_",
  ],
  jobTitle: "Full Stack Developer & Web Developer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "South Jakarta",
    addressRegion: "Jakarta",
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
  alternateName: ["Dimas Bas", "Dimas Bas Portfolio"],
  url: SITE_URL,
  description:
    "Built and deployed web applications, backend systems, and UI/UX design case studies by Dimas Brahmantya Aryasena.",
  author: { "@id": `${SITE_URL}/#person` },
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
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#FAF8F4] text-[#111216] antialiased selection:bg-[#2563EB] selection:text-white">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
