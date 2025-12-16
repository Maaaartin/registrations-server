/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep source maps for both client and server to map stack traces back to TypeScript.
  productionBrowserSourceMaps: true,
  experimental: {
    serverSourceMaps: true,
  },
};

module.exports = nextConfig;
