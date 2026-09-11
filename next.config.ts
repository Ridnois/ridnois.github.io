import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['*.trycloudflare.com'],
  output: "export",
  trailingSlash: true,
};

export default nextConfig;
