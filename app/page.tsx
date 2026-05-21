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
        <div className="flex min-h-screen flex-col w-full">
          <Navbar />
          {/* MAIN CONTENT WRAPPER - This is the key fix */}
          <main className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
            <Home />
            <About />
            <Suspense fallback={<div className="h-20" />}>
              <Portfolio />
              <ContactPage />
            </Suspense>
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}