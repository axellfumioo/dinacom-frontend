import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  reactCompiler: true,
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
};
export default nextConfig;
