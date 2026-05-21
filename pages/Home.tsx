import React, { useState, useEffect, useCallback, memo } from "react"
import { Helmet } from "react-helmet-async"
import { FaGithub,FaLinkedin,FaInstagram } from "react-icons/fa6";
import { Mail, ExternalLink, Sparkles } from "lucide-react"
import AOS from 'aos'
import Image from "next/image"
import 'aos/dist/aos.css'

const StatusBadge = memo(() => (
  <div className="inline-block animate-float lg:mx-0" data-aos="zoom-in" data-aos-delay="400">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-linear-to-r from-[#6366f1] to-[#a855f7] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative px-3 sm:px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
        <span className="bg-linear-to-r from-[#6366f1] to-[#a855f7] text-transparent bg-clip-text sm:text-sm text-[0.7rem] font-medium flex items-center">
          <Sparkles className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-blue-400" />
          Ready to Innovate
        </span>
      </div>
    </div>
  </div>
));
StatusBadge.displayName = 'StatusBadge';
const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-linear-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-linear-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
        Software
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-linear-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-linear-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
          Developer
        </span>
      </span>
    </h1>
  </div>
));
MainTitle.displayName = 'MainTitle';

const TechStack = memo(({ tech }: { tech: string }) => (
  <div className="px-2 py-2 hidden sm:block rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors">
    {tech}
  </div>
));
TechStack.displayName = 'TechStack';

