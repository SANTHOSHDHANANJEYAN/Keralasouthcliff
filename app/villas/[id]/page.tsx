import { getVillaById, villas } from '@/lib/villas';
import { notFound } from 'next/navigation';
import * as icons from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ReviewsSlider from '@/components/sections/ReviewsSlider';
import ContactSection from '@/components/sections/ContactSection';
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
  Coffee: icons.Coffee,
  Snowflake: icons.Snowflake,
  Fan: icons.Fan,
};

interface Feature {
  iconName: keyof typeof iconMap;
  text: string;
}

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
            <p className="text-lg text-gray-600 mt-2 whitespace-pre-line">
              {villa.description}
            </p>
          </div>

          {/* Image Gallery */}
          <VillaGallery images={villa.images} name={villa.name} />

          {/* Features & Amenities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
            {/* Features */}
            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Features</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                {villa.features.map(({ iconName, text }: Feature) => {
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
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-gray-700">
                {villa.amenities.map((amenity: string) => (
                  <li
                    key={amenity}
                    className="flex items-start gap-3"
                  >
                    <icons.CheckCircle
                      size={18}
                      className="text-green-600 mt-0.5 shrink-0"
                    />
                    <span className="leading-snug">{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>{/* ✅ close the grid before next sections */}

          {/* Highlights */}
          {villa.highlights && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-black mb-4">Highlights</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {villa.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Experiences & Attractions */}
          {villa.experiences && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                Experiences & Attractions
              </h2>
              <ul className="space-y-3 text-gray-700">
                {villa.experiences.map((exp) => (
                  <li key={exp} className="flex items-start gap-2">
                    <icons.Star size={16} className="text-yellow-500 mt-1" />
                    <span>{exp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Guest Access */}
          {villa.access && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                Guest Access
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {villa.access.map((acc) => (
                  <li key={acc}>{acc}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Additional Sections */}
        <ReviewsSlider />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

// Static params
export async function generateStaticParams() {
  return villas.map((villa) => ({
    id: villa.id,
  }));
}
