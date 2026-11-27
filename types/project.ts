export interface Project {
  id: string;
  title: string;
  type: string;
  category: "webapp" | "uiux";
  role?: string;
  desc: string;
  fullDescription: string;
  features: string[];
  tech: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  portrait?: boolean;
}

