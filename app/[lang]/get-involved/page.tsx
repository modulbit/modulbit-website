import Link from "next/link";
import Footer from "@/components/footer";
import { getDictionary } from "@/lib/dictionaries";
import { toLocale } from "@/lib/locales";

export default async function GetInvolved({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = toLocale((await params).lang);
  const t = getDictionary(lang).getInvolved;

  return (
    <div className="bg-[#181d24] text-white selection:bg-accent/30 selection:text-white overflow-hidden min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6">
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
        </div>
      </section>

      {/* Contribution Ways */}
      <section className="py-20 px-6 border-t border-white/5 bg-black/10">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Open Source */}
            <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 card-lift">
              <div className="text-4xl mb-6">💻</div>
              <h3 className="text-2xl font-bold font-poppins mb-4 text-white group-hover:text-accent transition-colors">{t.code.title}</h3>
              <p className="text-gray-400 font-inter leading-relaxed mb-6">
                {t.code.text}
              </p>
              <Link href="https://github.com/modulbit" className="inline-flex items-center gap-2 text-accent font-bold hover:underline">
                {t.code.link} <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>

            {/* Community */}
            <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 card-lift">
              <div className="text-4xl mb-6">💬</div>
              <h3 className="text-2xl font-bold font-poppins mb-4 text-white group-hover:text-accent transition-colors">{t.community.title}</h3>
              <p className="text-gray-400 font-inter leading-relaxed mb-6">
                {t.community.text}
              </p>
              <Link href="https://github.com/modulbit" className="inline-flex items-center gap-2 text-accent font-bold hover:underline">
                {t.community.link} <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>

            {/* Support */}
            <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 card-lift">
              <div className="text-4xl mb-6">📢</div>
              <h3 className="text-2xl font-bold font-poppins mb-4 text-white group-hover:text-accent transition-colors">{t.spread.title}</h3>
              <p className="text-gray-400 font-inter leading-relaxed mb-6">
                {t.spread.text}
              </p>
              <div className="text-gray-500 italic font-inter">
                {t.spread.note}
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
            {t.ctaTitle}
          </h2>
          <p className="text-xl text-gray-400 font-inter mb-12 max-w-lg mx-auto leading-relaxed">
            {t.ctaText}
          </p>
          <Link href="mailto:hello@modulbit.eu" className="inline-block px-12 py-4 bg-accent text-[#181d24] rounded-full font-bold text-lg transition-all hover:scale-105 hover:bg-accent/90 active:scale-95">
            {t.ctaButton}
          </Link>
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}
