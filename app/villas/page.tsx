import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VillasSection from '@/components/sections/VillasSection';

export default function VillasPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <VillasSection />
      </main>
      <Footer />
    </div>
  );
}