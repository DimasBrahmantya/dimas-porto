import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dimas Brahmantya Aryasena | Front-End & UI/UX Developer",
    short_name: "Dimas Portfolio",
    description: "Portfolio resmi Dimas Brahmantya Aryasena - Front-End Developer & UI/UX Designer Lulusan UMM.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafafa",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
