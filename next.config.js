/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  // Bundle MUI X packages so their CSS is handled by Next instead of Node at runtime.
  transpilePackages: ['@mui/x-data-grid'],
  experimental: {
    serverSourceMaps: true
  },
  logging: {
    incomingRequests: true,
    fetches: {
      fullUrl: true
    }
  }
};

module.exports = nextConfig;
