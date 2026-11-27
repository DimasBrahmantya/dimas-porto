import type { Metadata } from "next";

const ARCHIVE_TITLE = "Project Archive | Dimas Brahmantya Aryasena";
const ARCHIVE_DESCRIPTION =
  "Searchable archive of built and deployed web applications, backend systems, and Figma UI/UX case studies by Dimas Brahmantya Aryasena (Dimas Bas).";

export const metadata: Metadata = {
  title: ARCHIVE_TITLE,
  description: ARCHIVE_DESCRIPTION,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    type: "website",
    url: "/projects",
    title: ARCHIVE_TITLE,
    description: ARCHIVE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1917,
        height: 1047,
        alt: "Dimas Brahmantya Aryasena — Project Archive",
        type: "image/png",
      },
    ],
  },
};

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
