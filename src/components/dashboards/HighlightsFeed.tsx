import { AlertTriangle, CheckCircle2, Info, AlertOctagon } from "lucide-react";
import type { ProjectHighlight } from "@/data/dashboardMockData";

const severityConfig = {
  info: { icon: Info, bg: "bg-primary/8", border: "border-primary/15", text: "text-primary", dot: "bg-primary" },
  success: { icon: CheckCircle2, bg: "bg-accent/8", border: "border-accent/15", text: "text-accent", dot: "bg-accent" },
  warning: { icon: AlertTriangle, bg: "bg-bloom-warm/8", border: "border-bloom-warm/15", text: "text-bloom-warm", dot: "bg-bloom-warm" },
  critical: { icon: AlertOctagon, bg: "bg-red-500/8", border: "border-red-500/15", text: "text-red-500", dot: "bg-red-500" },
};

const HighlightsFeed = ({ highlights }: { highlights: ProjectHighlight[] }) => (
  <div className="space-y-3">
    <h3 className="text-sm font-semibold text-foreground">Hoogtepunten & Acties</h3>
    {highlights.map((h) => {
      const cfg = severityConfig[h.severity];
      const Icon = cfg.icon;
      return (
        <div
          key={h.id}
          className={`rounded-lg border ${cfg.border} ${cfg.bg} p-4 transition-all hover:shadow-sm`}
        >
          <div className="flex items-start gap-3">
            <div className={`mt-0.5 shrink-0 ${cfg.text}`}>
              <Icon className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-medium text-foreground leading-tight">{h.title}</h4>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap shrink-0">{h.timestamp}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{h.description}</p>
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

export default HighlightsFeed;
