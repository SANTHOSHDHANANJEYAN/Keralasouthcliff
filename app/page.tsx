import Hero from '@/components/sections/Hero';
import VillasPreview from '@/components/sections/VillasPreview';
import GalleryPreview from '@/components/sections/GalleryPreview';
import AmenitiesPreview from '@/components/sections/AmenitiesPreview';
import LocationPreview from '@/components/sections/LocationPreview';
import ContactPreview from '@/components/sections/ContactPreview';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AgendaSection from '@/components/sections/AgendaSection';
import AccommodationsSection from '@/components/sections/AccommodationsSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <AgendaSection/>
        <VillasPreview />
        <AccommodationsSection/>
        <GalleryPreview />
        <AmenitiesPreview />
        <LocationPreview />
        <ContactPreview />
      </main>
      <Footer />

    </div>
  );
}