import Link from "next/link";
import Footer from "@/components/footer";

export default function NotFound() {
  return (
    <div className="bg-[#181d24] text-white selection:bg-accent/30 selection:text-white overflow-hidden min-h-[calc(100vh-73px)] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">Error 404</span>
        </div>
        
        <h1 className="text-7xl md:text-9xl font-bold font-poppins mb-6 tracking-tight text-accent">
          404
        </h1>
        
        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-8">
          Lost in the <span className="text-white">digital void?</span>
        </h2>
        
        <p className="text-xl text-gray-400 font-inter mb-12 max-w-lg leading-relaxed">
          The page you are looking for doesn&apos;t exist or has been moved to another dimension.
        </p>

        <Link 
          href="/" 
          className="px-8 py-3 bg-accent text-[#181d24] rounded-full font-bold transition-all hover:scale-105 hover:bg-accent/90 active:scale-95"
        >
          Return Home
        </Link>
      </div>

      <Footer />
    </div>
  );
}
