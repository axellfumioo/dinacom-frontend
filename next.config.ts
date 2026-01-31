import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @ts-ignore
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "standalone",
  images: {
    domains: ["upload.wikimedia.org"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.kontaineran.id",
        pathname: "/**",
      },
    ],
  },
} as any;

export default nextConfig;
