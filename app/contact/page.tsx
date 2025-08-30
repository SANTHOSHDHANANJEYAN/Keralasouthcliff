import ContactSection from '@/components/sections/ContactSection';
import LocationPreview from '@/components/sections/LocationPreview';
import SocialNetworksSection from '@/components/sections/SocialNetworksSection';

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <main className="pt-20">
        <ContactSection />
        <SocialNetworksSection/>
        <LocationPreview />
      </main>
    </div>
  );
}
