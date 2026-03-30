const BASE_URL = "https://gallery2.hockeycurve.com";

/**
 * Dynamic sitemap for SEO & AI crawler discoverability.
 *
 * Next.js App Router automatically serves this at /sitemap.xml.
 * It fetches live template data from the API so every template page
 * is discoverable without manual maintenance.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default async function sitemap() {
  // ── Static routes ──────────────────────────────────────────────
  const staticRoutes = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/ai-manifest`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/llms.txt`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // ── Dynamic template routes ────────────────────────────────────
  let templateRoutes = [];

  try {
    const res = await fetch(
      "https://selfserve.hockeycurve.com/public/hcgallery/markup",
      { next: { revalidate: 3600 } }, // cache for 1 hour at build/request time
    );

    if (res.ok) {
      const json = await res.json();
      const templates = json.data || [];

      templateRoutes = templates.map((template) => ({
        url: `${BASE_URL}/template/${template.example_id}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      }));
    }
  } catch (error) {
    // Fail gracefully — static routes are still included
    console.error("Sitemap: failed to fetch templates:", error.message);
  }

  return [...staticRoutes, ...templateRoutes];
}
