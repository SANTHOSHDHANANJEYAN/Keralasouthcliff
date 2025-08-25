/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: [], // Add any external image domains here if needed
  },
  transpilePackages: ['react-phone-input-2'],
};

module.exports = nextConfig;
