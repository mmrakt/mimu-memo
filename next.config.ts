import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://placehold.jp/**")],
  },
  outputFileTracingExcludes: {
    "*": [".pnpm-store/**/*", ".next/cache/**/*"],
  },
  sassOptions: {
    implementation: "sass-embedded",
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
