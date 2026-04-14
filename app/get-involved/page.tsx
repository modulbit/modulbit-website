import Link from "next/link";
import Footer from "@/components/footer";

export default function GetInvolved() {
  return (
    <div className="bg-[#181d24] text-white selection:bg-accent/30 selection:text-white overflow-hidden bg-mesh min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6">
        <div className="mx-auto max-w-7xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(0,255,157,1)]"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Join the movement</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-poppins leading-[1.1] mb-6 tracking-tight">
            Get <span className="text-accent text-glow">Involved</span>
          </h1>
          <p className="text-xl text-gray-400 font-inter mb-10 max-w-2xl mx-auto leading-relaxed">
            There are many ways to support our mission of making AI accessible and practical for everyone. Whether you're a developer, designer, or enthusiast, your contribution matters.
          </p>
        </div>
      </section>

      {/* Contribution Ways */}
      <section className="py-20 px-6 border-t border-white/5 bg-black/10">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Open Source */}
            <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 transition-all duration-300 box-glow-hover">
              <div className="text-4xl mb-6">💻</div>
              <h3 className="text-2xl font-bold font-poppins mb-4 text-white group-hover:text-accent transition-colors">Contribute Code</h3>
              <p className="text-gray-400 font-inter leading-relaxed mb-6">
                Our projects are open source. Explore our repositories, fix bugs, or suggest new features on GitHub.
              </p>
              <Link href="https://github.com/modulbit" className="inline-flex items-center gap-2 text-accent font-bold hover:underline">
                View GitHub <span className="text-lg">→</span>
              </Link>
            </div>

            {/* Community */}
            <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 transition-all duration-300 box-glow-hover">
              <div className="text-4xl mb-6">💬</div>
              <h3 className="text-2xl font-bold font-poppins mb-4 text-white group-hover:text-accent transition-colors">Join the Community</h3>
              <p className="text-gray-400 font-inter leading-relaxed mb-6">
                Connect with other contributors, ask questions, and share your ideas in our community channels.
              </p>
              <Link href="https://github.com/modulbit" className="inline-flex items-center gap-2 text-accent font-bold hover:underline">
                Join us <span className="text-lg">→</span>
              </Link>
            </div>

            {/* Support */}
            <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 transition-all duration-300 box-glow-hover">
              <div className="text-4xl mb-6">📢</div>
              <h3 className="text-2xl font-bold font-poppins mb-4 text-white group-hover:text-accent transition-colors">Spread the Word</h3>
              <p className="text-gray-400 font-inter leading-relaxed mb-6">
                Help us reach more people. Share our mission and projects with your network and community.
              </p>
              <div className="text-gray-500 italic font-inter">
                Coming soon: Press kit & media resources
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-accent/5 pointer-events-none"></div>
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-8 leading-tight">
            Not sure where to start?
          </h2>
          <p className="text-xl text-gray-400 font-inter mb-12 max-w-lg mx-auto leading-relaxed">
            Send us a message and we'll help you find the best way to contribute based on your skills and interests.
          </p>
          <Link href="mailto:hello@modulbit.com" className="inline-block px-12 py-4 bg-accent text-[#181d24] rounded-full font-bold text-lg transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,157,0.5)] active:scale-95">
            Contact Us
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
