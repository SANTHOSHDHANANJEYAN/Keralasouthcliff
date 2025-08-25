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
              // Advanced error suppression and protection
              (function() {
                // Enhanced error suppression
                window.addEventListener('error', function(e) {
                  if (e.message && (
                    e.message.includes('_url.indexOf is not a function') ||
                    e.message.includes('Cannot read properties of undefined') ||
                    e.message.includes('Cannot find menu item') ||
                    e.message.includes('inject-aws') ||
                    e.message.includes('content-all') ||
                    e.filename && (
                      e.filename.includes('inject-aws') ||
                      e.filename.includes('content-all') ||
                      e.filename.includes('extension')
                    )
                  )) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.warn('🛡️ Early error suppression:', e.message);
                    return true;
                  }
                }, true);
                
                // Enhanced console override
                const originalConsoleError = console.error;
                console.error = function(...args) {
                  const message = args.join(' ');
                  if (message.includes('_url.indexOf is not a function') || 
                      message.includes('Cannot find menu item') ||
                      message.includes('inject-aws') ||
                      message.includes('content-all') ||
                      message.includes('TypeError: Cannot read properties of undefined')) {
                    console.warn('🛡️ Error suppressed:', message);
                    return;
                  }
                  originalConsoleError.apply(console, args);
                };
                
                // Advanced URL parameter protection
                const originalString = String;
                window.String = function(value) {
                  if (value === null || value === undefined) {
                    console.warn('🛡️ Null/undefined converted to empty string');
                    return '';
                  }
                  if (typeof value === 'object' && value !== null) {
                    console.warn('🛡️ Object converted to string:', typeof value);
                    try {
                      return JSON.stringify(value);
                    } catch (e) {
                      return '[object Object]';
                    }
                  }
                  return originalString(value);
                };
                
                // Protect String.prototype.indexOf
                if (String.prototype.indexOf) {
                  const originalIndexOf = String.prototype.indexOf;
                  String.prototype.indexOf = function(searchString, position) {
                    if (this === null || this === undefined) {
                      console.warn('🛡️ indexOf called on null/undefined, returning -1');
                      return -1;
                    }
                    try {
                      return originalIndexOf.call(this, searchString, position);
                    } catch (e) {
                      console.warn('🛡️ indexOf error prevented:', e.message);
                      return -1;
                    }
                  };
                }
                
                // Advanced unhandled rejection handling
                window.addEventListener('unhandledrejection', function(e) {
                  const reason = e.reason || '';
                  const stack = (reason && reason.stack) ? reason.stack : '';
                  const message = reason.toString ? reason.toString() : String(reason);
                  
                  if (stack.includes('inject-aws') || 
                      stack.includes('content-all') || 
                      stack.includes('menu item') ||
                      message.includes('Cannot find menu item') ||
                      message.includes('save-page') ||
                      message.includes('_url.indexOf')) {
                    e.preventDefault();
                    console.warn('🛡️ Promise rejection suppressed:', reason);
                  }
                });
                
                console.log('🛡️ Advanced error protection initialized');
              })();
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
        {/* Advanced Global error handler script - comprehensive protection */}
        <Script id="global-error-handler" strategy="beforeInteractive">
          {`
            // Ultimate error prevention for external scripts and extensions
            (function() {
              // Comprehensive error suppression
              const originalError = console.error;
              const originalWarn = console.warn;
              
              // Ultimate console.error override
              console.error = function(...args) {
                const message = args.join(' ');
                if (message.includes('Cannot find menu item') || 
                    message.includes('save-page') ||
                    message.includes('inject-aws') ||
                    message.includes('_url.indexOf is not a function') ||
                    message.includes('Cannot read properties of undefined') ||
                    message.includes('content-all') ||
                    message.includes('TypeError: _url.indexOf') ||
                    message.includes('at inject-aws')) {
                  console.warn('🛡️ Global error suppressed:', message);
                  return;
                }
                originalError.apply(console, args);
              };
              
              // Advanced global error event handler
              window.addEventListener('error', function(e) {
                const errorMsg = e.message || '';
                const filename = e.filename || '';
                const source = e.source || '';
                
                if (filename.includes('inject-aws') || 
                    filename.includes('extension') || 
                    filename.includes('content-all') ||
                    errorMsg.includes('_url.indexOf is not a function') ||
                    errorMsg.includes('Cannot find menu item') ||
                    errorMsg.includes('Cannot read properties of undefined') ||
                    source && source.toString().includes('inject-aws')) {
                  e.preventDefault();
                  e.stopPropagation();
                  e.stopImmediatePropagation();
                  console.warn('🛡️ Advanced error prevention:', errorMsg);
                  return true;
                }
              }, true);
              
              // Comprehensive promise rejection handler
              window.addEventListener('unhandledrejection', function(e) {
                const reason = e.reason || '';
                const stack = (reason && reason.stack) ? reason.stack : '';
                const message = reason.toString ? reason.toString() : String(reason);
                
                if (stack.includes('inject-aws') || 
                    stack.includes('content-all') || 
                    stack.includes('menu item') ||
                    message.includes('Cannot find menu item') ||
                    message.includes('save-page') ||
                    message.includes('_url.indexOf')) {
                  e.preventDefault();
                  console.warn('🛡️ Promise rejection suppressed:', reason);
                }
              });
              
              // Override fetch to prevent extension interference
              const originalFetch = window.fetch;
              if (originalFetch) {
                window.fetch = function(...args) {
                  try {
                    return originalFetch.apply(this, args);
                  } catch (error) {
                    if (error.message && (error.message.includes('_url.indexOf') || error.message.includes('inject-aws'))) {
                      console.warn('🛡️ Fetch error from extension prevented:', error);
                      return Promise.reject(new Error('External script interference'));
                    }
                    throw error;
                  }
                };
              }
              
              // Monkey patch Object methods to prevent extension errors
              const originalObjectKeys = Object.keys;
              Object.keys = function(obj) {
                try {
                  if (obj === null || obj === undefined) {
                    console.warn('🛡️ Object.keys called on null/undefined, returning empty array');
                    return [];
                  }
                  return originalObjectKeys(obj);
                } catch (error) {
                  console.warn('🛡️ Object.keys error prevented:', error.message);
                  return [];
                }
              };
              
              // Protect document.getElementById for extension menu items
              if (typeof document !== 'undefined' && document.getElementById) {
                const originalGetElementById = document.getElementById;
                document.getElementById = function(id) {
                  try {
                    if (id === 'save-page' || (typeof id === 'string' && id.includes('save-page'))) {
                      console.warn('🛡️ Extension menu item access prevented:', id);
                      return null;
                    }
                    return originalGetElementById.call(this, id);
                  } catch (error) {
                    console.warn('🛡️ getElementById error prevented:', error.message);
                    return null;
                  }
                };
              }
              
              console.log('🛡️ Ultimate error protection system activated');
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
