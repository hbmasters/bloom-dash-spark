import { cn } from "@/lib/utils";
import { agents, agentCategoryConfig, type Agent, type AgentStatus } from "./MCAgents";
import { Bot } from "lucide-react";

const statusDot: Record<AgentStatus, string> = {
  online: "bg-emerald-400",
  standby: "bg-amber-400",
  offline: "bg-muted-foreground",
};

interface PageAgentBadgesProps {
  pageId: string;
  className?: string;
}

/** Shows small inline badges for agents linked to a given page */
const PageAgentBadges = ({ pageId, className }: PageAgentBadgesProps) => {
  const linked = agents.filter(a => a.linkedPages.includes(pageId));
  if (linked.length === 0) return null;

  return (
    <div className={cn("flex items-center gap-1.5 flex-wrap", className)}>
      <Bot className="w-3 h-3 text-muted-foreground/40" />
      {linked.map(agent => {
        const catCfg = agentCategoryConfig[agent.category];
        return (
          <span
            key={agent.id}
            className={cn(
              "inline-flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.5 rounded-full border transition-colors",
              catCfg.bg, catCfg.border, catCfg.color
            )}
          >
            <div className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", statusDot[agent.status], agent.status === "online" && "animate-pulse")} />
            {agent.name}
          </span>
        );
      })}
    </div>
  );
};

export default PageAgentBadges;
