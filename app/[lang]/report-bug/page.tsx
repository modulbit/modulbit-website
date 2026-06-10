import Footer from "@/components/footer";
import BugReportForm from "@/components/bug-report-form";
import { getDictionary } from "@/lib/dictionaries";
import { toLocale } from "@/lib/locales";

export default async function ReportBugPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = toLocale((await params).lang);
  const t = getDictionary(lang).reportBug;

  return (
    <div className="bg-[#181d24] text-white selection:bg-accent/30 selection:text-white overflow-hidden min-h-screen">
      <section className="relative pt-24 pb-16 px-6">
        <div className="mx-auto max-w-4xl relative z-10 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              {t.badge}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-poppins leading-tight mb-6">
            {t.title}
          </h1>
          <p className="text-lg text-gray-400 font-inter mb-10 leading-relaxed">
            {t.subtitle}
          </p>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="mx-auto max-w-4xl">
          <BugReportForm t={t.form} />
        </div>
      </section>

      <p className="text-center text-sm text-gray-500 mb-12">
        {t.criticalNote}{" "}
        <a
          href="mailto:admin@modulbit.eu"
          className="text-accent hover:underline"
        >
          admin@modulbit.eu
        </a>
        .
      </p>

      <Footer lang={lang} />
    </div>
  );
}
