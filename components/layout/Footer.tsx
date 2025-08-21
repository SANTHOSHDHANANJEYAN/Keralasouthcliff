import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-[#202020] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Image
              src="/image.png"
              alt="K Logo"
              width={180}
              height={40}
              className="rounded-lg object-cover"
            />
            <p className="text-gray-400 text-sm">
              Experience luxury amidst nature's masterpiece at Asteya South Cliff villas, Varkala, Kerala.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/villas" className="text-gray-400 hover:text-white transition-colors block">
                Villas
              </Link>
              <Link href="/gallery" className="text-gray-400 hover:text-white transition-colors block">
                Gallery
              </Link>
              <Link href="/amenities" className="text-gray-400 hover:text-white transition-colors block">
                Amenities
              </Link>
              <Link href="/location" className="text-gray-400 hover:text-white transition-colors block">
                Location
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Info</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin size={16} />
                <span className="text-sm">Asteya , Near Perumkulam , south cliff, varkala - 695141</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone size={16} />
                <span className="text-sm">+91 79941 44472</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail size={16} />
                <span className="text-sm">contact.asteya@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Follow Us</h3>
            <div className="flex space-x-4 items-center">
              <a href="https://www.instagram.com/asteya_beachvilla?igsh=MWtlZzlndW9hanNvNA==" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://airbnb.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 512 512">
                  <path d="M256 0C114.836 0 0 114.84 0 256s114.836 256 256 256 256-114.84 256-256S397.164 0 256 0zm-43.3 380.1c-28.9-35.6-60.2-78.3-84.1-125.5-19.3-37.8-26.6-71.2-22.4-99.3 4.2-27.8 19.3-49.7 44.3-62.5 25-12.9 53.5-13.4 83.2-1.4 27.7 11.1 52.2 34.6 73 69.9 33.4 58.3 34.5 108.6 3.5 150.1-18.1 24.3-42.2 41.2-71.5 50.3-8.5 2.6-18.1-0.7-23.5-8.3zm53.5-97.2c14.8 0 26.9-12.1 26.9-26.9s-12.1-26.9-26.9-26.9-26.9 12.1-26.9 26.9 12.1 26.9 26.9 26.9z" />
                </svg>
              </a>
              <a href="https://maps.app.goo.gl/tJA7xEK8aJxHxFnW7" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 384 512">
                  <path d="M168 0C75.3 0 0 75.3 0 168c0 87.7 144 306.5 152.7 318.9 6.5 9.6 20.1 9.6 26.6 0C240 474.5 384 255.7 384 168 384 75.3 308.7 0 216 0zm0 256a88 88 0 1 1 0-176 88 88 0 0 1 0 176z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Asteya South Cliff Beach View Villas. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
