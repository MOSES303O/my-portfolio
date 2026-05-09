// app/page.tsx
'use client';

import { useState, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from '@/components/NavBar';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Footer from '@/components/Footer';
import dynamic from 'next/dynamic';

const Portfolio = dynamic(() => import('@/pages/Portfolio'), { ssr: false });
const ContactPage = dynamic(() => import('@/pages/Contact'), { ssr: false });
const WelcomeScreen = dynamic(() => import('@/pages/WelcomeScreen'));

export default function LandingPage() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <Suspense fallback={null}>
            <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
          </Suspense>
        )}
      </AnimatePresence>

      {!showWelcome && (
        <>
          <Navbar />
          <Home />
          <About />
          <Suspense fallback={<div className="h-20" />}>
            <Portfolio />
            <ContactPage />
          </Suspense>
          <Footer />
        </>
      )}
    </>
  );
}