import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/columns/*/card.png': ['./assets/*.ttf', './assets/*.png', './public/images/columns/*'],
  },
};

export default nextConfig;
