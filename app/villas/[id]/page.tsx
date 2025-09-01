import { getVillaById, villas } from '@/lib/villas';
import { notFound } from 'next/navigation';
import * as icons from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

// ✅ Additional Sections
import ReviewsSlider from '@/components/sections/ReviewsSlider';
import ContactSection from '@/components/sections/ContactSection';

// ✅ Client component for gallery
import VillaGallery from '@/components/sections/VillaGallery';

const iconMap: { [key: string]: React.ElementType } = {
  Bed: icons.Bed,
  Bath: icons.Bath,
  Wifi: icons.Wifi,
  Car: icons.Car,
  Waves: icons.Waves,
  Mountain: icons.Mountain,
  Sun: icons.Sun,
  Shield: icons.Shield,
  Crown: icons.Crown,
};

export default function VillaPage({ params }: { params: { id: string } }) {
  const villa = getVillaById(params.id);

  if (!villa) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Villa Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-black">{villa.name}</h1>
            <p className="text-lg text-gray-600 mt-2">{villa.description}</p>
          </div>

          {/* ✅ Image Gallery */}
          <VillaGallery images={villa.images} name={villa.name} />

          {/* Features & Amenities - fixed layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Features */}
            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Features</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                {villa.features.map(({ iconName, text }) => {
                  const Icon = iconMap[iconName];
                  return (
                    <div
                      key={text}
                      className="flex items-center gap-2 p-3 border rounded-md bg-white shadow-sm"
                    >
                      {Icon && <Icon className="text-black" size={20} />}
                      <span className="text-sm font-medium text-black">
                        {text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Amenities</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-gray-700">
                {villa.amenities.map((amenity) => (
                  <li key={amenity} className="flex items-center gap-3">
                    <icons.CheckCircle size={16} className="text-green-600" />
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ✅ Additional Sections */}
        <ReviewsSlider />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

// ✅ Generate static pages for each villa
export async function generateStaticParams() {
  return villas.map((villa) => ({
    id: villa.id,
  }));
}
