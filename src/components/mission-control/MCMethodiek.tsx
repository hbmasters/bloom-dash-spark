import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  Brain, TrendingUp, BarChart3, Truck, Flower2, Users, Database, Zap,
  Clock, Hash, Link2, CheckCircle2, PauseCircle, Filter, ArrowRight,
  FlaskConical, GitBranch, Target, Gauge
} from "lucide-react";
import PageAgentBadges from "./PageAgentBadges";

type MethodStatus = "active" | "inactive";
type MethodCategory = "productie" | "financieel" | "logistiek" | "kwaliteit" | "hr" | "inkoop";

interface Connection {
  name: string;
  status: "connected" | "degraded";
}

interface AnalysisMethod {
  id: string;
  name: string;
  description: string;
  category: MethodCategory;
  status: MethodStatus;
  enabled: boolean;
  runtimeMinutes: number;
  totalRuns: number;
  lastRun?: string;
  connections: Connection[];
  icon: typeof Brain;
  inputs: string[];
  outputs: string[];
  accuracy?: number;
  version: string;
}

const categoryConfig: Record<MethodCategory, { label: string; color: string; bg: string; border: string }> = {
  productie:  { label: "Productie",  color: "text-primary",           bg: "bg-primary/10",      border: "border-primary/20" },
  financieel: { label: "Financieel", color: "text-amber-400",         bg: "bg-amber-400/10",    border: "border-amber-400/20" },
  logistiek:  { label: "Logistiek",  color: "text-blue-400",          bg: "bg-blue-400/10",     border: "border-blue-400/20" },
  kwaliteit:  { label: "Kwaliteit",  color: "text-emerald-400",       bg: "bg-emerald-400/10",  border: "border-emerald-400/20" },
  hr:         { label: "HR",         color: "text-violet-400",        bg: "bg-violet-400/10",   border: "border-violet-400/20" },
  inkoop:     { label: "Inkoop",     color: "text-rose-400",          bg: "bg-rose-400/10",     border: "border-rose-400/20" },
};

