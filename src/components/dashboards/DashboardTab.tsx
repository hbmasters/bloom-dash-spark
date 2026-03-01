import type { KPICard, ProjectHighlight } from "@/data/dashboardMockData";
import KPICardGrid from "./KPICardGrid";
import HighlightsFeed from "./HighlightsFeed";

interface DashboardTabProps {
  title: string;
  subtitle: string;
  kpis: KPICard[];
  highlights: ProjectHighlight[];
  accentIcon: React.ReactNode;
}

const DashboardTab = ({ title, subtitle, kpis, highlights, accentIcon }: DashboardTabProps) => (
  <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6">
    {/* Header */}
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center text-primary">
        {accentIcon}
      </div>
      <div>
        <h2 className="text-lg font-bold text-foreground">{title}</h2>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>

    {/* KPIs */}
    <KPICardGrid kpis={kpis} />

    {/* Highlights */}
    <HighlightsFeed highlights={highlights} />
  </div>
);

export default DashboardTab;
