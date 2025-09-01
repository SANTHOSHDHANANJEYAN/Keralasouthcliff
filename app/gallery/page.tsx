import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GallerySection from '@/components/sections/GallerySection';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <GallerySection />
      </main>
      <Footer />

      {/* ✅ Fixed WhatsApp Button at bottom-right */}
      <div className="fixed bottom-6 right-6 z-50">
        <WhatsAppButton />
      </div>
    </div>
  );
}
