import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { members } from "@/data/members";
import { getColumnSitemap } from "@/lib/columns";
import { questionTopics, questionVerifiedAt } from "@/data/questions";
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const columns = await getColumnSitemap();
  const pages: { path: string; priority: number; freq: "daily" | "weekly" | "monthly" }[] = [
    { path: "", priority: 1, freq: "daily" },
    { path: "/consult", priority: 0.9, freq: "weekly" },
    { path: "/practice", priority: 0.9, freq: "monthly" },
    { path: "/members", priority: 0.8, freq: "monthly" },
    { path: "/legal", priority: 0.8, freq: "weekly" },
    { path: "/activities", priority: 0.7, freq: "weekly" },
    { path: "/location", priority: 0.6, freq: "monthly" },
    { path: "/columns", priority: 0.8, freq: "daily" },
  ];

  return [
    ...pages.map((p) => ({
      url: `${site.url}${p.path}`,
      changeFrequency: p.freq,
      priority: p.priority,
    })),
    ...members.map((m) => ({
      url: `${site.url}/members/${m.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...["/ai", ...questionTopics.map((topic) => "/ai/" + topic.slug)].map((path) => ({
      url: `${site.url}${path}`,
      lastModified: questionVerifiedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...columns.map((column) => ({
      url: `${site.url}/columns/${encodeURIComponent(column.slug)}`,
      lastModified: column.modifiedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
