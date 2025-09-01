import ContactSection from '@/components/sections/ContactSection';
import LocationPreview from '@/components/sections/LocationPreview';
import SocialNetworksSection from '@/components/sections/SocialNetworksSection';
import Footer from "@/components/layout/Footer";
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <main className="pt-20">
        <ContactSection />
        <SocialNetworksSection />
        <LocationPreview />
      </main>
      <Footer />
    </div>
    <div className="fixed bottom-6 right-6 z-50">
        <WhatsAppButton />
      </div>
  );
}