const initialMethods: AnalysisMethod[] = [
  {
    id: "prod-efficiency", name: "Productie Efficiency Analyse",
    description: "Berekent realtime efficiency scores per lijn op basis van output, bezetting en geplande capaciteit.",
    category: "productie", status: "active", enabled: true, runtimeMinutes: 3, totalRuns: 4280, lastRun: "2 min geleden",
    connections: [{ name: "HBM Control", status: "connected" }, { name: "HBM Data", status: "connected" }],
    icon: TrendingUp, inputs: ["Lijnoutput", "Bezetting", "Planning"], outputs: ["Efficiency %", "Afwijkingsrapport"],
    accuracy: 0.96, version: "v3.2",
  },
  {
    id: "cost-per-stem", name: "Arbeid Per Steel Methodiek",
    description: "Analyseert arbeidskosten per steel inclusief overhead, pauzes en indirecte uren per productlijn.",
    category: "financieel", status: "active", enabled: true, runtimeMinutes: 8, totalRuns: 1560, lastRun: "15 min geleden",
    connections: [{ name: "HBM Data", status: "connected" }, { name: "HBM CRM", status: "connected" }],
    icon: BarChart3, inputs: ["Uurregistratie", "Lijnoutput", "Overhead"], outputs: ["Kosten/steel", "Benchmark"],
    accuracy: 0.92, version: "v2.1",
  },
  {
    id: "waste-analysis", name: "Derving & Uitboeking Analyse",
    description: "Monitort dervingspercentages per batch, identificeert patronen en voorspelt uitval op basis van historische data.",
    category: "kwaliteit", status: "active", enabled: true, runtimeMinutes: 12, totalRuns: 892, lastRun: "30 min geleden",
    connections: [{ name: "HBM Control", status: "connected" }, { name: "HBM Florist", status: "connected" }, { name: "HBM Data", status: "connected" }],
    icon: Brain, inputs: ["Batchdata", "Kwaliteitsscores", "Historisch"], outputs: ["Derving %", "Voorspelling", "Patroonrapport"],
    accuracy: 0.89, version: "v4.0",
  },
  {
    id: "route-optimization", name: "Transportroute Optimalisatie",
    description: "Optimaliseert transportroutes en laadschema's op basis van bestemming, volume en levertijden.",
    category: "logistiek", status: "active", enabled: true, runtimeMinutes: 18, totalRuns: 312, lastRun: "1 uur geleden",
    connections: [{ name: "HBM Logistics", status: "connected" }, { name: "HBM CRM", status: "connected" }],
    icon: Truck, inputs: ["Orderlijst", "Voertuigdata", "Verkeer"], outputs: ["Routeplan", "Laadschema"],
    accuracy: 0.94, version: "v1.8",
  },
  {
    id: "quality-index", name: "Kwaliteitsindex Scoring",
    description: "Berekent samengestelde kwaliteitsscores per leverancier, seizoen en bloemensoort.",
    category: "kwaliteit", status: "active", enabled: true, runtimeMinutes: 5, totalRuns: 2104, lastRun: "10 min geleden",
    connections: [{ name: "HBM Florist", status: "connected" }, { name: "HBM Data", status: "connected" }],
    icon: Flower2, inputs: ["Inspectiedata", "Leveranciersdata"], outputs: ["Kwaliteitsindex", "Ranking"],
    accuracy: 0.97, version: "v2.5",
  },
  {
    id: "revenue-split", name: "Omzetverdeling & Groei",
    description: "Analyseert omzetverdeling per klantsegment, product en regio met trendprojecties.",
    category: "financieel", status: "inactive", enabled: false, runtimeMinutes: 22, totalRuns: 480, lastRun: "3 dagen geleden",
    connections: [{ name: "HBM CRM", status: "connected" }, { name: "HBM Data", status: "connected" }],
    icon: BarChart3, inputs: ["Omzetdata", "Klantdata", "Regio's"], outputs: ["Verdeling", "Trendlijn"],
    accuracy: 0.91, version: "v1.4",
  },
  {
    id: "workforce-planning", name: "Personeelsplanning Analyse",
    description: "Voorspelt personeelsbehoefte per lijn op basis van orderplanning, seizoenspatronen en historische bezetting.",
    category: "hr", status: "active", enabled: true, runtimeMinutes: 10, totalRuns: 624, lastRun: "45 min geleden",
    connections: [{ name: "HBM Control", status: "connected" }, { name: "HBM Data", status: "connected" }, { name: "HBM CRM", status: "degraded" }],
    icon: Users, inputs: ["Orderplanning", "Seizoensdata", "Historie"], outputs: ["Bezettingsadvies", "Prognose"],
    accuracy: 0.85, version: "v2.0",
  },
  {
    id: "purchase-ratio", name: "Inkoopverhouding Methodiek",
    description: "Vergelijkt inkoopvolumes met verkoopprognoses en identificeert over- en onderinkoop per productgroep.",
    category: "inkoop", status: "active", enabled: true, runtimeMinutes: 14, totalRuns: 376, lastRun: "2 uur geleden",
    connections: [{ name: "HBM CRM", status: "connected" }, { name: "HBM Florist", status: "connected" }, { name: "HBM Data", status: "connected" }],
    icon: Database, inputs: ["Inkooporders", "Verkoopprognose"], outputs: ["Ratio-rapport", "Alerts"],
    accuracy: 0.88, version: "v1.6",
  },
  {
    id: "bed-occupancy", name: "Bedden & Bezetting Analyse",
    description: "Monitort bezettingsgraden van productiebedden en optimaliseert toewijzing op basis van orderprioriteit.",
    category: "productie", status: "inactive", enabled: false, runtimeMinutes: 6, totalRuns: 1840, lastRun: "1 week geleden",
    connections: [{ name: "HBM Control", status: "connected" }],
    icon: Zap, inputs: ["Bedstatus", "Orderprioriteit"], outputs: ["Bezettingsgraad", "Toewijzingsplan"],
    accuracy: 0.93, version: "v3.1",
  },
  {
    id: "kenya-yield", name: "Kenya Opbrengst Analyse",
    description: "Analyseert opbrengst per hectare vanuit Kenya-farms en correleert met weersdata en seizoenspatronen.",
    category: "productie", status: "active", enabled: true, runtimeMinutes: 25, totalRuns: 156, lastRun: "6 uur geleden",
    connections: [{ name: "HBM Data", status: "connected" }, { name: "HBM Logistics", status: "degraded" }],
    icon: TrendingUp, inputs: ["Farmdata", "Weerdata", "Seizoen"], outputs: ["Opbrengst/ha", "Correlatierapport"],
    accuracy: 0.82, version: "v1.2",
  },
];

