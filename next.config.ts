import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export -> a plain folder of files Vercel/any host can serve.
  output: "export",
  // next/image optimization needs a server; static export can't run one.
  images: { unoptimized: true },
};

export default nextConfig;
