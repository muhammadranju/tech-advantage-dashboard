import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "http",
        hostname: "localhost:3000",
      },
      {
        protocol: "http",
        hostname: "10.10.7.101:3000",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
