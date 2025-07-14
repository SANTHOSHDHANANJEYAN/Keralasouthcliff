import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AmenitiesSection from '@/components/sections/AmenitiesSection';

export default function AmenitiesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <AmenitiesSection />
      </main>
      <Footer />
    </div>
  );
}