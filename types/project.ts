export type ProjectCategory = "all" | "webapp" | "uiux" | "academic" | "mobile";

export interface Project {
  id: string;
  slug: string;
  title: string;
  type: string;
  category: "webapp" | "uiux" | "academic" | "mobile";
  year: string;
  role?: string;
  desc: string;
  fullDescription: string;
  features: string[];
  tech: string[];
  image: string;
  link?: string;
  githubUrl?: string;
  liveUrl?: string;
  highlight?: boolean;
}

