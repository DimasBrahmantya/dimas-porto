import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Archive | Dimas Brahmantya Aryasena",
  description:
    "Searchable archive of built and deployed web applications, backend systems, and Figma UI/UX case studies by Dimas Brahmantya Aryasena (Dimas Bas).",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
