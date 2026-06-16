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
Disallow: /user
Disallow: /contact
Disallow: /logout
Disallow: /reset-password
Disallow: /change-password
Disallow: /orders
Disallow: /order-history
Disallow: /order-details
Disallow: /checkout
Disallow: /cart
Disallow: /wishlist
Disallow: /account
Disallow: /settings
Disallow: /dashboard
Disallow: /reports
Disallow: /analytics
Disallow: /api
Sitemap: ${process.env.DOMAIN}/sitemap.xml
`;

  return new NextResponse(content.trim(), {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
