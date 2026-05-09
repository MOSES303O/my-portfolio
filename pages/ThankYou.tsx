'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

const ThankYouPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#030014]">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute -inset-4 bg-linear-to-r from-[#6366f1] to-[#a855f7] rounded-full opacity-20 blur-2xl" />
            <CheckCircle className="w-20 h-20 text-[#6366f1] relative" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-linear-to-r from-[#6366f1] to-[#a855f7]">
          Thank You!
        </h1>

        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
          Your message has been received. Ill get back to you as soon as possible.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3.5 bg-linear-to-r from-[#6366f1] to-[#a855f7] text-white rounded-2xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#6366f1]/30 active:scale-[0.98]"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;