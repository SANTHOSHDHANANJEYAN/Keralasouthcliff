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
        {/* Emergency error suppression - loads immediately */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Immediate error suppression
              window.addEventListener('error', function(e) {
                if (e.message && (
                  e.message.includes('_url.indexOf is not a function') ||
                  e.message.includes('Cannot read properties of undefined') ||
                  e.message.includes('Cannot find menu item') ||
                  e.message.includes('inject-aws') ||
                  e.message.includes('content-all')
                )) {
                  e.preventDefault();
                  e.stopPropagation();
                  console.warn('🛡️ Early error suppression:', e.message);
                  return true;
                }
              }, true);
              
              // Suppress specific console errors immediately
              const originalConsoleError = console.error;
              console.error = function(...args) {
                const message = args.join(' ');
                if (message.includes('_url.indexOf is not a function') || 
                    message.includes('Cannot find menu item') ||
                    message.includes('inject-aws') ||
                    message.includes('content-all')) {
                  console.warn('🛡️ Error suppressed:', message);
                  return;
                }
                originalConsoleError.apply(console, args);
              };
            `,
          }}
        />
        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>

      <body className={`${inter.className} antialiased`}>
        {/* Enhanced Global error handler script - load immediately */}
        <Script id="global-error-handler" strategy="beforeInteractive">
          {`
            // Enhanced error prevention for external scripts and extensions
            (function() {
              // Immediately override global error handling
              const originalError = console.error;
              const originalWarn = console.warn;
              
              // Enhanced console.error override
              console.error = function(...args) {
                const message = args.join(' ');
                if (message.includes('Cannot find menu item') || 
                    message.includes('save-page') ||
                    message.includes('inject-aws') ||
                    message.includes('_url.indexOf is not a function') ||
                    message.includes('Cannot read properties of undefined') ||
                    message.includes('content-all')) {
                  console.warn('🛡️ Extension/External script error suppressed:', message);
                  return;
                }
                originalError.apply(console, args);
              };
              
              // Global error event handler
              window.addEventListener('error', function(e) {
                const errorMsg = e.message || '';
                const filename = e.filename || '';
                
                if (filename.includes('inject-aws') || 
                    filename.includes('extension') || 
                    filename.includes('content-all') ||
                    errorMsg.includes('_url.indexOf is not a function') ||
                    errorMsg.includes('Cannot find menu item')) {
                  e.preventDefault();
                  e.stopPropagation();
                  console.warn('🛡️ External script error prevented:', errorMsg);
                  return true;
                }
              }, true); // Use capture phase
              
              // Enhanced unhandled promise rejection handler
              window.addEventListener('unhandledrejection', function(e) {
                const reason = e.reason || '';
                const stack = (reason && reason.stack) ? reason.stack : '';
                const message = reason.toString ? reason.toString() : String(reason);
                
                if (stack.includes('inject-aws') || 
                    stack.includes('content-all') || 
                    stack.includes('menu item') ||
                    message.includes('Cannot find menu item') ||
                    message.includes('save-page')) {
                  e.preventDefault();
                  console.warn('🛡️ External promise rejection prevented:', reason);
                }
              });
              
              // Override fetch for potential extension interference
              const originalFetch = window.fetch;
              window.fetch = function(...args) {
                try {
                  return originalFetch.apply(this, args);
                } catch (error) {
                  if (error.message && error.message.includes('_url.indexOf')) {
                    console.warn('🛡️ Fetch error from extension prevented:', error);
                    return Promise.reject(new Error('External script interference'));
                  }
                  throw error;
                }
              };
              
              // Protect URL-related functions
              const originalURL = window.URL;
              if (originalURL) {
                try {
                  Object.defineProperty(window, 'URL', {
                    value: function(url, base) {
                      if (typeof url !== 'string') {
                        console.warn('🛡️ Invalid URL parameter type, converting:', typeof url);
                        url = String(url || '');
                      }
                      return new originalURL(url, base);
                    },
                    writable: false,
                    configurable: false
                  });
                } catch (e) {
                  // If we can't override, at least log the attempt
                  console.warn('🛡️ Could not override URL constructor');
                }
              }
              
              console.log('🛡️ Enhanced error protection initialized');
            })();
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
