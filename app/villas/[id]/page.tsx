import { getVillaById, villas } from '@/lib/villas';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import * as icons from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

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
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-black">{villa.name}</h1>
            <p className="text-lg text-gray-600 mt-2">{villa.description}</p>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-2 grid-rows-2 gap-4 mb-12 h-[600px]">
            <div className="relative col-span-1 row-span-2">
                <Image src={villa.images[0]} alt={villa.name} layout="fill" objectFit="cover" className="rounded-lg" priority/>
            </div>
            <div className="relative">
                <Image src={villa.images[1]} alt={villa.name} layout="fill" objectFit="cover" className="rounded-lg"/>
            </div>
            <div className="relative">
                <Image src={villa.images[2]} alt={villa.name} layout="fill" objectFit="cover" className="rounded-lg"/>
            </div>
          </div>


          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left side: details and amenities */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-black mb-4">Features</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                {villa.features.map(({ iconName, text }) => {
                  const Icon = iconMap[iconName as keyof typeof iconMap];
                  return (
                    <div key={text} className="flex items-center gap-2 p-3 border rounded-md bg-white shadow-sm">
                      {Icon && <Icon className="text-black" size={20} />}
                      <span className="text-sm font-medium text-black">{text}</span>
                    </div>
                  );
                })}
              </div>

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

            {/* Right side: Booking form */}
            <div className="border rounded-lg p-6 shadow-lg bg-white h-fit sticky top-24">
              <h2 className="text-2xl font-bold text-black mb-4">Book Your Stay</h2>
             
              <Calendar
                mode="single"
                className="rounded-md border"
              />
              <Link href="/contact" passHref>
                <Button className="w-full mt-4 bg-black text-white hover:bg-gray-800">Book Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// To generate static pages for each villa
export async function generateStaticParams() {
  return villas.map((villa) => ({
    id: villa.id,
  }));
}
