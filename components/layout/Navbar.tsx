'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Book Now', href: '/villas', isButton: true },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact Us', href: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' },
    }),
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 w-full z-50 transition-all ${
        isScrolled ? 'bg-[#202020] shadow-md' : 'bg-[#202020]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
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
        <nav className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link, i) =>
            link.isButton ? (
              <motion.div
                key={link.href}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                custom={i}
              >
                <Button
                  asChild
                  className="bg-[#f4c542] text-[#202020] hover:scale-105 hover:bg-[#e0b93c] transition-transform duration-300 rounded-full px-6 py-2 text-sm font-semibold shadow-md"
                >
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key={link.href}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                custom={i}
              >
                <Link
                  href={link.href}
                  className="text-white relative group font-medium transition"
                >
                  {link.label}
                  <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-[#f4c542] group-hover:w-full transition-all duration-300" />
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
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed top-0 right-0 z-50 h-screen w-4/5 max-w-xs bg-[#202020] shadow-xl border-l border-gray-700 flex flex-col"
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg font-semibold text-white"
              >
                Hello, Guest!
              </motion.div>
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <X size={24} />
              </button>
            </div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-1"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between text-base font-medium px-3 py-3 rounded-lg transition ${
                      link.isButton
                        ? 'bg-[#f4c542] text-[#202020] font-semibold hover:bg-[#e0b93c]'
                        : 'text-white hover:bg-gray-800'
                    }`}
                  >
                    <span>{link.label}</span>
                    {!link.isButton && <span className="text-gray-400">{'›'}</span>}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
