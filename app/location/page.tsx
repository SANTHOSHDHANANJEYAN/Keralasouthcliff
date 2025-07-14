import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LocationSection from '@/components/sections/LocationSection';

export default function LocationPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <LocationSection />
      </main>
      <Footer />
    </div>
  );
}