import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rohan P. Suresh — Full Stack Developer",
    short_name: "Rohan Suresh",
    description:
      "Full Stack Developer specializing in React, React Native, Next.js, Node.js & AI integration.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a12",
    theme_color: "#6366f1",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
