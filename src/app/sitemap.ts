import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "",
    "/how-it-works",
    "/channels",
    "/use-cases",
    "/pricing",
    "/contact",
    "/privacy",
    "/terms",
  ];
  return routes.map((r) => ({
    url: `${SITE.url}${r}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: r === "" ? 1 : 0.7,
  }));
}
