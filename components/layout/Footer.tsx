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
            <div className="flex items-center space-x-2">
            <Image
              src="/Asteya -website/image.png" // Change this to your actual image path
              alt="K Logo"
              width={180}
              height={40}
              className="rounded-lg object-cover"
            />
              
            </div>
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
                <span className="text-sm">South Cliff, Varkala, Kerala</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone size={16} />
                <span className="text-sm">+91 9876543210</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail size={16} />
                <span className="text-sm">info@keralavillas.com</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
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