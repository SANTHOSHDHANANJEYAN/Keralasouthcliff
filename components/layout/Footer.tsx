import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-[#202020] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Use items-start to keep all top-aligned */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          
          {/* Brand (Logo + Description aligned properly) */}
          <div className="flex flex-col items-start gap-4">
            <Image
              src="/image.png"
              alt="Asteya Logo"
              width={160}
              height={40}
              className="rounded-lg object-contain"
            />
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Experience luxury amidst nature&apos;s masterpiece at Asteya South Cliff villas, Varkala, Kerala.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-start">
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/villas" className="text-gray-400 hover:text-white transition-colors block">
                Villas
              </Link>
              <Link href="/gallery" className="text-gray-400 hover:text-white transition-colors block">
                Gallery
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-start">
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-2">
              <div className="flex items-start space-x-2 text-gray-400">
                <MapPin size={16} />
                <span className="text-sm">
                  Asteya, Near Perumkulam, South Cliff, Varkala - 695141
                </span>
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
          <div className="flex flex-col items-start">
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4 items-center">
              <a 
                href="https://www.instagram.com/asteya_exotic_stays?igsh=MWtlZzlndW9hanNvNA==" 
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://maps.app.goo.gl/sbbtj2xxEJfrK5YY7" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 384 512">
                  <path d="M168 0C75.3 0 0 75.3 0 168c0 87.7 144 306.5 152.7 318.9 6.5 9.6 20.1 9.6 26.6 0C240 474.5 384 255.7 384 168 384 75.3 308.7 0 216 0zm0 256a88 88 0 1 1 0-176 88 88 0 0 1 0 176z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 - Asteya beach villa - All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
