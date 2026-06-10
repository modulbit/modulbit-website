import Link from "next/link";
import Image from "next/image";

const TopBar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#181d24] px-6 py-4 shadow-2xl backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Left side: Logo + Name */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-transform hover:scale-[1.02] active:scale-95"
        >
          <Image
            src="/logo.png"
            alt="modulBit Logo"
            width={32}
            height={32}
            className="h-8 w-8 rounded-lg"
          />
          <span className="text-xl font-bold tracking-tight text-white font-poppins">
            modul<span className="text-[#00ff9d]">Bit</span>
          </span>
        </Link>

        {/* Right side: Button */}
        <div className="flex items-center gap-3 md:gap-6">
          <Link
            href="/about-us"
            className="hidden md:block text-sm font-medium text-gray-400 transition-colors hover:text-accent link-underline"
          >
            About Us
          </Link>
          <Link
            href="/explore-projects"
            className="hidden md:block text-sm font-medium text-gray-400 transition-colors hover:text-accent link-underline"
          >
            Explore Projects
          </Link>
          <Link
            href="/report-bug"
            className="hidden md:block text-sm font-medium text-gray-400 transition-colors hover:text-accent link-underline"
          >
            Report Bug
          </Link>
          <Link href="/get-involved" className="group relative overflow-hidden rounded-full bg-transparent px-4 md:px-8 py-2 md:py-2.5 text-xs md:text-sm font-semibold text-accent transition-all duration-300 hover:text-[#181d24] hover:bg-accent border border-accent/30 hover:border-accent whitespace-nowrap">
            <span className="relative z-20">Get involved</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
