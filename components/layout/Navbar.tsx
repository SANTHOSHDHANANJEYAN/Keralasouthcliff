'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Villas', href: '/villas' },
  { label: 'Amenities', href: '/amenities' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Agenda', href: '/agenda' },
  { label: 'Location', href: '/location' },
  { label: 'Contact', href: '/contact' },
  {
    label: 'Book Now',
    href: '/booking',
    isButton: true,
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all ${
        isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-xl font-semibold text-[#627d6a]">Asteya</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) =>
            link.isButton ? (
              <Button
                key={link.href}
                asChild
                className="bg-gradient-to-r from-[#627d6a] to-[#4b6659] text-white hover:from-[#506e5f] hover:to-[#3f5447] rounded-full px-6 py-2 text-sm font-semibold shadow-md"
              >
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-[#627d6a] font-medium transition"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden text-gray-700"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Slide-In Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 z-50 h-screen w-4/5 max-w-xs bg-white shadow-xl border-l border-gray-200 flex flex-col"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <div className="text-lg font-semibold">Hello, Guest!</div>
              <button
                className="text-gray-500 hover:text-black"
                onClick={() => setIsOpen(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between text-base font-medium px-3 py-3 rounded-lg transition ${
                    link.isButton
                      ? 'bg-gradient-to-r from-[#627d6a] to-[#4b6659] text-white font-semibold'
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <span>{link.label}</span>
                  {!link.isButton && <span className="text-gray-400">{'›'}</span>}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
