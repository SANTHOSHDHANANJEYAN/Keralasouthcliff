'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/rooms', label: 'Rooms' },
    { href: '/entire-villa', label: 'Entire Villa' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/#contact', label: 'Contact Us' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-32 h-12 flex items-center justify-center transition-transform hover:scale-105">
              <Image
                src="/Asteya -website/image.png"
                alt="Asteya Logo"
                width={140}
                height={60}
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, idx) => (
              <React.Fragment key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    scrolled
                      ? 'text-black hover:text-gray-600'
                      : 'text-white hover:text-gray-300'
                  }`}
                >
                  {link.label}
                </Link>
                {idx !== navLinks.length - 1 && (
                  <div className={`h-5 w-px ${scrolled ? 'bg-gray-300' : 'bg-white/30'}`} />
                )}
              </React.Fragment>
            ))}
            <Link href="/villas">
              <Button className="bg-white text-black border border-black hover:bg-black hover:text-white transition-all duration-300">
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className={scrolled ? 'text-black' : 'text-white'}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md shadow-xl rounded-lg mt-2 p-4 space-y-4 animate-slide-down">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-black hover:text-gray-700 font-medium text-base"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/villas" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-white text-black border border-black hover:bg-black hover:text-white transition-all duration-300">
                Book Now
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
