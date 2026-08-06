import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Dimas Brahmantya Aryasena | Front-End & UI/UX Developer",
  description: "Portfolio Neo-Brutalist Dimas Brahmantya Aryasena - Front End Developer & UI/UX Designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#fafafa] text-neutral-900 antialiased selection:bg-black selection:text-white">
        {children}
      </body>
    </html>
  );
}
