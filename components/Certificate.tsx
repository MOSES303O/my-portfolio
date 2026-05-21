'use client';

import { useState } from 'react';
import { Fullscreen, X } from 'lucide-react';
import Image from 'next/image';
interface CertificateProps {
  ImgSertif: string;
}

const Certificate = ({ ImgSertif }: CertificateProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      {/* Thumbnail Card */}
      <div 
        className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
        onClick={handleOpen}
      >
        <div className="relative">
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/60 z-10 transition-opacity group-hover:opacity-70" />

          <Image
            width={30}
            height={20}
            src={ImgSertif}
            alt="Certificate"
            className="w-full aspect-16/11.5 object-cover transition-all duration-500 group-hover:scale-105"
          />

          {/* Hover Content */}
          <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex flex-col items-center text-white text-center">
              <Fullscreen className="w-10 h-10 mb-2 drop-shadow-md" />
              <p className="font-semibold text-lg tracking-wide drop-shadow-md">
                View Certificate
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-200 flex items-center justify-center bg-black/95 backdrop-blur-md"
          onClick={handleClose}
        >
          <div 
            className="relative max-w-[95vw] max-h-[95vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute -top-4 -right-4 z-30 bg-black/70 hover:bg-red-600 text-white p-3 rounded-full transition-all hover:scale-110"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Full Image */}
            <Image
              src={ImgSertif}
              width={30}
              height={20}
              alt="Certificate Full View"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Certificate;