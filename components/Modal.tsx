'use client';

import { useState, useEffect } from 'react';
import { Eye, ArrowRight, ExternalLink } from 'lucide-react';

interface ProjectCardModalProps {
  title: string;
  description: string;
  link: string;
}

const ProjectCardModal = ({ title, description, link }: ProjectCardModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Close modal with Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  const closeModal = () => setIsOpen(false);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/90 transition-all duration-200 hover:scale-105 active:scale-95"
      >
        <span className="text-sm font-medium">Details</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-md mx-4 rounded-2xl bg-[#0a0a0f] border border-white/10 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
            >
              <Eye className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-white mb-4 pr-8">
                {title}
              </h2>

              <p className="text-gray-400 leading-relaxed mb-8">
                {description}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium py-3 px-6 rounded-xl transition-all active:scale-[0.98]"
                >
                  Live Demo
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={closeModal}
                  className="flex-1 py-3 px-6 rounded-xl border border-white/20 hover:bg-white/5 font-medium transition-all active:scale-[0.98]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCardModal;