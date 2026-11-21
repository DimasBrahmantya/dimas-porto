import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Archive | Dimas Brahmantya Aryasena",
  description:
    "Searchable archive of production web applications, microservices architecture, and Figma UI/UX case studies by Dimas Brahmantya Aryasena.",
};

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
