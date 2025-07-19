import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["example.com", "ifdcyvpwkbziexiuqrpu.supabase.co"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
