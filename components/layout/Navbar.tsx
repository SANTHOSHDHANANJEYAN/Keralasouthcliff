'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/rooms', label: 'Rooms' },
  { href: '/entire-villa', label: 'Entire Villa' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/#contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        scrolled
          ? 'backdrop-blur-xl bg-white/80 border-b border-gray-200 shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/Asteya -website/image.png"
            alt="Logo"
            width={140}
            height={60}
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm font-medium transition-colors group ${
                scrolled ? 'text-black' : 'text-white'
              }`}
            >
              {link.label}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-current transition-all group-hover:w-full" />
            </Link>
          ))}
          <Link href="/villas">
            <button className="rounded-full px-4 py-2 bg-black text-white hover:bg-white hover:text-black border border-black transition">
              Book Now
            </button>
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden p-2 rounded transition ${
            scrolled ? 'text-black' : 'text-white'
          }`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white text-black shadow-lg px-6 py-4 space-y-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-base font-semibold hover:text-gray-600"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/villas" onClick={() => setIsOpen(false)}>
              <button className="w-full px-4 py-2 rounded-full bg-black text-white hover:bg-white hover:text-black border border-black transition">
                Book Now
              </button>
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
