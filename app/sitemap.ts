import type { MetadataRoute } from "next";
import { siteUrl as baseUrl } from "@/lib/site-metadata";

export default function sitemap(): MetadataRoute.Sitemap {

  return [
    { url: `${baseUrl}/events`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/gallery`, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${baseUrl}`,
      changeFrequency: "weekly",
      priority: 1.0
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${baseUrl}/register`,
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: `${baseUrl}/faq`,
      changeFrequency: "monthly",
      priority: 0.7
    },
    {
      url: `${baseUrl}/privacy`,
      changeFrequency: "yearly",
      priority: 0.5
    }
  ];
}