const CTAButton = memo(({ href, text, icon: Icon }: { 
  href: string; 
  text: string; 
  icon: React.ComponentType<{ className?: string }> 
}) => (
  <a href={href} className="block w-full sm:w-auto">
    <button className="group relative w-full sm:min-w-42.5 h-12 overflow-hidden rounded-2xl">
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-linear-to-r from-[#4f52c9] to-[#8644c5] rounded-2xl opacity-50 blur-md group-hover:opacity-80 transition-all duration-700"></div>
      
      {/* Main Button */}
      <div className="relative h-full bg-[#29205d] border border-white/10 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 group-hover:border-white/30">
        <span className="text-white font-medium z-10">{text}</span>
        <Icon className={`w-5 h-5 text-white transition-all duration-300 ${text === 'Contact' ? 'group-hover:translate-x-1' : 'group-hover:rotate-45'}`} />
      </div>
    </button>
  </a>
));
CTAButton.displayName = 'CTAButton';
const SocialLink = memo(({ icon: Icon, link, label }: { icon: React.ComponentType<{ className?: string }>; link: string; label: string }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" aria-label={label}>
    <button className="group relative p-3"
      aria-label={label}>
      <div className="absolute inset-0 bg-linear-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative rounded-xl bg-black/50 backdrop-blur-xl p-2 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
        <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
      </div>
    </button>
  </a>
));
SocialLink.displayName = 'SocialLink';
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["Mathematics &  Computer Science Graduate", "Tech Entrepreneur"]
const TECH_STACK = ["React", "Javascript", "Node.js", "Tailwind","Python", "Next.js", "TypeScript", "MongoDB", "GitHub", "Docker","Django","SaaS","SQL","Java","PHP","linux","CI/CD","Bash Scripting"]
const SOCIAL_LINKS = [
  { icon: FaGithub, link: "https://github.com/MOSES303O", label: "GitHub Profile" },
  { icon: FaLinkedin, link: "https://www.linkedin.com/in/moses-ochieng-95abb43ba/", label: "LinkedIn Profile" },
  { icon: FaInstagram, link: "https://www.instagram.com/mose_ceo001/", label: "Instagram Profile" }
];
const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

    // AOS Initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({ once: true, offset: 10 });
    };
    initAOS();
    window.addEventListener('resize', initAOS);
    return () => window.removeEventListener('resize', initAOS);
  }, []);

  // Typing Effect
  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText(prev => prev + WORDS[wordIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText(prev => prev.slice(0, -1));
        setCharIndex(prev => prev - 1);
      } else {
        setWordIndex(prev => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  // ✅ Fixed: Added missing dependencies
  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping, isTyping]);  

  return (
    <>
      <Helmet>
        <title>Ochieng Moses — Software Developer </title>
        <meta name="description" content=" Ochieng Moses, Software Developer,DeVOPs,Web Designer,Ethical Hacker,Software Engineer and Mathematician." />
     <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ochiengs.com" />
        <meta property="og:title" content="Ochieng Moses —Software Web Developer" />
     <meta property="og:description" content=" Ochieng Moses portfolio website, Software Developer." />
        <meta property="og:url" content="https://ochiengsenterprise.com" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Ochieng Moses",
            "jobTitle": "Software Developer",
            "url": "https://ochiengsenterprise.com",
            "sameAs": [
              "https://github.com/MOSES303O",
              "https://www.linkedin.com/in/moses-ochieng-95abb43ba/",
              "https://www.instagram.com/mose_ceo001/"
            ]
          }
        `}</script>
      </Helmet>

      <div className="min-h-screen bg-[#030014] pt-16 overflow-hidden px-6 sm:px-6  lg:px-12 xl:px-20" id="Home">
        <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
          <div className="container mx-auto px-2 md:px-8 lg:px-12">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-16 xl:gap-20">
              {/* Left Column */}
              <div
                  className ="w-full lg:w-1/2 flex flex-col justify-start lg:pr-8 xl:pr-12"
                  data-aos="fade-right"
                  data-aos-delay="200"
                >
                <div className="max-w-lg">
                  <StatusBadge />
                  <MainTitle />

                  {/* Typing Effect */}
                  <div className="h-8 flex items-center m-4.5" data-aos="fade-up" data-aos-delay="800">
                    <span className="text-xl md:text-2xl bg-linear-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-light">
                      {text}
                    </span>
                    <span className="w-1 h-6 bg-linear-to-t from-[#6366f1] to-[#a855f7] ml-1 animate-blink"></span>
                  </div>

                  {/* Description */}
                  <p className="text-base md:text-lg text-gray-400 max-w-xl leading-relaxed font-light"
                    data-aos="fade-up"
                    data-aos-delay="1000">
                    Creating an Innovative, Functional, and User-Friendly Web Application for Digital Solutions.
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1 justify-start" data-aos="fade-up" data-aos-delay="1200">
                    {TECH_STACK.map((tech, index) => (
                      <TechStack key={index} tech={tech} />
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-12" data-aos="fade-up" data-aos-delay="1400">
                    <CTAButton href="#Portfolio" text="Projects" icon={ExternalLink} />
                    <CTAButton href="#Contact" text="Contact" icon={Mail} />
                  </div>

                  {/* Social Links */}
                  <div className="hidden  sm:flex gap-4 mt-12"  data-aos="fade-up" data-aos-delay="1600">
                    {SOCIAL_LINKS.map((social, index) => (
                      <SocialLink key={index} {...social} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - WebM Video */}
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-end"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                data-aos="fade-left"
                data-aos-delay="600">
                <div className="relative w-full opacity-90">
                  <div className={`absolute inset-0 bg-linear-to-r from-[#6366f1]/10 to-[#a855f7]/10 rounded-3xl blur-3xl transition-all duration-700 ease-in-out ${
                    isHovering ? "opacity-50 scale-105" : "opacity-20 scale-100"
                  }`}>
                  </div>

                  <div className={`relative lg:left-12 z-10 w-full opacity-90 transform transition-transform duration-500 ${
                    isHovering ? "scale-105" : "scale-100"
                  }`}>
                    <Image
                      src="/Animation1.gif"
                      alt="Developer Animation"
                      width={700}
                      height={700}
                      className={`w-full h-full object-contain transition-all duration-500 ${
                        isHovering 
                          ? "scale-[95%] sm:scale-[90%] md:scale-[90%] lg:scale-[90%] rotate-2" 
                          : "scale-[90%] sm:scale-[80%] md:scale-[80%] lg:scale-[80%]"
                      }`}
                    />
                  </div>

                  <div className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
                    isHovering ? "opacity-50" : "opacity-20"
                  }`}>
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-400px h-400px bg-linear-to-br from-indigo-500/10 to-purple-500/10 blur-3xl animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite] transition-all duration-700 ${
                      isHovering ? "scale-110" : "scale-100"
                    }`}>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Home);