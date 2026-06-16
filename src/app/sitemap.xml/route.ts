// File: app/sitemap.xml/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/../lib/mongodb";
import Post from "@/../models/post";
import { siteConfig } from "@/config/default.config";

// Luôn generate mới mỗi request
export const dynamic = "force-dynamic";
// Nếu muốn cache 60s thay dynamic use revalidate
// export const revalidate = 60;

// URL gốc
const SITE_URL = siteConfig.domain ?? process.env.DOMAIN;

// Escape XML
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Sinh static URLs
function buildStaticUrls() {
  const pages = ["/"];
  return pages
    .map(
      (path) =>
        `<url>
      <loc>${SITE_URL}${path}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>`
    )
    .join("");
}

export async function GET(): Promise<NextResponse> {
  await connectDB();

  // Lấy danh sách bài viết trực tiếp từ MongoDB
  let dynamicXml = "";
  try {
    const posts = await Post.find(
      {},
      "slug title image publishedDate modifiedDate"
    ).lean();

    dynamicXml = posts
      .map((post) => {
        const loc = `${SITE_URL}/bai-viet/${post.slug}`;
        // Dùng modifiedDate nếu có, nếu không fallback sang publishedDate
        const date = post.modifiedDate || post.publishedDate || new Date();
        const lastmod = new Date(date).toISOString();

        let imageTag = "";
        if (post.image && post.image.url) {
          const title = post.image.alt || post.title || "";
          imageTag = `
      <image:image>
        <image:loc>${escapeXml(post.image.url)}</image:loc>
        <image:title>${escapeXml(title)}</image:title>
        <image:caption>${escapeXml(title)}</image:caption>
      </image:image>`;
        }

        return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    ${imageTag}
  </url>`;
      })
      .join("");
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${buildStaticUrls()}
  ${dynamicXml}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}
