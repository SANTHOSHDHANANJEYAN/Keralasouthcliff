'use client';

import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const message = "Hi, I'm interested in booking a villa at Asteya. Please share details.";
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/917994144472?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
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
