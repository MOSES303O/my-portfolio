'use client';

import { useRouter } from 'next/navigation';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-[#030014] dark:to-[#1a1a2e] flex items-center justify-center px-4">
      <div className="text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-800 dark:text-white mb-4 animate-bounce">
            404
          </h1>
          <div className="w-24 h-1 bg-indigo-500 mx-auto rounded-full"></div>
        </div>

        {/* Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>

        {/* Illustration */}
        <div className="mb-10">
          <div className="w-32 h-32 mx-auto bg-indigo-100 dark:bg-indigo-950/50 rounded-full flex items-center justify-center mb-6 border border-indigo-200 dark:border-indigo-800">
            <div className="text-6xl">🔍</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
          >
            <ArrowLeft size={20} />
            Back
          </button>

          <button
            onClick={handleGoHome}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
          >
            <Home size={20} />
            Home
          </button>
        </div>
      </div>
    </div>
  );
}