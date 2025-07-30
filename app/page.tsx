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
import Slider from '@/components/sections/Slider';
import ActivitiesSection from '@/components/sections/ActivitiesSection';
import SocialNetworksSection from '@/components/sections/SocialNetworksSection';
import WhatsAppButton from '@/components/ui/WhatsAppButton'; // ✅ NEW

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <AgendaSection />
        <VillasPreview />
        <AccommodationsSection />
        <GalleryPreview />
        <ActivitiesSection />
        <AmenitiesPreview />
        <LocationPreview />
        <Slider />
        <SocialNetworksSection />
        <ContactPreview />
      </main>
      <Footer />
      <WhatsAppButton /> {/* ✅ Added the floating button */}
    </div>
  );
}
