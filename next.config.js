/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // ✅ allow optimization
    domains: ['www.theasteya.com'],
    formats: ['image/avif', 'image/webp'], // ✅ modern formats
  },
  transpilePackages: ['react-phone-input-2'],
};

module.exports = nextConfig;
