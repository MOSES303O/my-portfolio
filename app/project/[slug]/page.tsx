// app/project/[slug]/page.tsx
'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Footer from '@/components/Footer';

const ProjectDetails = dynamic(() => import('@/components/ProjectDetail'));

export default function ProjectPage() {
  return (
    <>
      <Suspense fallback={<div className="min-h-screen" />}>
        <ProjectDetails />
      </Suspense>
      <Footer />
    </>
  );
}