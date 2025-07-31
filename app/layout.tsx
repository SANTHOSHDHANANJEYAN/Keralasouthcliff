import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Asteya Beach Villas - Luxury Accommodation',
  description: 'Experience luxury amidst nature\'s masterpiece. Only 2 exclusive villas on South Cliff, Varkala, Kerala.',
  keywords: 'Kerala luxury villas, Varkala accommodation, South Cliff beach view, luxury rooms Kerala',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}