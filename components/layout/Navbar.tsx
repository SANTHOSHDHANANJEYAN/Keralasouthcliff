'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Book Now', href: '/villas', isButton: true },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact Us', href: '/contact' },
];

// Animation for nav items
const navItemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.4,
      ease: 'easeOut' as any,
    },
  }),
};

// Animation for the mobile menu container
const mobileMenuVariants: Variants = {
  hidden: { opacity: 0, x: '100%' },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: 'easeOut' as any },
  },
  exit: {
    opacity: 0,
    x: '100%',
    transition: { duration: 0.25, ease: 'easeIn' as any },
  },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#333333]/80 shadow-lg backdrop-blur-lg'
          : 'bg-[#333333]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/Asteya -website/image.png"
            alt="Logo"
            width={150}
            height={50}
            className="rounded-full"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link, i) =>
            link.isButton ? (
              <motion.div
                key={link.href}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
              >
                <Button
                  asChild
                  className="bg-gradient-to-r from-[#f4c542] to-[#e0b93c] text-[#202020] hover:from-[#ffd75e] hover:to-[#eec54a] rounded-full px-6 py-2 text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key={link.href}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
              >
                <Link
                  href={link.href}
                  className="relative text-white font-medium transition-colors after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-[#f4c542] after:transition-all hover:after:w-full"
                >
                  {link.label}
                </Link>
              </motion.div>
            )
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsOpen(true)} className="md:hidden text-white">
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Slide-In Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobileMenu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 z-50 h-screen w-4/5 max-w-xs bg-[#333333] shadow-xl border-l border-gray-700 flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <div className="text-lg font-semibold text-white">
                Welcome 👋
              </div>
              <button
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile Links */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={navItemVariants}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between text-base font-medium px-4 py-3 rounded-lg transition-all ${
                      link.isButton
                        ? 'bg-gradient-to-r from-[#f4c542] to-[#e0b93c] text-[#202020] font-semibold hover:from-[#ffd75e] hover:to-[#eec54a]'
                        : 'text-white hover:bg-gray-800'
                    }`}
                  >
                    <span>{link.label}</span>
                    {!link.isButton && <span className="text-gray-400">{'›'}</span>}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
