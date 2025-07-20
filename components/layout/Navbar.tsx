'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    { href: '/villas', label: 'Villas' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/amenities', label: 'Amenities' },
    { href: '/location', label: 'Location' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#fdfaf6]/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#3B7A57] to-[#DAA520] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span
              className={`font-bold text-lg ${
                scrolled ? 'text-[#2d2a26]' : 'text-white'
              }`}
            >
              Asteya
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#DAA520] ${
                  scrolled ? 'text-[#2d2a26]' : 'text-white hover:text-[#DAA520]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button className="bg-gradient-to-r from-[#3B7A57] to-[#DAA520] hover:from-[#2e5c43] hover:to-[#b8860b] text-white">
              Book Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className={scrolled ? 'text-[#2d2a26]' : 'text-white'}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-[#fdfaf6]/95 backdrop-blur-md shadow-lg rounded-lg mt-2 p-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#2d2a26] hover:text-[#DAA520] font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button className="bg-gradient-to-r from-[#3B7A57] to-[#DAA520] hover:from-[#2e5c43] hover:to-[#b8860b] text-white">
                Book Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
