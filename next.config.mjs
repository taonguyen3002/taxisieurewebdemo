/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DOMAIN: "https://taxisieure.com",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Cho phép tất cả domain HTTPS
      },
      {
        protocol: "http",
        hostname: "**", // (Không khuyến khích) — Cho phép cả HTTP
      },
    ],
    dangerouslyAllowSVG: true, // nếu bạn muốn cho phép SVG
    contentDispositionType: "inline",
  },
  async redirects() {
    return [
      {
        source: "/:path((?!_next|api).*)\\.html", // tránh ảnh hưởng đến các route đặc biệt
        destination: "/:path",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
