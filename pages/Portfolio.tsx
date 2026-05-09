'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Code, Award, Boxes } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SwipeableViews from 'react-swipeable-views';

import CardProject from '@/components/CardProject';
import Certificate from '@/components/Certificate';
import TechStackIcon from '@/components/TechStackIcon';

// Mock Data
const mockProjects = [
  {
    id: 1,
    Title: "E-Commerce Platform",
    Description: "Full-stack modern e-commerce with payment integration and admin dashboard.",
    Img: "/projects/project1.jpg",
    Link: "https://example.com",
  },
  {
    id: 2,
    Title: "Task Management App",
    Description: "Beautiful and responsive task manager with real-time collaboration features.",
    Img: "/projects/project2.jpg",
    Link: "https://example.com",
  },
  // Add more mock projects as needed
];

const mockCertificates = [
  { id: 1, Img: "/certificates/cert1.jpg" },
  { id: 2, Img: "/certificates/cert2.jpg" },
  { id: 3, Img: "/certificates/cert3.jpg" },
];

const techStacks = [
  { icon: "/icons/html.svg", language: "HTML" },
  { icon: "/icons/css.svg", language: "CSS" },
  { icon: "/icons/javascript.svg", language: "JavaScript" },
  { icon: "/icons/tailwind.svg", language: "Tailwind CSS" },
  { icon: "/icons/reactjs.svg", language: "ReactJS" },
  { icon: "/icons/vite.svg", language: "Vite" },
  { icon: "/icons/nodejs.svg", language: "Node JS" },
  { icon: "/icons/bootstrap.svg", language: "Bootstrap" },
  { icon: "/icons/firebase.svg", language: "Firebase" },
  { icon: "/icons/vercel.svg", language: "Vercel" },
];

const ToggleButton = ({ onClick, isShowingMore }: { onClick: () => void; isShowingMore: boolean }) => (
  <button
    onClick={onClick}
    className="px-3 py-1.5 text-slate-300 hover:text-white text-sm font-medium transition-all duration-300 ease-in-out flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 hover:border-white/20 backdrop-blur-sm group relative overflow-hidden"
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform duration-300 ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}`}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full" />
  </button>
);

export default function Portfolio() {
  const [value, setValue] = useState(0);
  const [projects] = useState(mockProjects);
  const [certificates] = useState(mockCertificates);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  // Save to localStorage for Project Details compatibility
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
    localStorage.setItem("certificates", JSON.stringify(certificates));
  }, [projects, certificates]);

  const toggleShowMore = (type: 'projects' | 'certificates') => {
    if (type === 'projects') setShowAllProjects(prev => !prev);
    else setShowAllCertificates(prev => !prev);
  };

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-3rem bg-[#030014] overflow-hidden" id="Portofolio">
      {/* Header */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-[#6366f1] to-[#a855f7]">
          Portfolio Showcase
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise.
        </p>
      </div>

      {/* Custom Tabs */}
      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl">
        <div className="flex border-b border-white/10">
          {['Projects', 'Certificates', 'Tech Stack'].map((label, index) => {
            const Icon = [Code, Award, Boxes][index];
            return (
              <button
                key={index}
                onClick={() => setValue(index)}
                className={`flex-1 py-5 px-4 flex flex-col items-center gap-2 text-sm md:text-base font-semibold transition-all duration-300 ${
                  value === index
                    ? 'text-white bg-linear-to-b from-white/10 to-transparent border-b-2 border-purple-500'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            );
          })}
        </div>

        <SwipeableViews index={value} onChangeIndex={setValue}>
          {/* Projects Tab */}
          <div className={value === 0 ? 'block' : 'hidden'}>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
                {displayedProjects.map((project, index) => (
                  <div
                    key={project.id}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : "1200"}
                  >
                    <CardProject
                      Img={project.Img}
                      Title={project.Title}
                      Description={project.Description}
                      Link={project.Link}
                      id={project.id}
                    />
                  </div>
                ))}
              </div>
            </div>

            {projects.length > initialItems && (
              <div className="px-6 pb-8">
                <ToggleButton onClick={() => toggleShowMore('projects')} isShowingMore={showAllProjects} />
              </div>
            )}
          </div>

          {/* Certificates Tab */}
          <div className={value === 1 ? 'block' : 'hidden'}>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {displayedCertificates.map((cert, index) => (
                  <div
                    key={cert.id}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : "1200"}
                  >
                    <Certificate ImgSertif={cert.Img} />
                  </div>
                ))}
              </div>
            </div>

            {certificates.length > initialItems && (
              <div className="px-6 pb-8">
                <ToggleButton onClick={() => toggleShowMore('certificates')} isShowingMore={showAllCertificates} />
              </div>
            )}
          </div>

          {/* Tech Stack Tab */}
          <div className={value === 2 ? 'block' : 'hidden'}>
            <div className="p-6 pb-12">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {techStacks.map((stack, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : "1200"}
                  >
                    <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SwipeableViews>
      </div>
    </div>
  );
}