'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { toSlug } from '@/utils/slug';
import Image from 'next/image';

interface CardProjectProps {
  Img: string;
  Title: string;
  Description: string;
  Link?: string;        // Live Demo Link
  id?: string | number;
}

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id }: CardProjectProps) => {

  const handleLiveDemo = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ProjectLink) {
      e.preventDefault();
      alert("Live demo link is not available");
    }
  };

  return (
    <div className="group relative w-full">
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-purple-500/20 hover:-translate-y-1">
        
        {/* Background Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />

        <div className="relative p-5 z-10">
          {/* Project Image */}
          <div className="relative overflow-hidden rounded-xl aspect-video">
            <Image
              src={Img}
              alt={Title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              width={16}
              height={9}
            />
          </div>

          <div className="mt-5 space-y-3">
            <h3 className="text-xl font-semibold bg-linear-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent line-clamp-1">
              {Title}
            </h3>

            <p className="text-gray-300/80 text-sm leading-relaxed line-clamp-3 min-h-62px">
              {Description}
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex items-center justify-between">
              {ProjectLink ? (
                <a
                  href={ProjectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLiveDemo}
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  <span className="text-sm font-medium">Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-gray-500 text-sm">Demo Not Available</span>
              )}

              {id ? (
                <Link
                  href={`/project/${toSlug(Title)}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/90 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <span className="text-sm font-medium">Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="text-gray-500 text-sm">Details Not Available</span>
              )}
            </div>
          </div>

          {/* Hover Border Effect */}
          <div className="absolute inset-0 border border-transparent group-hover:border-purple-500/50 rounded-2xl transition-colors duration-300 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default CardProject;