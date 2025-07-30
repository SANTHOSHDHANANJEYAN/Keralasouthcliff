'use client';

import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/91xxxxxxxxxx" // ✅ Replace with your number
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#627d6a] hover:bg-[#506957] text-white p-4 rounded-full shadow-lg transition-all duration-300 ease-in-out"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={24} />
    </a>
  );
};

export default WhatsAppButton;
