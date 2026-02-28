import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Bot, Zap, Brain, Truck, Flower2, Users, BarChart3, Database, Mail, Shield, Filter, CheckCircle2, PauseCircle, Activity, MessageSquare } from "lucide-react";

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
  },
  {
    id: "agent-production", name: "ProductieAgent", role: "Lijnmonitoring & Optimalisatie",
    description: "Bewaakt realtime productiedata, signaleert afwijkingen en optimaliseert lijnbezetting.",
    status: "online", model: "Gemini 2.5 Flash", category: "productie", linkedPages: ["kpis", "methodiek", "cronjobs"],
    tasksCompleted: 8340, avgResponseMs: 95, lastActive: "12 sec geleden", icon: Activity,
  },
  {
    id: "agent-data", name: "DataAgent", role: "Analyse & Rapportage",
    description: "Voert data-analyses uit, genereert rapporten en berekent KPI's op basis van warehouse data.",
    status: "online", model: "Gemini 2.5 Pro", category: "data", linkedPages: ["kpis", "methodiek", "cronjobs"],
    tasksCompleted: 5620, avgResponseMs: 420, lastActive: "2 min geleden", icon: BarChart3,
  },
  {
    id: "agent-crm", name: "CRM Agent", role: "Klantbeheer & Orders",
    description: "Beheert klantrelaties, verwerkt orders en synchroniseert CRM-data met productieplanning.",
    status: "online", model: "GPT-5 Mini", category: "crm", linkedPages: ["kanban", "notifications"],
    tasksCompleted: 3890, avgResponseMs: 210, lastActive: "45 sec geleden", icon: Users,
  },
  {
    id: "agent-logistics", name: "LogistiekAgent", role: "Transport & Supply Chain",
    description: "Optimaliseert transportroutes, bewaakt levertijden en coördineert supply chain operaties.",
    status: "standby", model: "Gemini 2.5 Flash", category: "logistiek", linkedPages: ["cronjobs", "methodiek"],
    tasksCompleted: 1560, avgResponseMs: 340, lastActive: "15 min geleden", icon: Truck,
  },
  {
    id: "agent-florist", name: "FloristAgent", role: "Receptuur & Samenstelling",
    description: "Beheert bloemenrecepturen, optimaliseert samenstellingen en bewaakt kwaliteitsstandaarden.",
    status: "online", model: "GPT-5 Mini", category: "kwaliteit", linkedPages: ["methodiek", "kpis"],
    tasksCompleted: 2240, avgResponseMs: 155, lastActive: "5 min geleden", icon: Flower2,
  },
  {
    id: "agent-quality", name: "KwaliteitAgent", role: "Kwaliteitscontrole & Derving",
    description: "Monitort dervingspercentages, identificeert kwaliteitsproblemen en voorspelt uitval.",
    status: "online", model: "Gemini 2.5 Pro", category: "kwaliteit", linkedPages: ["kpis", "methodiek", "notifications"],
    tasksCompleted: 4120, avgResponseMs: 280, lastActive: "30 sec geleden", icon: Shield,
  },
  {
    id: "agent-planner", name: "PlanAgent", role: "Planning & Scheduling",
    description: "Genereert weekplanningen, optimaliseert bezetting en beheert de persoonlijke planner.",
    status: "online", model: "GPT-5 Mini", category: "productie", linkedPages: ["planner", "kanban"],
    tasksCompleted: 960, avgResponseMs: 190, lastActive: "3 min geleden", icon: MessageSquare,
  },
  {
    id: "agent-kenya", name: "Kenya Agent", role: "Farm Data & Opbrengst",
    description: "Synchroniseert en analyseert opbrengstdata vanuit Keniaanse farms.",
    status: "offline", model: "Gemini 2.5 Flash Lite", category: "data", linkedPages: ["methodiek", "cronjobs"],
    tasksCompleted: 480, avgResponseMs: 520, lastActive: "6 uur geleden", icon: Database,
  },
  {
    id: "agent-notify", name: "NotificatieAgent", role: "Alerts & Communicatie",
    description: "Verzendt slimme notificaties, filtert ruis en escaleert kritieke meldingen naar de juiste personen.",
    status: "online", model: "GPT-5 Nano", category: "systeem", linkedPages: ["notifications"],
    tasksCompleted: 15200, avgResponseMs: 45, lastActive: "Nu actief", icon: Mail,
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
            <span className="text-emerald-400">{onlineCount} online</span>
            <span className="text-muted-foreground">{agents.length} totaal</span>
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
              <div key={agent.id} className={cn("rounded-xl border p-4 transition-all hover:scale-[1.005]", catCfg.bg, catCfg.border, agent.status === "offline" && "opacity-50")}>
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className={cn("relative p-2.5 rounded-xl border flex-shrink-0", catCfg.bg, catCfg.border)}>
                    <Icon className={cn("w-5 h-5", catCfg.color)} />
                    <div className={cn("absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-card", stCfg.dot, agent.status === "online" && "animate-pulse")} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-foreground">{agent.name}</h3>
                      <span className={cn("text-[9px] font-mono px-1.5 py-0.5 rounded-full border", stCfg.text, stCfg.bg, stCfg.border)}>{stCfg.label}</span>
                      <span className={cn("text-[9px] font-medium px-1.5 py-0.5 rounded-full border", catCfg.color, catCfg.bg, catCfg.border)}>{catCfg.label}</span>
                    </div>
                    <p className="text-[10px] font-medium text-foreground/70 mt-0.5">{agent.role}</p>
                    <p className="text-[11px] text-muted-foreground mt-1">{agent.description}</p>

                    {/* Metrics */}
                    <div className="flex items-center gap-3 mt-2.5 flex-wrap">
                      <span className="text-[9px] font-mono text-muted-foreground/60">Model: <span className="text-muted-foreground">{agent.model}</span></span>
                      <span className="text-[9px] font-mono text-muted-foreground/60">{agent.tasksCompleted.toLocaleString("nl-NL")} taken</span>
                      <span className="text-[9px] font-mono text-muted-foreground/60">{agent.avgResponseMs}ms avg</span>
                      {agent.lastActive && <span className="text-[9px] font-mono text-muted-foreground/40">{agent.lastActive}</span>}
                    </div>

                    {/* Linked pages */}
                    <div className="flex items-center gap-1 mt-2 flex-wrap">
                      <Zap className="w-3 h-3 text-muted-foreground/30" />
                      {agent.linkedPages.map(p => (
                        <span key={p} className="text-[8px] font-mono px-1.5 py-0.5 rounded border border-border text-muted-foreground/60 bg-muted/10">
                          {pageLabels[p] || p}
                        </span>
                      ))}
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