const MCMethodiek = () => {
  const [methods, setMethods] = useState(initialMethods);
  const [filterCategory, setFilterCategory] = useState<MethodCategory | null>(null);
  const [filterStatus, setFilterStatus] = useState<MethodStatus | null>(null);

  const toggleEnabled = (id: string) => {
    setMethods(prev => prev.map(m => {
      if (m.id !== id) return m;
      const enabled = !m.enabled;
      return { ...m, enabled, status: enabled ? "active" : "inactive" };
    }));
  };

  const filtered = useMemo(() => {
    return methods.filter(m => {
      if (filterCategory && m.category !== filterCategory) return false;
      if (filterStatus && m.status !== filterStatus) return false;
      return true;
    });
  }, [methods, filterCategory, filterStatus]);

  const activeCount = methods.filter(m => m.enabled).length;
  const totalRuntime = methods.filter(m => m.enabled).reduce((s, m) => s + m.runtimeMinutes, 0);
  const avgAccuracy = Math.round(
    (methods.filter(m => m.enabled && m.accuracy).reduce((s, m) => s + (m.accuracy || 0), 0) / activeCount) * 100
  );

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 px-4 md:px-6 py-4 border-b border-border bg-card/40 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Analyse Methodieken</h2>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-mono">
            <span className="text-emerald-400">{activeCount} actief</span>
            <span className="text-primary">{totalRuntime} min Ø runtime</span>
            <span className="text-muted-foreground">{avgAccuracy}% nauwkeurigheid</span>
          </div>
        </div>
        <PageAgentBadges pageId="methodiek" className="mb-3" />

        {/* Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3 h-3 text-muted-foreground/50" />
            <button onClick={() => setFilterCategory(null)}
              className={cn("px-2.5 py-1 rounded-full text-[10px] font-medium border transition-colors",
                !filterCategory ? "bg-primary/15 border-primary/30 text-primary" : "border-border text-muted-foreground/40 hover:border-muted-foreground/30"
              )}>Alles</button>
            {(Object.entries(categoryConfig) as [MethodCategory, typeof categoryConfig["productie"]][]).map(([key, cfg]) => (
              <button key={key} onClick={() => setFilterCategory(filterCategory === key ? null : key)}
                className={cn("px-2.5 py-1 rounded-full text-[10px] font-medium border transition-colors",
                  filterCategory === key ? `${cfg.bg} ${cfg.border} ${cfg.color}` : "border-border text-muted-foreground/40 hover:border-muted-foreground/30"
                )}>{cfg.label}</button>
            ))}
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-1.5">
            {(["active", "inactive"] as MethodStatus[]).map(s => (
              <button key={s} onClick={() => setFilterStatus(filterStatus === s ? null : s)}
                className={cn("px-2.5 py-1 rounded-full text-[10px] font-medium border transition-colors",
                  filterStatus === s
                    ? s === "active" ? "bg-emerald-400/10 border-emerald-400/20 text-emerald-400" : "bg-muted/30 border-border text-muted-foreground"
                    : "border-border text-muted-foreground/40 hover:border-muted-foreground/30"
                )}>{s === "active" ? "Actief" : "Inactief"}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Methods list */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3">
        {filtered.map(method => {
          const catCfg = categoryConfig[method.category];
          const Icon = method.icon;

          return (
            <div key={method.id} className={cn(
              "rounded-xl border bg-card/60 backdrop-blur-sm transition-all",
              catCfg.border, !method.enabled && "opacity-40"
            )}>
              {/* Top: Identity + toggle */}
              <div className="p-4 pb-3">
                <div className="flex items-start gap-3">
                  <div className={cn("mt-0.5 p-2.5 rounded-xl border flex-shrink-0", catCfg.bg, catCfg.border)}>
                    <Icon className={cn("w-5 h-5", catCfg.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-foreground">{method.name}</h3>
                      <span className={cn("text-[9px] font-medium px-1.5 py-0.5 rounded-full border", catCfg.color, catCfg.bg, catCfg.border)}>{catCfg.label}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full border border-border text-muted-foreground/50">
                        <GitBranch className="w-2.5 h-2.5 inline mr-0.5" />{method.version}
                      </span>
                      {method.enabled ? (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-2.5 h-2.5" /> Actief
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full border border-border bg-muted/20 text-muted-foreground flex items-center gap-1">
                          <PauseCircle className="w-2.5 h-2.5" /> Inactief
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-1">{method.description}</p>
                  </div>
                  <button onClick={() => toggleEnabled(method.id)}
                    className={cn("relative w-10 h-5 rounded-full transition-colors flex-shrink-0 mt-1",
                      method.enabled ? "bg-emerald-400/80" : "bg-muted"
                    )}>
                    <div className={cn("absolute top-0.5 w-4 h-4 rounded-full bg-foreground shadow-md transition-transform",
                      method.enabled ? "translate-x-5" : "translate-x-0.5"
                    )} />
                  </button>
                </div>
              </div>

              {/* Pipeline flow: Input → Process → Output — unique to methodiek */}
              <div className="mx-4 mb-3 px-3 py-2.5 rounded-lg bg-muted/10 border border-border/40">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Inputs */}
                  <div className="flex items-center gap-1">
                    {method.inputs.map(inp => (
                      <span key={inp} className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-blue-400/10 text-blue-400 border border-blue-400/20">{inp}</span>
                    ))}
                  </div>
                  <ArrowRight className="w-3 h-3 text-muted-foreground/30 shrink-0" />
                  {/* Process */}
                  <div className={cn("text-[8px] font-mono px-2 py-0.5 rounded border", catCfg.bg, catCfg.border, catCfg.color)}>
                    {method.runtimeMinutes} min
                  </div>
                  <ArrowRight className="w-3 h-3 text-muted-foreground/30 shrink-0" />
                  {/* Outputs */}
                  <div className="flex items-center gap-1">
                    {method.outputs.map(out => (
                      <span key={out} className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">{out}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom: Metrics + connections */}
              <div className="px-4 py-3 border-t border-border/40 bg-muted/5">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-4">
                    {/* Accuracy */}
                    {method.accuracy && (
                      <div className="flex items-center gap-1.5">
                        <Target className="w-3 h-3 text-muted-foreground/40" />
                        <div className="w-12 h-1.5 rounded-full bg-muted/30 overflow-hidden">
                          <div className={cn("h-full rounded-full",
                            method.accuracy >= 0.95 ? "bg-emerald-400" : method.accuracy >= 0.85 ? "bg-primary" : "bg-amber-400"
                          )} style={{ width: `${method.accuracy * 100}%` }} />
                        </div>
                        <span className="text-[9px] font-mono text-muted-foreground">{Math.round(method.accuracy * 100)}%</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Hash className="w-3 h-3 text-muted-foreground/40" />
                      <span className="text-[9px] font-mono text-muted-foreground">{method.totalRuns.toLocaleString("nl-NL")}x</span>
                    </div>
                    {method.lastRun && (
                      <span className="text-[9px] font-mono text-muted-foreground/40">{method.lastRun}</span>
                    )}
                  </div>

                  {/* Connections */}
                  <div className="flex items-center gap-1">
                    <Link2 className="w-3 h-3 text-muted-foreground/30" />
                    {method.connections.map(c => (
                      <span key={c.name} className={cn(
                        "text-[8px] font-mono px-1.5 py-0.5 rounded-full border flex items-center gap-1",
                        c.status === "connected" ? "border-emerald-400/20 text-emerald-400/80" : "border-amber-400/20 text-amber-400/80"
                      )}>
                        <div className={cn("w-1.5 h-1.5 rounded-full", c.status === "connected" ? "bg-emerald-400" : "bg-amber-400")} />
                        {c.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="flex-1 flex items-center justify-center py-16">
            <p className="text-sm text-muted-foreground">Geen methodieken gevonden voor dit filter</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 px-4 md:px-6 py-3 border-t border-border bg-card/40">
        <p className="text-[10px] font-mono text-muted-foreground/50 text-center">
          {methods.reduce((s, m) => s + m.totalRuns, 0).toLocaleString("nl-NL")} totale analyses · {activeCount}/{methods.length} actief · Ø {avgAccuracy}% nauwkeurigheid
        </p>
      </div>
    </div>
  );
};

export default MCMethodiek;
