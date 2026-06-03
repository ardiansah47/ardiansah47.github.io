import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Generate a fully static site (HTML/CSS/JS) into `out/` on `next build`.
  output: "export",

  // Default Image Optimization needs a server, which a static export doesn't
  // have. Disable it so `next/image` emits plain <img> tags.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
