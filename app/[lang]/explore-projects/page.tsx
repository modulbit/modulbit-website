import Link from "next/link";
import Footer from "@/components/footer";
import { getDictionary } from "@/lib/dictionaries";
import { toLocale } from "@/lib/locales";

export default async function ExploreProjects({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = toLocale((await params).lang);
  const t = getDictionary(lang).projects;

  const moreProjectEmojis = ["🛒", "📡", "🎨"];

  return (
    <div className="bg-[#181d24] text-white selection:bg-accent/30 selection:text-white overflow-hidden min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6">
        <div className="mx-auto max-w-7xl relative z-10 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">{t.badge}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-poppins leading-[1.1] mb-6 tracking-tight">
            {t.title} <span className="text-accent">{t.titleAccent}</span>
          </h1>
          <p className="text-xl text-gray-400 font-inter mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
          <Link
            href={`/${lang}/roadmap`}
            className="inline-block px-8 py-3 border border-accent/40 text-accent rounded-full font-bold hover:bg-accent hover:text-[#181d24] transition-all active:scale-95"
          >
            {t.viewRoadmap}
          </Link>
        </div>
      </section>

      {/* Flagship Project - Featured */}
      <section className="py-12 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="relative group rounded-3xl border border-white/10 hover:border-accent/30 transition-all duration-500 overflow-hidden">
            <div className="relative z-10 bg-[#1a2028] rounded-[calc(1.5rem-1px)] p-8 md:p-16 flex flex-col items-center text-center">
              <div className="md:absolute md:top-8 md:right-8 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/30 mb-8 md:mb-0">
                <span className="text-xs font-bold uppercase tracking-widest text-accent">{t.comingSoon}</span>
              </div>

              <div className="w-24 h-24 mb-10 rounded-2xl bg-accent/10 flex items-center justify-center text-5xl border border-accent/20">
                💬
              </div>

              <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">Tara</h2>
              <p className="text-xl text-gray-400 font-inter mb-10 max-w-2xl leading-relaxed">
                {t.taraDescription}
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <span className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-gray-300">{t.tagAccessibility}</span>
                <span className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-gray-300">{t.tagOpenSource}</span>
                <span className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-gray-300">{t.tagAiMl}</span>
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
            <h3 className="text-2xl font-bold font-poppins mb-2">{t.designTitle}</h3>
            <p className="text-gray-400 font-inter">{t.designSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.principles.map((principle, index) => (
              <div key={principle.title} className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 card-lift">
                <div className="text-4xl mb-6">{["🔍", "🗣️", "↩️", "🧭"][index]}</div>
                <h4 className="text-xl font-bold font-poppins mb-3 text-white group-hover:text-accent transition-colors">{principle.title}</h4>
                <p className="text-gray-400 font-inter leading-relaxed">
                  {principle.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tara – privacy & tech */}
      <section className="py-12 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-4xl mb-6">🔒</div>
              <h4 className="text-xl font-bold font-poppins mb-4 text-white">{t.privacyTitle}</h4>
              <ul className="text-gray-400 font-inter leading-relaxed space-y-3">
                {t.privacyItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-4xl mb-6">⚙️</div>
              <h4 className="text-xl font-bold font-poppins mb-4 text-white">{t.techTitle}</h4>
              <p className="text-gray-400 font-inter leading-relaxed mb-6">
                {t.techText}
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
            <h3 className="text-2xl font-bold font-poppins mb-2">{t.moreTitle}</h3>
            <p className="text-gray-400 font-inter">{t.moreSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.moreProjects.map((project, index) => (
              <div key={project.title} className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 card-lift overflow-hidden">
                <div className="absolute top-4 right-4 text-xs font-mono text-gray-600">ID: MB-00{index + 2}</div>
                <div className="w-12 h-12 mb-6 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {moreProjectEmojis[index]}
                </div>
                <h4 className="text-xl font-bold font-poppins mb-3 text-white group-hover:text-accent transition-colors">{project.title}</h4>
                <p className="text-gray-400 font-inter leading-relaxed mb-6">
                  {project.text}
                </p>
                <div className="text-gray-500 text-sm font-medium">{t.comingSoon}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl font-bold font-poppins mb-8">{t.ideaTitle}</h2>
          <p className="text-lg text-gray-400 font-inter mb-10 max-w-lg mx-auto">
            {t.ideaText}
          </p>
          <Link href={`/${lang}/get-involved`} className="inline-block px-10 py-3.5 border border-accent/40 text-accent rounded-full font-bold hover:bg-accent hover:text-[#181d24] transition-all active:scale-95">
            {t.suggestProject}
          </Link>
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}
