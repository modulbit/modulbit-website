import Link from "next/link";
import Footer from "@/components/footer";

export default function ExploreProjects() {
  return (
    <div className="bg-[#181d24] text-white selection:bg-accent/30 selection:text-white overflow-hidden min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6">
        <div className="mx-auto max-w-7xl relative z-10 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Our Portfolio</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-poppins leading-[1.1] mb-6 tracking-tight">
            Explore <span className="text-accent">Projects</span>
          </h1>
          <p className="text-xl text-gray-400 font-inter mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover the tools and platforms we&apos;re building to bridge the gap between human intuition and artificial intelligence.
          </p>
          <Link
            href="/roadmap"
            className="inline-block px-8 py-3 border border-accent/40 text-accent rounded-full font-bold hover:bg-accent hover:text-[#181d24] transition-all active:scale-95"
          >
            View Roadmap
          </Link>
        </div>
      </section>

      {/* Flagship Project - Featured */}
      <section className="py-12 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="relative group rounded-3xl border border-white/10 hover:border-accent/30 transition-all duration-500 overflow-hidden">
            <div className="relative z-10 bg-[#1a2028] rounded-[calc(1.5rem-1px)] p-8 md:p-16 flex flex-col items-center text-center">
              <div className="md:absolute md:top-8 md:right-8 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/30 mb-8 md:mb-0">
                <span className="text-xs font-bold uppercase tracking-widest text-accent">Coming Soon</span>
              </div>

              <div className="w-24 h-24 mb-10 rounded-2xl bg-accent/10 flex items-center justify-center text-5xl border border-accent/20">
                💬
              </div>

              <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">Tara</h2>
              <p className="text-xl text-gray-400 font-inter mb-10 max-w-2xl leading-relaxed">
                Tara is an AI-powered assistant that helps elderly users with everyday tech tasks – things like writing an email, printing a document, or navigating a website. Tara should feel like asking a patient, knowledgeable friend for help, not like using a complicated app.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <span className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-gray-300">Accessibility</span>
                <span className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-gray-300">Open Source</span>
                <span className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-gray-300">AI/ML</span>
              </div>

              {/*
              <br />

              <a href="learn-more-mail" className="inline-block px-8 py-3 border border-accent/40 text-accent rounded-full font-bold hover:bg-accent hover:text-[#181d24] transition-all active:scale-95">
                Learn More
              </a>
              */}

            </div>
          </div>
        </div>
      </section>

      {/* Tara – UX principles */}
      <section className="py-12 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h3 className="text-2xl font-bold font-poppins mb-2">How Tara is designed</h3>
            <p className="text-gray-400 font-inter">Every detail follows a few simple principles</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 card-lift">
              <div className="text-4xl mb-6">🔍</div>
              <h4 className="text-xl font-bold font-poppins mb-3 text-white group-hover:text-accent transition-colors">Large, readable text</h4>
              <p className="text-gray-400 font-inter leading-relaxed">
                No small fonts or dense layouts – everything is easy on the eyes.
              </p>
            </div>

            <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 card-lift">
              <div className="text-4xl mb-6">🗣️</div>
              <h4 className="text-xl font-bold font-poppins mb-3 text-white group-hover:text-accent transition-colors">No technical jargon</h4>
              <p className="text-gray-400 font-inter leading-relaxed">
                Everything is explained in plain language, the way a friend would.
              </p>
            </div>

            <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 card-lift">
              <div className="text-4xl mb-6">↩️</div>
              <h4 className="text-xl font-bold font-poppins mb-3 text-white group-hover:text-accent transition-colors">Forgiving UI</h4>
              <p className="text-gray-400 font-inter leading-relaxed">
                Mistakes are easy to undo, with clear confirmations before any action.
              </p>
            </div>

            <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 card-lift">
              <div className="text-4xl mb-6">🧭</div>
              <h4 className="text-xl font-bold font-poppins mb-3 text-white group-hover:text-accent transition-colors">Simple navigation</h4>
              <p className="text-gray-400 font-inter leading-relaxed">
                Minimal options on screen at once, so the next step is always clear.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tara – privacy & tech */}
      <section className="py-12 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-4xl mb-6">🔒</div>
              <h4 className="text-xl font-bold font-poppins mb-4 text-white">Privacy &amp; data</h4>
              <ul className="text-gray-400 font-inter leading-relaxed space-y-3">
                <li>We are based in the EU and comply with GDPR.</li>
                <li>AI responses go through OpenRouter, which is GDPR compliant and does not store user content.</li>
                <li>Conversations are stored until you delete them, or after 2 years of inactivity.</li>
                <li>Authentication is handled by Clerk, and usage analytics by PostHog.</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-4xl mb-6">⚙️</div>
              <h4 className="text-xl font-bold font-poppins mb-4 text-white">Under the hood</h4>
              <p className="text-gray-400 font-inter leading-relaxed mb-6">
                Tara runs on our own infrastructure at tara.modulbit.eu and api.modulbit.eu, deployed with Docker.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-gray-300">Next.js</span>
                <span className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-gray-300">Go</span>
                <span className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-gray-300">PostgreSQL</span>
                <span className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-gray-300">Redis</span>
                <span className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-gray-300">Clerk</span>
                <span className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-gray-300">OpenRouter</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Projects Grid */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <h3 className="text-2xl font-bold font-poppins mb-2">More Initiatives</h3>
            <p className="text-gray-400 font-inter">Smaller experiments and community-driven tools</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 card-lift overflow-hidden">
              <div className="absolute top-4 right-4 text-xs font-mono text-gray-600">ID: MB-002</div>
              <div className="w-12 h-12 mb-6 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                🛒
              </div>
              <h4 className="text-xl font-bold font-poppins mb-3 text-white group-hover:text-accent transition-colors">Smart shopping app</h4>
              <p className="text-gray-400 font-inter leading-relaxed mb-6">
                A mobile app that helps users find the best deals and discounts for their shopping needs.
              </p>
              <div className="text-gray-500 text-sm font-medium">Coming soon</div>
            </div>

            <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 card-lift overflow-hidden">
              <div className="absolute top-4 right-4 text-xs font-mono text-gray-600">ID: MB-003</div>
              <div className="w-12 h-12 mb-6 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                📡
              </div>
              <h4 className="text-xl font-bold font-poppins mb-3 text-white group-hover:text-accent transition-colors">Family Dashboard</h4>
              <p className="text-gray-400 font-inter leading-relaxed mb-6">
                A web-based dashboard that provides an overview of family activities, schedules, and important information.
              </p>
              <div className="text-gray-500 text-sm font-medium">Coming soon</div>
            </div>

            <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 card-lift overflow-hidden">
              <div className="absolute top-4 right-4 text-xs font-mono text-gray-600">ID: MB-004</div>
              <div className="w-12 h-12 mb-6 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                🎨
              </div>
              <h4 className="text-xl font-bold font-poppins mb-3 text-white group-hover:text-accent transition-colors">Design Kit</h4>
              <p className="text-gray-400 font-inter leading-relaxed mb-6">
                UI/UX standards for building senior-friendly software and tools.
              </p>
              <div className="text-gray-500 text-sm font-medium">Coming Soon</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl font-bold font-poppins mb-8">Have an idea for a project?</h2>
          <p className="text-lg text-gray-400 font-inter mb-10 max-w-lg mx-auto">
            We&apos;re always looking for new ways to make modern technologies more helpful and accessible. Let&apos;s collaborate.
          </p>
          <Link href="/get-involved" className="inline-block px-10 py-3.5 border border-accent/40 text-accent rounded-full font-bold hover:bg-accent hover:text-[#181d24] transition-all active:scale-95">
            Suggest a Project
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
