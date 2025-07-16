/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['zenithworld.shop', 'api.zenithworld.shop', 'localhost', '127.0.0.1'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NODE_ENV === 'production' 
      ? 'https://api.zenithworld.shop' 
      : 'http://127.0.0.1:8000',
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'production'
          ? 'https://api.zenithworld.shop/api/:path*'
          : 'http://127.0.0.1:8000/api/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  // 성능 최적화 설정
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  // 개발 환경에서 경고 줄이기
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // CSS 최적화
  optimizeFonts: true,
  swcMinify: true,
};

module.exports = nextConfig; 