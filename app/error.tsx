'use client';

import { useEffect } from 'react';
import Link from "next/link";
import Footer from "@/components/footer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="bg-[#181d24] text-white selection:bg-accent/30 selection:text-white overflow-hidden bg-mesh min-h-[calc(100vh-73px)] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-8">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,1)]"></span>
          <span className="text-xs font-bold uppercase tracking-widest text-red-500">System Error</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold font-poppins mb-6 tracking-tight text-white">
          Something went <span className="text-accent text-glow">wrong</span>
        </h1>
        
        <p className="text-xl text-gray-400 font-inter mb-12 max-w-lg leading-relaxed">
          We encountered an unexpected glitch in the matrix. Our team has been notified.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => reset()}
            className="px-8 py-3 bg-accent text-[#181d24] rounded-full font-bold transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,157,0.4)] cursor-pointer active:scale-95"
          >
            Try Again
          </button>
          
          <Link 
            href="/" 
            className="px-8 py-3 border border-white/20 rounded-full font-bold transition-all hover:bg-white/5 hover:border-accent/40 active:scale-95 text-center"
          >
            Return Home
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
