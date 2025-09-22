import type { Metadata } from 'next'
import { Cairo } from 'next/font/google'
import '../styles/globals.css'

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-cairo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'نائبك.كوم - لوحة التحكم',
  description: 'لوحة التحكم الاحترافية لإدارة منصة نائبك.كوم - Professional Admin Dashboard for Naebak.com Platform',
  keywords: ['نائبك', 'مصر', 'نواب', 'برلمان', 'إدارة', 'لوحة تحكم'],
  authors: [{ name: 'Naebak Team', url: 'https://naebak.com' }],
  creator: 'Naebak Team',
  publisher: 'Naebak.com',
  robots: 'noindex, nofollow', // لوحة التحكم لا تظهر في محركات البحث
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#22c55e',
  colorScheme: 'light dark',
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    url: 'https://admin.naebak.com',
    siteName: 'نائبك.كوم - لوحة التحكم',
    title: 'نائبك.كوم - لوحة التحكم',
    description: 'لوحة التحكم الاحترافية لإدارة منصة نائبك.كوم',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'نائبك.كوم - لوحة التحكم',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@naebak_com',
    creator: '@naebak_com',
    title: 'نائبك.كوم - لوحة التحكم',
    description: 'لوحة التحكم الاحترافية لإدارة منصة نائبك.كوم',
    images: ['/images/twitter-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#22c55e' },
    ],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <head>
        {/* Meta tags إضافية للأمان */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta name="referrer" content="origin-when-cross-origin" />
        
        {/* Preconnect للخطوط */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch للخدمات الخارجية */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body className={`${cairo.className} antialiased bg-gray-50 text-gray-900`}>
        {/* محتوى التطبيق */}
        <div id="root" className="min-h-screen">
          {children}
        </div>
        
        {/* Scripts إضافية */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // تحسين الأداء
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
              
              // تتبع الأخطاء
              window.addEventListener('error', function(e) {
                console.error('خطأ في التطبيق:', e.error);
              });
              
              // تحسين التمرير
              if (CSS.supports('scroll-behavior', 'smooth')) {
                document.documentElement.style.scrollBehavior = 'smooth';
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
