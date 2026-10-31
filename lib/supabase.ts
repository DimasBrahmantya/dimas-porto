import { Project } from "@/types/project";
import { projectsData } from "@/data/projects";

/**
 * Helper to fetch projects data.
 * Defaults to the rich local projectsData.
 * If Supabase environment variables are configured, it can fetch from the 'projects' table.
 */
export async function getProjects(): Promise<Project[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // Return structured local data
    return projectsData;
  }

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/projects?select=*&order=year.desc`, {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.warn("Supabase fetch failed, falling back to local projects data:", res.statusText);
      return projectsData;
    }

    const data: Project[] = await res.json();
    return data && data.length > 0 ? data : projectsData;
  } catch (error) {
    console.error("Error fetching projects from Supabase, using local fallback:", error);
    return projectsData;
  }
}

