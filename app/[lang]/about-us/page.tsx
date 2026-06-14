import Link from "next/link";
import Footer from "@/components/footer";
import { getDictionary } from "@/lib/dictionaries";
import { toLocale } from "@/lib/locales";

export default async function AboutUs({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = toLocale((await params).lang);
  const t = getDictionary(lang).about;

  return (
    <div className="bg-[#181d24] text-white selection:bg-accent/30 selection:text-white overflow-hidden min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6">
        <div className="mx-auto max-w-7xl relative z-10 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">{t.badge}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-poppins leading-[1.1] mb-6 tracking-tight">
            {t.titlePrefix} <span className="text-accent">modulBit</span>
          </h1>
          <p className="text-xl text-gray-400 font-inter mb-10 max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-6 border-t border-white/5 bg-black/10">
        <div className="mx-auto max-w-4xl">
          <div className="p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden">
            <div className="relative z-10 text-center">
              <p className="text-xl md:text-2xl font-inter leading-relaxed text-gray-200">
                <span className="text-accent font-bold">{t.missionLead}</span>{t.missionBody1}<span className="text-accent font-bold">modulBit</span>{t.missionBody2}<br />{t.missionBody3}<span className="text-accent font-bold">{t.missionTara}</span>{t.missionBody4}
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
              <h2 className="text-3xl font-bold font-poppins mb-6">{t.contactTitle}</h2>
              <p className="text-gray-400 font-inter mb-8 text-lg">
                {t.contactText}
              </p>
              <Link
                href="mailto:hello@modulbit.eu"
                className="inline-flex items-center gap-3 text-2xl font-bold text-accent hover:text-white transition-colors group"
              >
                <span>✉</span>
                hello@modulbit.eu
              </Link>
            </div>

            {/* Socials */}
            <div>
              <h2 className="text-3xl font-bold font-poppins mb-6">{t.followTitle}</h2>
              <div className="flex flex-col gap-4">
                <Link href="https://github.com/modulbit" className="group flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 card-lift">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">📦</span>
                    <span className="font-bold font-poppins">GitHub</span>
                  </div>
                  <span className="text-gray-500 group-hover:text-accent transition-colors">@modulbit</span>
                </Link>
                <Link href="#" className="group flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 card-lift">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">🐦</span>
                    <span className="font-bold font-poppins">Twitter / X</span>
                  </div>
                  <span className="text-gray-500 group-hover:text-accent transition-colors">{t.comingSoon}</span>
                </Link>
                <Link href="#" className="group flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 card-lift">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">🔗</span>
                    <span className="font-bold font-poppins">LinkedIn</span>
                  </div>
                  <span className="text-gray-500 group-hover:text-accent transition-colors">{t.comingSoon}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}
