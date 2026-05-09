'use client';

import React from 'react';
import Image from 'next/image';

interface TechStackIconProps {
  TechStackIcon: string;   // Path to the icon image
  Language: string;        // Name of the technology
}

const TechStackIcon = ({ TechStackIcon, Language }: TechStackIconProps) => {
  return (
    <div className="group p-6 rounded-2xl bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-3 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl border border-white/5 hover:border-white/10">
      <div className="relative">
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-50 blur transition duration-300" />
        
        {/* Icon */}
        <div className="relative">
          <Image 
            src={TechStackIcon} 
            alt={`${Language} icon`} 
            width={80}
            height={80}
            className="h-16 w-16 md:h-20 md:w-20 transform transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Label */}
      <span className="text-slate-300 font-semibold text-sm md:text-base tracking-wide group-hover:text-white transition-colors duration-300">
        {Language}
      </span>
    </div>
  );
};

export default TechStackIcon;