import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "healthscan-ai-2.onrender.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
