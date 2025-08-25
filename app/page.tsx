'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import ReviewsSlider from '@/components/sections/ReviewsSlider';
import ErrorBoundary from '@/components/ui/ErrorBoundary';

const AboutOurStory = dynamic(() => import('@/components/sections/AboutOurStory'), { ssr: false });
const VillasPreview = dynamic(() => import('@/components/sections/VillasPreview'), { ssr: false });
const GalleryPreview = dynamic(() => import('@/components/sections/GalleryPreview'), { ssr: false });
const AmenitiesPreview = dynamic(() => import('@/components/sections/AmenitiesPreview'), { ssr: false });
const LocationPreview = dynamic(() => import('@/components/sections/LocationPreview'), { ssr: false });
const SocialNetworksSection = dynamic(() => import('@/components/sections/SocialNetworksSection'), { ssr: false });
const ContactPreview = dynamic(() => import('@/components/sections/ContactPreview'), { ssr: false });

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
