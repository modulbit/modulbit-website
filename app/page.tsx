import Link from "next/link";
import Footer from "@/components/footer";
import HeroAIAnimation from "@/components/hero-ai-animation";

export default function Home() {
  return (
    <div className="bg-[#181d24] text-white selection:bg-accent/30 selection:text-white overflow-hidden min-h-screen">

      <section className="relative pt-24 pb-32 px-6">
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-7xl font-bold font-poppins leading-[1.1] mb-6 tracking-tight animate-fade-up">
                Bringing Modern Technologies <br />
                <span className="text-accent">closer to everyone</span>
              </h1>
              <p className="text-xl text-gray-400 font-inter mb-10 max-w-lg leading-relaxed animate-fade-up [animation-delay:150ms]">
                Open source projects designed with a mission: making modern technologies accessible, practical, and friendly for people of all ages.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-up [animation-delay:300ms]">
                <Link href="/explore-projects" className="px-8 py-3 bg-accent text-[#181d24] rounded-full font-bold transition-all hover:scale-105 hover:bg-accent/90 active:scale-95">
                  Explore Projects
                </Link>
                <Link href="/get-involved" className="px-8 py-3 border border-white/20 rounded-full font-bold transition-all hover:bg-white/5 hover:border-accent/40 active:scale-95 text-center">
                  Join Community
                </Link>
              </div>
            </div>

            <div className="animate-fade-up [animation-delay:450ms]">
              <HeroAIAnimation />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-t border-white/5 bg-black/20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-accent">Our Mission</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-8 leading-tight">
              Real-world impact through <br />
              <span className="text-white">open source</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-400 font-inter leading-relaxed">
              <p>
                We believe modern technologies should be accessible to everyone, regardless of age or technical background.
              </p>
              <p className="max-w-3xl">
                Our focus is creating tools that help older people use modern technologies with confidence, paired with
                community-driven software that anyone can improve and reuse.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">What we are building</h2>
            <p className="text-gray-400 font-inter">Tools and resources designed with intention and care</p>
            <Link href="/roadmap" className="text-accent hover:text-accent/80 transition-colors">
              View Roadmap
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 card-lift">
              <div className="text-4xl mb-6">🤝</div>
              <h3 className="text-xl font-bold font-poppins mb-4 text-white group-hover:text-accent transition-colors">Accessibility First</h3>
              <p className="text-gray-400 font-inter leading-relaxed">
                Tools designed for older people to use AI with confidence and ease.
              </p>
            </div>

            <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 card-lift">
              <div className="text-4xl mb-6">🔐</div>
              <h3 className="text-xl font-bold font-poppins mb-4 text-white group-hover:text-accent transition-colors">Open Source</h3>
              <p className="text-gray-400 font-inter leading-relaxed">
                Software anyone can improve, reuse, and build upon freely.
              </p>
            </div>

            <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 card-lift">
              <div className="text-4xl mb-6">🌱</div>
              <h3 className="text-xl font-bold font-poppins mb-4 text-white group-hover:text-accent transition-colors">Community Driven</h3>
              <p className="text-gray-400 font-inter leading-relaxed">
                Growing ecosystem of projects beyond our core mission.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-accent/5 pointer-events-none"></div>
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold font-poppins mb-12 leading-tight">
            Ready to make an <br />
            <span className="text-accent">impact?</span>
          </h2>
          <Link href="/get-involved" className="inline-block px-12 py-4 bg-accent text-[#181d24] rounded-full font-bold text-lg transition-all hover:scale-105 hover:bg-accent/90 active:scale-95">
            Join the Mission
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}