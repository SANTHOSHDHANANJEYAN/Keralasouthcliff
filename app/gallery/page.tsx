import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GallerySection from '@/components/sections/GallerySection';

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <GallerySection />
      </main>
      <Footer />
    </div>
  );
}