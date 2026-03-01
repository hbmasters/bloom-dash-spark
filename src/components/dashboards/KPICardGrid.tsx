import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { KPICard } from "@/data/dashboardMockData";
import DashboardSparkline from "./DashboardSparkline";

const trendConfig = {
  up: { icon: TrendingUp, className: "text-accent" },
  down: { icon: TrendingDown, className: "text-destructive" },
  neutral: { icon: Minus, className: "text-muted-foreground" },
};

const KPICardGrid = ({ kpis }: { kpis: KPICard[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
    {kpis.map((kpi) => {
      const { icon: TrendIcon, className: trendClass } = trendConfig[kpi.trend];
      return (
        <div
          key={kpi.id}
          className="group rounded-xl border border-border bg-card p-5 hover:shadow-md hover:border-primary/20 transition-all"
        >
          {/* Label + trend */}
          <div className="flex items-start justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground">{kpi.label}</span>
            <div className={`flex items-center gap-1 ${trendClass}`}>
              <TrendIcon className="w-3.5 h-3.5" />
              <span className="text-[11px] font-semibold">{kpi.change}</span>
            </div>
          </div>

          {/* Value + sparkline */}
          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-bold text-foreground leading-none">{kpi.value}</div>
              {kpi.target && (
                <div className="text-[10px] text-muted-foreground mt-1.5">
                  Target: {kpi.target}
                </div>
              )}
            </div>
            <DashboardSparkline data={kpi.sparkline} trend={kpi.trend} />
          </div>
        </div>
      );
    })}
  </div>
);

export default KPICardGrid;
