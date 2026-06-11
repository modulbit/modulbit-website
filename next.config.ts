import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    // Needed for app/global-not-found.tsx: with the root layout inside the
    // dynamic [lang] segment, Next.js cannot compose a server-rendered 404
    // page the normal way (it falls back to an empty client-rendered shell).
    globalNotFound: true,
  },
};

export default nextConfig;
