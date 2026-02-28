import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  Bot, Zap, Brain, Truck, Flower2, Users, BarChart3, Database, Mail, Shield,
  Filter, Activity, MessageSquare, Cpu, Clock, ArrowRight, Wifi, WifiOff
} from "lucide-react";

export type AgentStatus = "online" | "standby" | "offline";

export interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  status: AgentStatus;
  model: string;
  category: AgentCategory;
  linkedPages: string[];
  tasksCompleted: number;
  avgResponseMs: number;
  lastActive?: string;
  icon: typeof Bot;
  currentTask?: string;
  cpuLoad?: number;
  memoryMb?: number;
}

export type AgentCategory = "productie" | "data" | "crm" | "logistiek" | "kwaliteit" | "systeem";

export const agentCategoryConfig: Record<AgentCategory, { label: string; color: string; bg: string; border: string }> = {
  productie: { label: "Productie",  color: "text-primary",       bg: "bg-primary/10",     border: "border-primary/20" },
  data:      { label: "Data",       color: "text-blue-400",      bg: "bg-blue-400/10",    border: "border-blue-400/20" },
  crm:       { label: "CRM",        color: "text-amber-400",     bg: "bg-amber-400/10",   border: "border-amber-400/20" },
  logistiek: { label: "Logistiek",  color: "text-emerald-400",   bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
  kwaliteit: { label: "Kwaliteit",  color: "text-violet-400",    bg: "bg-violet-400/10",  border: "border-violet-400/20" },
  systeem:   { label: "Systeem",    color: "text-rose-400",      bg: "bg-rose-400/10",    border: "border-rose-400/20" },
};

export const agents: Agent[] = [
  {
    id: "agent-master", name: "HBMaster Core", role: "Hoofdagent & Orchestrator",
    description: "Centrale AI die alle sub-agents aanstuurt, prioriteiten bepaalt en de chat-interface beheert.",
    status: "online", model: "GPT-5", category: "systeem", linkedPages: ["chat", "notifications"],
    tasksCompleted: 12480, avgResponseMs: 180, lastActive: "Nu actief", icon: Brain,
    currentTask: "Coördinatie van 7 actieve sub-agents", cpuLoad: 34, memoryMb: 512,
  },
  {
    id: "agent-production", name: "ProductieAgent", role: "Lijnmonitoring & Optimalisatie",
    description: "Bewaakt realtime productiedata, signaleert afwijkingen en optimaliseert lijnbezetting.",
    status: "online", model: "Gemini 2.5 Flash", category: "productie", linkedPages: ["kpis", "methodiek", "cronjobs"],
    tasksCompleted: 8340, avgResponseMs: 95, lastActive: "12 sec geleden", icon: Activity,
    currentTask: "Lijn 3 efficiency analyse", cpuLoad: 62, memoryMb: 256,
  },
  {
    id: "agent-data", name: "DataAgent", role: "Analyse & Rapportage",
    description: "Voert data-analyses uit, genereert rapporten en berekent KPI's op basis van warehouse data.",
    status: "online", model: "Gemini 2.5 Pro", category: "data", linkedPages: ["kpis", "methodiek", "cronjobs"],
    tasksCompleted: 5620, avgResponseMs: 420, lastActive: "2 min geleden", icon: BarChart3,
    currentTask: "Dagrapport genereren", cpuLoad: 78, memoryMb: 1024,
  },
  {
    id: "agent-crm", name: "CRM Agent", role: "Klantbeheer & Orders",
    description: "Beheert klantrelaties, verwerkt orders en synchroniseert CRM-data met productieplanning.",
    status: "online", model: "GPT-5 Mini", category: "crm", linkedPages: ["kanban", "notifications"],
    tasksCompleted: 3890, avgResponseMs: 210, lastActive: "45 sec geleden", icon: Users,
    currentTask: "Orderverwerking batch #4871", cpuLoad: 41, memoryMb: 384,
  },
  {
    id: "agent-logistics", name: "LogistiekAgent", role: "Transport & Supply Chain",
    description: "Optimaliseert transportroutes, bewaakt levertijden en coördineert supply chain operaties.",
    status: "standby", model: "Gemini 2.5 Flash", category: "logistiek", linkedPages: ["cronjobs", "methodiek"],
    tasksCompleted: 1560, avgResponseMs: 340, lastActive: "15 min geleden", icon: Truck,
    cpuLoad: 2, memoryMb: 128,
  },
  {
    id: "agent-florist", name: "FloristAgent", role: "Receptuur & Samenstelling",
    description: "Beheert bloemenrecepturen, optimaliseert samenstellingen en bewaakt kwaliteitsstandaarden.",
    status: "online", model: "GPT-5 Mini", category: "kwaliteit", linkedPages: ["methodiek", "kpis"],
    tasksCompleted: 2240, avgResponseMs: 155, lastActive: "5 min geleden", icon: Flower2,
    currentTask: "Receptuur optimalisatie Charme XL", cpuLoad: 28, memoryMb: 192,
  },
  {
    id: "agent-quality", name: "KwaliteitAgent", role: "Kwaliteitscontrole & Derving",
    description: "Monitort dervingspercentages, identificeert kwaliteitsproblemen en voorspelt uitval.",
    status: "online", model: "Gemini 2.5 Pro", category: "kwaliteit", linkedPages: ["kpis", "methodiek", "notifications"],
    tasksCompleted: 4120, avgResponseMs: 280, lastActive: "30 sec geleden", icon: Shield,
    currentTask: "Dervingsanalyse batch #2204", cpuLoad: 55, memoryMb: 768,
  },
  {
    id: "agent-planner", name: "PlanAgent", role: "Planning & Scheduling",
    description: "Genereert weekplanningen, optimaliseert bezetting en beheert de persoonlijke planner.",
    status: "online", model: "GPT-5 Mini", category: "productie", linkedPages: ["planner", "kanban"],
    tasksCompleted: 960, avgResponseMs: 190, lastActive: "3 min geleden", icon: MessageSquare,
    currentTask: "Weekplanning week 10 optimalisatie", cpuLoad: 19, memoryMb: 256,
  },
  {
    id: "agent-kenya", name: "Kenya Agent", role: "Farm Data & Opbrengst",
    description: "Synchroniseert en analyseert opbrengstdata vanuit Keniaanse farms.",
    status: "offline", model: "Gemini 2.5 Flash Lite", category: "data", linkedPages: ["methodiek", "cronjobs"],
    tasksCompleted: 480, avgResponseMs: 520, lastActive: "6 uur geleden", icon: Database,
    cpuLoad: 0, memoryMb: 0,
  },
  {
    id: "agent-notify", name: "NotificatieAgent", role: "Alerts & Communicatie",
    description: "Verzendt slimme notificaties, filtert ruis en escaleert kritieke meldingen naar de juiste personen.",
    status: "online", model: "GPT-5 Nano", category: "systeem", linkedPages: ["notifications"],
    tasksCompleted: 15200, avgResponseMs: 45, lastActive: "Nu actief", icon: Mail,
    currentTask: "Prioritering van 3 nieuwe alerts", cpuLoad: 8, memoryMb: 64,
  },
];

const statusConfig: Record<AgentStatus, { label: string; dot: string; text: string; bg: string; border: string }> = {
  online:  { label: "Online",  dot: "bg-emerald-400", text: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
  standby: { label: "Standby", dot: "bg-amber-400",   text: "text-amber-400",   bg: "bg-amber-400/10",   border: "border-amber-400/20" },
  offline: { label: "Offline", dot: "bg-muted-foreground", text: "text-muted-foreground", bg: "bg-muted/20", border: "border-border" },
};

const pageLabels: Record<string, string> = {
  chat: "Chat", kanban: "Kanban", kpis: "KPI's", notifications: "Notificaties",
  planner: "Planner", cronjobs: "Cron Jobs", methodiek: "Methodiek", history: "Historie",
};

/* ── Mini resource bar ── */
const ResourceBar = ({ label, value, max, unit, color }: { label: string; value: number; max: number; unit: string; color: string }) => (
  <div className="flex items-center gap-2">
    <span className="text-[9px] font-mono text-muted-foreground/50 w-8">{label}</span>
    <div className="flex-1 h-1 rounded-full bg-muted/30 overflow-hidden max-w-[60px]">
      <div className={cn("h-full rounded-full transition-all", color)} style={{ width: `${Math.min((value / max) * 100, 100)}%` }} />
    </div>
    <span className="text-[9px] font-mono text-muted-foreground/60">{value}{unit}</span>
  </div>
);

const MCAgents = () => {
  const [filterCategory, setFilterCategory] = useState<AgentCategory | null>(null);
  const [filterStatus, setFilterStatus] = useState<AgentStatus | null>(null);

  const filtered = useMemo(() => {
    return agents.filter(a => {
      if (filterCategory && a.category !== filterCategory) return false;
      if (filterStatus && a.status !== filterStatus) return false;
      return true;
    });
  }, [filterCategory, filterStatus]);

  const onlineCount = agents.filter(a => a.status === "online").length;
  const totalCpu = Math.round(agents.reduce((s, a) => s + (a.cpuLoad || 0), 0) / agents.filter(a => a.status === "online").length);

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 px-4 md:px-6 py-4 border-b border-border bg-card/40 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">OpenClaw CRM — Agents</h2>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-mono">
            <span className="text-emerald-400 flex items-center gap-1"><Wifi className="w-3 h-3" />{onlineCount} online</span>
            <span className="text-muted-foreground/60">Ø {totalCpu}% CPU</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3 h-3 text-muted-foreground/50" />
            <button onClick={() => setFilterCategory(null)} className={cn("px-2.5 py-1 rounded-full text-[10px] font-medium border transition-colors", !filterCategory ? "bg-primary/15 border-primary/30 text-primary" : "border-border text-muted-foreground/40 hover:border-muted-foreground/30")}>Alles</button>
            {(Object.entries(agentCategoryConfig) as [AgentCategory, typeof agentCategoryConfig["productie"]][]).map(([key, cfg]) => (
              <button key={key} onClick={() => setFilterCategory(filterCategory === key ? null : key)}
                className={cn("px-2.5 py-1 rounded-full text-[10px] font-medium border transition-colors",
                  filterCategory === key ? `${cfg.bg} ${cfg.border} ${cfg.color}` : "border-border text-muted-foreground/40 hover:border-muted-foreground/30"
                )}>{cfg.label}</button>
            ))}
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-1.5">
            {(["online", "standby", "offline"] as AgentStatus[]).map(s => (
              <button key={s} onClick={() => setFilterStatus(filterStatus === s ? null : s)}
                className={cn("px-2.5 py-1 rounded-full text-[10px] font-medium border transition-colors",
                  filterStatus === s ? `${statusConfig[s].bg} ${statusConfig[s].border} ${statusConfig[s].text}` : "border-border text-muted-foreground/40 hover:border-muted-foreground/30"
                )}>{statusConfig[s].label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Agent grid */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {filtered.map(agent => {
            const catCfg = agentCategoryConfig[agent.category];
            const stCfg = statusConfig[agent.status];
            const Icon = agent.icon;

            return (
              <div key={agent.id} className={cn(
                "rounded-xl border bg-card/60 backdrop-blur-sm transition-all hover:bg-card/80",
                stCfg.border,
                agent.status === "offline" && "opacity-40"
              )}>
                {/* Top: Identity */}
                <div className="p-4 pb-3">
                  <div className="flex items-start gap-3">
                    <div className={cn("relative p-3 rounded-xl border", catCfg.bg, catCfg.border)}>
                      <Icon className={cn("w-6 h-6", catCfg.color)} />
                      <div className={cn("absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card", stCfg.dot, agent.status === "online" && "animate-pulse")} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-bold text-foreground">{agent.name}</h3>
                        <span className={cn("text-[9px] font-mono px-1.5 py-0.5 rounded-full border", stCfg.text, stCfg.bg, stCfg.border)}>{stCfg.label}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{agent.role}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Cpu className="w-3 h-3 text-muted-foreground/40" />
                        <span className="text-[9px] font-mono text-muted-foreground">{agent.model}</span>
                        <span className="text-[9px] font-mono text-muted-foreground/40">·</span>
                        <span className="text-[9px] font-mono text-muted-foreground">{agent.avgResponseMs}ms</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Current task — unique to agents */}
                {agent.currentTask && agent.status === "online" && (
                  <div className="mx-4 mb-3 px-3 py-2 rounded-lg bg-primary/5 border border-primary/10">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shrink-0" />
                      <span className="text-[10px] font-mono text-foreground/80 truncate">{agent.currentTask}</span>
                    </div>
                  </div>
                )}

                {agent.status === "standby" && (
                  <div className="mx-4 mb-3 px-3 py-2 rounded-lg bg-muted/20 border border-border">
                    <span className="text-[10px] font-mono text-muted-foreground/60 italic">Wacht op instructies…</span>
                  </div>
                )}

                {agent.status === "offline" && (
                  <div className="mx-4 mb-3 px-3 py-2 rounded-lg bg-muted/10 border border-border">
                    <div className="flex items-center gap-1.5">
                      <WifiOff className="w-3 h-3 text-muted-foreground/30" />
                      <span className="text-[10px] font-mono text-muted-foreground/40">Offline sinds {agent.lastActive}</span>
                    </div>
                  </div>
                )}

                {/* Bottom: Resources + stats */}
                <div className="px-4 py-3 border-t border-border/40 bg-muted/5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <ResourceBar label="CPU" value={agent.cpuLoad || 0} max={100} unit="%" color={
                        (agent.cpuLoad || 0) > 70 ? "bg-amber-400" : "bg-primary"
                      } />
                      <ResourceBar label="MEM" value={agent.memoryMb || 0} max={1024} unit="MB" color="bg-blue-400" />
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-mono text-muted-foreground">{agent.tasksCompleted.toLocaleString("nl-NL")} taken</p>
                      <div className="flex items-center gap-1 mt-1 justify-end">
                        {agent.linkedPages.slice(0, 3).map(p => (
                          <span key={p} className="text-[8px] font-mono px-1 py-0.5 rounded border border-border text-muted-foreground/50">
                            {pageLabels[p] || p}
                          </span>
                        ))}
                        {agent.linkedPages.length > 3 && (
                          <span className="text-[8px] font-mono text-muted-foreground/30">+{agent.linkedPages.length - 3}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="flex items-center justify-center py-16">
            <p className="text-sm text-muted-foreground">Geen agents gevonden voor dit filter</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 px-4 md:px-6 py-3 border-t border-border bg-card/40">
        <p className="text-[10px] font-mono text-muted-foreground/50 text-center">
          OpenClaw CRM · {agents.reduce((s, a) => s + a.tasksCompleted, 0).toLocaleString("nl-NL")} taken verwerkt · {onlineCount}/{agents.length} agents online
        </p>
      </div>
    </div>
  );
};

export default MCAgents;
