import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';
import Script from 'next/script';

// Import Inter font with error handling
import { Inter } from 'next/font/google';

// Initialize font with fallback
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Asteya Beach Villas - Luxury Accommodation',
  description:
    "Experience luxury amidst nature's masterpiece. Only 2 exclusive villas on South Cliff, Varkala, Kerala.",
  keywords:
    'Kerala luxury villas, Varkala accommodation, South Cliff beach view, luxury rooms Kerala',
  metadataBase: new URL('https://asteya-beach-villas.com'),
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/logo.jpg',
  },
  openGraph: {
    title: 'Asteya Beach Villas - Luxury Accommodation',
    description:
      "Experience luxury amidst nature's masterpiece. Only 2 exclusive villas on South Cliff, Varkala, Kerala.",
    url: 'https://asteya-beach-villas.com',
    siteName: 'Asteya Beach Villas',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Asteya Beach Villas',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asteya Beach Villas',
    description:
      "Experience luxury amidst nature's masterpiece. Only 2 exclusive villas on South Cliff, Varkala, Kerala.",
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>

      <body className={`${inter.className} antialiased`}>
        {/* Global error handler script */}
        <Script id="global-error-handler" strategy="beforeInteractive">
          {`
            // Prevent external script errors from breaking the app
            window.addEventListener('error', function(e) {
              if (e.filename && (e.filename.includes('inject-aws') || e.filename.includes('extension') || e.filename.includes('content-all'))) {
                e.preventDefault();
                console.warn('External script error prevented:', e.message);
                return true;
              }
            });
            
            // Prevent unhandled promise rejections from external scripts
            window.addEventListener('unhandledrejection', function(e) {
              if (e.reason && e.reason.stack && (e.reason.stack.includes('inject-aws') || e.reason.stack.includes('content-all') || e.reason.stack.includes('menu item'))) {
                e.preventDefault();
                console.warn('External promise rejection prevented:', e.reason);
              }
            });
            
            // Override console.error for extension errors
            const originalError = console.error;
            console.error = function(...args) {
              const message = args.join(' ');
              if (message.includes('Cannot find menu item') || message.includes('save-page')) {
                console.warn('Browser extension error suppressed:', message);
                return;
              }
              originalError.apply(console, args);
            };
          `}
        </Script>
        {children}
        <Toaster />

        {/* Google Analytics - load only if GA ID exists */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
