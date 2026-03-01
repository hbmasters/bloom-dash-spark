import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, BarChart3, Factory, Briefcase, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import DashboardTab from "@/components/dashboards/DashboardTab";
import {
  inkoopKPIs, inkoopHighlights,
  verkoopKPIs, verkoopHighlights,
  productieKPIs, productieHighlights,
  directieKPIs, directieHighlights,
} from "@/data/dashboardMockData";

type TabId = "inkoop" | "verkoop" | "productie" | "directie";

const tabs: { id: TabId; label: string; icon: typeof Factory; title: string; subtitle: string }[] = [
  { id: "inkoop", label: "Inkoop", icon: ShoppingCart, title: "Inkoop Dashboard", subtitle: "Inkoopvolume, leveranciers & steelprijzen" },
  { id: "verkoop", label: "Verkoop", icon: BarChart3, title: "Verkoop & Transport", subtitle: "Omzet, ordervulling & logistiek" },
  { id: "productie", label: "Productie", icon: Factory, title: "Productie Dashboard", subtitle: "Efficiency, output & kwaliteit" },
  { id: "directie", label: "Directie", icon: Briefcase, title: "Directie Dashboard", subtitle: "Strategisch overzicht & kerncijfers" },
];

const tabData: Record<TabId, { kpis: typeof inkoopKPIs; highlights: typeof inkoopHighlights }> = {
  inkoop: { kpis: inkoopKPIs, highlights: inkoopHighlights },
  verkoop: { kpis: verkoopKPIs, highlights: verkoopHighlights },
  productie: { kpis: productieKPIs, highlights: productieHighlights },
  directie: { kpis: directieKPIs, highlights: directieHighlights },
};

const Dashboards = () => {
  const [activeTab, setActiveTab] = useState<TabId>("directie");
  const navigate = useNavigate();
  const current = tabs.find((t) => t.id === activeTab)!;
  const data = tabData[activeTab];

  return (
    <div className="h-screen w-screen flex flex-col bg-background overflow-hidden">
      {/* Top bar */}
      <header className="shrink-0 border-b border-border bg-card/80 backdrop-blur-sm px-4 md:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-sm font-bold text-foreground tracking-tight">HBM Project Dashboards</h1>
            <p className="text-[10px] text-muted-foreground">Bloom & HBMaster</p>
          </div>
        </div>
        <div className="text-[10px] font-mono text-muted-foreground">
          Laatst bijgewerkt: vandaag 14:30
        </div>
      </header>

      {/* Tab navigation */}
      <nav className="shrink-0 border-b border-border bg-card/40 px-4 md:px-6">
        <div className="flex gap-1 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                  active
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                )}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Dashboard content */}
      <DashboardTab
        title={current.title}
        subtitle={current.subtitle}
        kpis={data.kpis}
        highlights={data.highlights}
        accentIcon={<current.icon className="w-5 h-5" />}
      />
    </div>
  );
};

export default Dashboards;
