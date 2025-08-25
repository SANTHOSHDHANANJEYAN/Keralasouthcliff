'use client';

import React from 'react';
import Image from 'next/image';

const VillaImageCard = ({
  isGroundFloor = true,
  className = '',
  imageSrc = '/astega/1-min.jpg' // Updated to use existing image path
}) => {
  const title = isGroundFloor ? 'Ground Floor Villa' : 'Top Floor Villa';

  return (
    <div
      className={`relative w-full max-w-md h-96 overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 ${className}`}
    >
      <Image
        src={imageSrc}
        alt={title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent px-4 py-3">
        <h3 className="text-white text-lg font-semibold">{title}</h3>
      </div>
    </div>
  );
};

export default VillaImageCard;
