import Footer from "@/components/footer";
import RoadmapFlow from "@/components/roadmap-flow";
import { getDictionary } from "@/lib/dictionaries";
import { toLocale } from "@/lib/locales";

export default async function RoadmapPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = toLocale((await params).lang);
  const t = getDictionary(lang).roadmap;

  return (
    <div className="bg-[#181d24] text-white selection:bg-accent/30 selection:text-white overflow-hidden min-h-screen">
      {/* Hero */}
      <section className="relative pt-24 pb-10 px-6">
        <div className="mx-auto max-w-7xl relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold font-poppins leading-[1.1] mb-4 tracking-tight">
            {t.title}
          </h1>
          <p className="text-xl text-gray-400 font-inter max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <RoadmapFlow labels={t.nodes} />
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
}
