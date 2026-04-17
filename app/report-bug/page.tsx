import Footer from "@/components/footer";
import BugReportForm from "@/components/bug-report-form";
import { TICKETS_REPOSITORY } from "@/lib/tickets";

export default function ReportBugPage() {
  return (
    <div className="bg-[#181d24] text-white selection:bg-accent/30 selection:text-white overflow-hidden bg-mesh min-h-screen">
      <section className="relative pt-24 pb-16 px-6">
        <div className="mx-auto max-w-4xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(0,255,157,1)]"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              Report bugs
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-poppins leading-tight mb-6">
            Report bugs
          </h1>
          <p className="text-lg text-gray-400 font-inter mb-10 leading-relaxed">
            Did you find a bug? Contact us about it!
          </p>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="mx-auto max-w-4xl">
          <BugReportForm />
        </div>
      </section>

      <p className="text-center text-sm text-gray-500 mb-12">
        For critical and security issues, please contact us via an email at{" "}
        <a
          href="mailto:admin@modulbit.com"
          className="text-accent hover:underline"
        >
          admin@modulbit.com
        </a>
        .
      </p>

      <Footer />
    </div>
  );
}

