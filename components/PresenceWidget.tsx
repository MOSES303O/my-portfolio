'use client';

import React, { useState} from 'react';
import Image from 'next/image';
import { Music2, Code2, Gamepad2 } from 'lucide-react';

interface Activity {
  key: string;
  title: string;
  subtitle: string;
  type: 'spotify' | 'coding' | 'gaming';
}

export default function PresenceWidget() {
  // ✅ Pure mock data - no fetch, no backend needed
  const [activities] = useState<Activity[]>([
    {
      key: 'spotify-1',
      title: "Levitating",
      subtitle: "Dua Lipa • Future Nostalgia",
      type: "spotify",
    },
    {
      key: 'coding-1',
      title: "Building Portfolio",
      subtitle: "Next.js + TypeScript",
      type: "coding",
    },
  ]);

  if (activities.length === 0) return null;

  return (
    <div className="w-full space-y-3">
      {activities.map((act) => (
        <div key={act.key} className="group relative">
          <div className="relative backdrop-blur-md bg-linear-to-br from-white/5 to-white/10 rounded-2xl border border-white/10 p-3.5 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center gap-3">
              {/* Icon */}
              <div className="relative shrink-0 w-12 h-12 rounded-xl bg-black/40 flex items-center justify-center overflow-hidden">
                {act.type === 'spotify' && <Music2 className="w-6 h-6 text-green-400" />}
                {act.type === 'coding' && <Code2 className="w-6 h-6 text-blue-400" />}
                {act.type === 'gaming' && <Gamepad2 className="w-6 h-6 text-red-400" />}
              </div>

              {/* Text Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium text-sm truncate">
                  {act.title}
                </h3>
                <p className="text-white/60 text-xs truncate mt-0.5">
                  {act.subtitle}
                </p>
              </div>

              {/* Spotify Logo */}
              {act.type === 'spotify' && (
                <div className="self-center">
                  <Image
                    src="/Spotify.png"
                    alt="Spotify"
                    width={24}
                    height={24}
                    className="opacity-75 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}