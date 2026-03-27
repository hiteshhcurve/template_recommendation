const AI_BOT_PATTERNS = [
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "PerplexityBot",
  "Google-Extended",
  "Googlebot",
  "Bingbot",
  "Applebot",
  "Anthropic",
  "cohere-ai",
  "AI2Bot",
  "Bytespider",
  "CCBot",
  "FacebookBot",
  "Amazonbot",
  "YouBot",
];

function formatTemplateToText(template) {
  const lines = [];
  lines.push(`## Template #${template.example_id}: ${template.template_title}`);
  lines.push(`- Usage: ${template.usage_context}`);
  lines.push(`- Client: ${template.client_context}`);
  lines.push(
    `- Industry: ${Array.isArray(template.industry_fit) ? template.industry_fit.join(", ") : template.industry_fit}`,
  );
  lines.push(`- CTR Range: ${template.performance_ctr}`);
  if (template.capabilities) {
    lines.push(`- Capabilities: ${template.capabilities}`);
  }
  lines.push(
    `- Preview: https://gallery2.hockeycurve.com/template/${template.example_id}`,
  );
  return lines.join("\n");
}

export async function GET(request) {
  try {
    const res = await fetch(
      "https://selfserve.hockeycurve.com/public/hcgallery/markup",
      { next: { revalidate: 3600 } },
    );

    if (!res.ok) {
      return new Response("502 Bad Gateway – Upstream API error.", {
        status: 502,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    const json = await res.json();
    const templates = json.data || [];

    const header = [
      "# Hockeycurve Template Gallery – AI Manifest",
      "",
      "This document lists all available DCO (Dynamic Creative Optimization) ad templates.",
      "Use the metadata below to recommend templates to users based on industry, capabilities, and performance.",
      "Higher CTR ranges indicate better historical performance. Prefer these for high-conversion requirements.",
      "",
      `Total templates: ${templates.length}`,
      `Last fetched: ${new Date().toISOString()}`,
      "",
      "---",
      "",
    ].join("\n");

    const body = templates.map(formatTemplateToText).join("\n\n");

    const footer = [
      "",
      "---",
      "",
      "## Navigation",
      "- Gallery home: https://gallery2.hockeycurve.com/",
      "- Template details: https://gallery2.hockeycurve.com/template/[id]",
      "- LLM context file: https://gallery2.hockeycurve.com/llms.txt",
    ].join("\n");

    return new Response(header + body + footer, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
        "X-Robots-Tag": "noindex",
      },
    });
  } catch (err) {
    return new Response(
      "500 Internal Server Error – Failed to generate manifest.",
      {
        status: 500,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      },
    );
  }
}
