'use client';

import { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import ReviewsSlider from '@/components/sections/ReviewsSlider';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import AboutOurStory from '@/components/sections/AboutOurStory';
import VillasPreview from '@/components/sections/VillasPreview';
import GalleryPreview from '@/components/sections/GalleryPreview';
import AmenitiesPreview from '@/components/sections/AmenitiesPreview';
import LocationPreview from '@/components/sections/LocationPreview';
import SocialNetworksSection from '@/components/sections/SocialNetworksSection';
import ContactPreview from '@/components/sections/ContactPreview';

export default function Home() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white text-gray-800">
        <Navbar />
        <main>
          <ErrorBoundary>
            <Hero />
          </ErrorBoundary>
          <Suspense fallback={<div className="py-10 text-center">Loading...</div>}>
            <ErrorBoundary>
              <AboutOurStory />
            </ErrorBoundary>
            <ErrorBoundary>
              <VillasPreview />
            </ErrorBoundary>
            <ErrorBoundary>
              <GalleryPreview />
            </ErrorBoundary>
            <ErrorBoundary>
              <AmenitiesPreview />
            </ErrorBoundary>
            <ErrorBoundary>
              <ReviewsSlider />
            </ErrorBoundary>
            <ErrorBoundary>
              <ContactPreview />
            </ErrorBoundary>
            <ErrorBoundary>
              <SocialNetworksSection />
            </ErrorBoundary>
            <ErrorBoundary>
              <LocationPreview />
            </ErrorBoundary>
          </Suspense>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </ErrorBoundary>
  );
}
