/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: [], // This is the key fix
  },
};

module.exports = nextConfig;