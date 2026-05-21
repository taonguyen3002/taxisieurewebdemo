// app/robots.txt/route.ts

import { NextResponse } from "next/server";

export function GET() {
  const content = `
User-agent: *
Disallow: /admin
Disallow: /login
Disallow: /404
Disallow: /about
Disallow: /faq
Disallow: /privacy-policy
Disallow: /history
Disallow: /profile
Disallow: /register
Disallow: /register
Disallow: /blogs/create
Disallow: /blogs/edit

Sitemap: ${process.env.DOMAIN}/sitemap.xml
`;

  return new NextResponse(content.trim(), {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
