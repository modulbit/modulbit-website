import Link from "next/link";
import Footer from "@/components/footer";

export default function AboutUs() {
  return (
    <div className="bg-[#181d24] text-white selection:bg-accent/30 selection:text-white overflow-hidden bg-mesh min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6">
        <div className="mx-auto max-w-7xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(0,255,157,1)]"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Our Story</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-poppins leading-[1.1] mb-6 tracking-tight">
            About <span className="text-accent text-glow">modulBit</span>
          </h1>
          <p className="text-xl text-gray-400 font-inter mb-10 max-w-3xl mx-auto leading-relaxed">
            Founded with a vision to ensure no one is left behind in the AI revolution.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-6 border-t border-white/5 bg-black/10">
        <div className="mx-auto max-w-4xl">
          <div className="p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden box-glow">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-[50px] -mr-16 -mt-16"></div>

            <div className="relative z-10 text-center">
              <p className="text-xl md:text-2xl font-inter leading-relaxed text-gray-200">
                <span className="text-accent text-glow font-bold">Modern technologies shouldn’t have an age limit.</span> While most startups focus solely on the younger generation, <span className="text-accent text-glow font-bold">modulBit</span> was founded by two Czech students to ensure the technical revolution includes everyone. We are dedicated to making advanced AI and other technologies intuitive and accessible, regardless of your digital background.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Socials */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Get in touch */}
            <div>
              <h2 className="text-3xl font-bold font-poppins mb-6">Get in touch</h2>
              <p className="text-gray-400 font-inter mb-8 text-lg">
                Have questions, suggestions, or just want to say hi? We'd love to hear from you.
              </p>
              <Link
                href="mailto:hello@modulbit.eu"
                className="inline-flex items-center gap-3 text-2xl font-bold text-accent hover:text-white transition-colors group"
              >
                <span>✉</span>
                hello@modulbit.com
              </Link>
            </div>

            {/* Socials */}
            <div>
              <h2 className="text-3xl font-bold font-poppins mb-6">Follow our journey</h2>
              <div className="flex flex-col gap-4">
                <Link href="https://github.com/modulbit" className="group flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 transition-all box-glow-hover">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">📦</span>
                    <span className="font-bold font-poppins">GitHub</span>
                  </div>
                  <span className="text-gray-500 group-hover:text-accent transition-colors">@modulbit</span>
                </Link>
                <Link href="#" className="group flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 transition-all box-glow-hover">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">🐦</span>
                    <span className="font-bold font-poppins">Twitter / X</span>
                  </div>
                  <span className="text-gray-500 group-hover:text-accent transition-colors">Coming soon</span>
                </Link>
                <Link href="#" className="group flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 transition-all box-glow-hover">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">🔗</span>
                    <span className="font-bold font-poppins">LinkedIn</span>
                  </div>
                  <span className="text-gray-500 group-hover:text-accent transition-colors">Coming soon</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}