/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
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
