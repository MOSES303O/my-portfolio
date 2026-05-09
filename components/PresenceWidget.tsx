'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { Music2, Code2, Gamepad2, Headphones } from 'lucide-react';

type PresenceActivity =
  | {
      type: 'spotify';
      title?: string;
      artist?: string;
      image?: string;
      iconImage?: string | null;
    }
  | {
      type: 'coding';
      details?: string;
      state?: string;
      app?: string;
      iconImage?: string | null;
    }
  | {
      type: 'gaming';
      name?: string;
      state?: string;
      details?: string;
      iconImage?: string | null;
    }
  | {
      type: 'unknown';
      name?: string;
      state?: string;
      details?: string;
      iconImage?: string | null;
    };

interface Activity {
  key: string;
  title: string;
  subtitle: string;
  image?: string;
  iconImage?: string | null;
  type: 'spotify' | 'coding' | 'gaming' | 'unknown';
  icon: string ;
}

export default function PresenceWidget() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchPresence = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/presence");
        if (!res.ok) return;

        const data = await res.json() as { activities?: PresenceActivity[] };

        const normalized = (data.activities || [])
          .slice(0, 2)
          .map<Activity>((a, idx ) => {
            if (a.type === "spotify") {
              return {
                key: `spotify-${idx}`,
                title: a.title || "Unknown Song",
                subtitle: a.artist || "Spotify",
                image: a.image,
                type: "spotify" as const,
                icon: "spotify",
                iconImage: a.iconImage || null,
              };
            }

            if (a.type === "coding") {
              return {
                key: `coding-${idx}`,
                title: a.details || "Coding",
                subtitle: a.state || a.app || "VS Code",
                type: "coding" as const,
                icon: "vscode",
                iconImage: a.iconImage || null,
              };
            }

            return {
              key: `activity-${idx}`,
              title: a.name || "Playing",
              subtitle: a.state || a.details || "Game",
              type: "gaming" as const,
              icon: "gaming",
              iconImage: a.iconImage || null,
            };
          });

        setActivities(normalized);
      } catch (error) {
        console.error("Failed to fetch presence:", error);
      }
    };

    fetchPresence();
    const interval = setInterval(fetchPresence, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!activities.length) return null;

  const getIcon = (iconType: string, className = "w-7 h-7") => {
  const icons: Record<string, ReactNode> = {
    spotify: <Music2 className={className} />,
    vscode: <Code2 className={className} />,
    gaming: <Gamepad2 className={className} />,
    default: <Headphones className={className} />,
  };
  return icons[iconType] || icons.default;
};

  const getColors = (type: string) => {
    const colors = {
      spotify: {
        bg: "from-green-500/15 to-emerald-500/10",
        border: "border-green-500/30",
        text: "text-green-400",
        badge: "bg-green-500/20 border-green-400/40",
        glow: "shadow-green-500/20",
      },
      coding: {
        bg: "from-blue-500/15 to-indigo-500/10",
        border: "border-blue-500/30",
        text: "text-blue-400",
        badge: "bg-blue-500/20 border-blue-400/40",
        glow: "shadow-blue-500/20",
      },
      gaming: {
        bg: "from-red-500/15 to-pink-500/10",
        border: "border-red-500/30",
        text: "text-red-400",
        badge: "bg-red-500/20 border-red-400/40",
        glow: "shadow-red-500/20",
      },
      default: {
        bg: "from-purple-500/15 to-violet-500/10",
        border: "border-purple-500/30",
        text: "text-purple-400",
        badge: "bg-purple-500/20 border-purple-400/40",
        glow: "shadow-purple-500/20",
      },
    };
    return colors[type as keyof typeof colors] || colors.default;
  };

  const getActivityLabel = (type: string) => {
    const labels: Record<string, string> = {
      spotify: "NOW PLAYING",
      coding: "CODING",
      gaming: "PLAYING",
      default: "ACTIVE",
    };
    return labels[type] || labels.default;
  };

  return (
    <div className="w-full space-y-3">
      {activities.map((act) => {
        const colors = getColors(act.type);

        return (
          <div key={act.key} className="group relative">
            <div
              className={`relative backdrop-blur-md bg-linear-to-br ${colors.bg} rounded-xl border ${colors.border} ${colors.glow} shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden`}
            >
              <div className="p-3 flex items-center gap-3">
                {/* Icon / Image */}
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-black/30 ring-2 ring-white/10 group-hover:ring-white/20 transition-all duration-300">
                    {act.image ? (
                      <div className="relative w-14 h-14">
                        <Image
                          src={act.image}
                          alt={act.title}
                          fill
                          className="object-cover rounded-lg"
                          sizes="56px"
                        />
                      </div>
                    ) : act.iconImage ? (
                      <div className="relative w-14 h-14">
                        <Image
                          src={act.iconImage}
                          alt={act.title}
                          fill
                          className="object-contain p-2"
                          sizes="56px"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className={colors.text}>{getIcon(act.icon)}</div>
                      </div>
                    )}
                                      </div>

                  {/* Spotify Music Bars */}
                  {act.type === "spotify" && (
                    <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 rounded p-0.5 shadow-lg">
                      <div className="flex items-end gap-0.5 h-2">
                        <div className="w-0.5 bg-white rounded-full animate-music-1" />
                        <div className="w-0.5 bg-white rounded-full animate-music-2" />
                        <div className="w-0.5 bg-white rounded-full animate-music-3" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded ${colors.badge} border mb-1.5`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${colors.text.replace('text-', 'bg-')} animate-pulse`} />
                    <span className={`text-[10px] font-bold ${colors.text} uppercase tracking-widest`}>
                      {getActivityLabel(act.type)}
                    </span>
                  </div>

                  <h3 className="text-white font-semibold text-sm truncate leading-tight">
                    {act.title}
                  </h3>
                  <p className="text-white/60 text-xs truncate mt-0.5">
                    {act.subtitle}
                  </p>
                </div>

                {/* Spotify Logo */}
                {act.type === "spotify" && (
                  <div className="self-center">
                    <Image
                      src="/Spotify.png"
                      alt="Spotify"
                      className="w-6 h-6 opacity-75 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      <style jsx>{`
        @keyframes music-1 {
          0%, 100% { height: 30%; }
          50% { height: 90%; }
        }
        @keyframes music-2 {
          0%, 100% { height: 55%; }
          50% { height: 100%; }
        }
        @keyframes music-3 {
          0%, 100% { height: 40%; }
          50% { height: 85%; }
        }

        .animate-music-1 { animation: music-1 0.7s ease-in-out infinite; }
        .animate-music-2 { animation: music-2 0.7s ease-in-out 0.1s infinite; }
        .animate-music-3 { animation: music-3 0.7s ease-in-out 0.25s infinite; }
      `}</style>
    </div>
  );
}