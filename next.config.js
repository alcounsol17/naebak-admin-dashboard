/** @type {import('next').NextConfig} */
const nextConfig = {
  // تفعيل App Router
  experimental: {
    appDir: true,
  },
  
  // إعدادات الصور
  images: {
    domains: ['localhost', 'naebak.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // إعدادات الأمان
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
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // إعدادات البيئة
  env: {
    ADMIN_SERVICE_URL: process.env.ADMIN_SERVICE_URL || 'http://localhost:8000',
    NEXT_PUBLIC_APP_NAME: 'نائبك.كوم - لوحة التحكم',
    NEXT_PUBLIC_APP_VERSION: '1.0.0',
  },
  
  // تحسين الأداء
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // إعدادات TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // إعدادات ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },
  
  // إعدادات الضغط
  compress: true,
  
  // إعدادات PWA (اختيارية)
  // pwa: {
  //   dest: 'public',
  //   register: true,
  //   skipWaiting: true,
  // },
};

module.exports = nextConfig;
