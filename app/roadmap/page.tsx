import Footer from "@/components/footer";
import RoadmapFlow from "@/components/roadmap-flow";

export default function RoadmapPage() {
  return (
    <div className="bg-[#181d24] text-white selection:bg-accent/30 selection:text-white overflow-hidden bg-mesh min-h-screen">
      {/* Hero */}
      <section className="relative pt-24 pb-10 px-6">
        <div className="mx-auto max-w-7xl relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold font-poppins leading-[1.1] mb-4 tracking-tight">
            Roadmap
          </h1>
          <p className="text-xl text-gray-400 font-inter max-w-3xl mx-auto leading-relaxed">
            What we’re building and how it connects.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <RoadmapFlow />
        </div>
      </section>

      <Footer />
    </div>
  );
}