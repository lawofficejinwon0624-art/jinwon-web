import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { members } from "@/data/members";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: { path: string; priority: number; freq: "daily" | "weekly" | "monthly" }[] = [
    { path: "", priority: 1, freq: "daily" },
    { path: "/consult", priority: 0.9, freq: "weekly" },
    { path: "/practice", priority: 0.9, freq: "monthly" },
    { path: "/members", priority: 0.8, freq: "monthly" },
    { path: "/legal", priority: 0.8, freq: "weekly" },
    { path: "/activities", priority: 0.7, freq: "weekly" },
    { path: "/location", priority: 0.6, freq: "monthly" },
  ];

  return [
    ...pages.map((p) => ({
      url: `${site.url}${p.path}`,
      lastModified: now,
      changeFrequency: p.freq,
      priority: p.priority,
    })),
    ...members.map((m) => ({
      url: `${site.url}/members/${m.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
