'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube, faGoogle, faAirbnb } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-[#202020] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-16 items-start">
          
          {/* Brand (Logo + Description) */}
          <div className="flex flex-col items-start justify-start">
            <div className="mb-4">
              <Link href="/" aria-label="Home">
                <Image
                  src="/images.png"
                  alt="Asteya Logo"
                  width={160}
                  height={40}
                  className="rounded-lg object-contain"
                />
              </Link>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Experience luxury amidst nature's masterpiece at Asteya South Cliff villas, Varkala, Kerala.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col justify-start">
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/villas" className="text-gray-400 hover:text-white transition-colors block">
                Villas
              </Link>
              <Link href="/gallery" className="text-gray-400 hover:text-white transition-colors block">
                Gallery
              </Link>
               <Link href="/villas" className="text-gray-400 hover:text-white transition-colors block">
                Book Now
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-start">
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-2">
              <div className="flex items-start space-x-2 text-gray-400">
                <MapPin size={16} className="mt-1" />
                <a
                  href="https://share.google/0MyRI06OhgGmmh50P"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-white"
                >
                  Asteya, Near Perumkulam, South Cliff, Varkala - 695141
                </a>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone size={16} />
                <a href="tel:+917994144472" className="text-sm hover:text-white">
                  +91 79941 44472
                </a>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail size={16} />
                <a href="mailto:contact.asteya@gmail.com" className="text-sm hover:text-white">
                  contact.asteya@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col justify-start">
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4 items-center">
              <a 
                href="https://www.instagram.com/asteya_boutiquestays?igsh=MWtlZzlndW9hanNvNA==" 
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <FontAwesomeIcon icon={faYoutube} size="lg" />
              </a>
              <a 
                href="https://www.airbnb.com/rooms/1402615767778764793?check_in=2025-08-30&check_out=2025-09-04&search_mode=regular_search&adults=1&category_tag=Tag%3A8678&children=0&infants=0&pets=0&photo_id=2271043217&source_impression_id=p3_1755263966_P3JomxgL2MPN0G4o&previous_page_section_name=1000&federated_search_id=ea04ee53-8df7-4b67-a865-c1e23cb186df" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Airbnb"
              >
                <FontAwesomeIcon icon={faAirbnb} size="lg" />
              </a>
              <a 
                href="https://maps.app.goo.gl/tJA7xEK8aJxHxFnW7" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Google Maps"
              >
                <FontAwesomeIcon icon={faGoogle} size="lg" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© 2025 - Asteya beach villa - All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
