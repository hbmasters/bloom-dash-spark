import ProductionHeader from "@/components/ProductionHeader";
import ActiveProduction from "@/components/ActiveProduction";
import CompletedProduction from "@/components/CompletedProduction";
import LinesOverview from "@/components/LinesOverview";

const Index = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-background flex flex-col">
      <ProductionHeader />
      <main className="flex-1 min-h-0 p-4 flex gap-4">
        {/* Left: Active Production (dominant ~60%) */}
        <div className="flex-[3] min-w-0">
          <ActiveProduction />
        </div>

        {/* Right: Completed + Lines Ranking (~40%) */}
        <div className="flex-[2] min-w-0 flex flex-col gap-4">
          <div className="flex-1 min-h-0">
            <CompletedProduction />
          </div>
          <div className="flex-1 min-h-0">
            <LinesOverview />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
