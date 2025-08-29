/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Enable Next.js Image Optimization
  images: {
    unoptimized: false, // must be false to allow optimization
    formats: ['image/avif', 'image/webp'], // modern formats
    domains: ['your-cdn.com'], // add external image domains if you load from CDN
    deviceSizes: [360, 640, 768, 1024, 1280, 1536, 1920], // responsive breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // fixed-size icons
  },

  // ✅ Performance boosts
  compress: true,
  swcMinify: true,

  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },

  transpilePackages: ['react-phone-input-2'],
};

module.exports = nextConfig;
