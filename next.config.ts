import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev }) => {
    // On Windows (esp. under Downloads/OneDrive/AV), the webpack persistent
    // filesystem cache in .next/cache/webpack frequently fails to rename its
    // .pack.gz temp files, corrupting chunks ("Cannot find module './xxx.js'").
    // Using an in-memory cache in dev avoids the disk churn entirely.
    if (dev) {
      config.cache = { type: "memory" };
    }
    return config;
  },
};

export default nextConfig;
