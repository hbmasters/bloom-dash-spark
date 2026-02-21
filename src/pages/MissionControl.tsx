import { useState } from "react";
import MCSidebar from "@/components/mission-control/MCSidebar";
import ChatThread from "@/components/mission-control/ChatThread";
import AIHologram from "@/components/mission-control/AIHologram";
import TelemetryPanel from "@/components/mission-control/TelemetryPanel";
import KanbanBoard from "@/components/mission-control/KanbanBoard";
import ChatHistory from "@/components/mission-control/ChatHistory";

type MCView = "chat" | "kanban" | "history" | "settings";

const MissionControl = () => {
  const [view, setView] = useState<MCView>("chat");
  const [aiState, setAiState] = useState<"idle" | "thinking" | "responding">("idle");
  const [messages, setMessages] = useState(0);

  return (
    <div className="h-screen w-screen bg-[hsl(225,25%,8%)] text-white flex overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/[0.03] blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/[0.02] blur-[100px]" />
        <div className="absolute top-1/3 left-1/2 w-[400px] h-[400px] rounded-full bg-emerald-500/[0.015] blur-[80px]" />
      </div>

      {/* Sidebar */}
      <MCSidebar active={view} onNavigate={setView} />

      {/* Main content */}
      <div className="flex-1 min-w-0 flex relative z-10">
        {/* Center panel */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Top bar */}
          <div className="shrink-0 h-12 border-b border-white/5 flex items-center px-4 justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white/50">
                {view === "chat" ? "Chat" : view === "kanban" ? "Kanban Board" : view === "history" ? "Historie" : "Settings"}
              </span>
            </div>
            {view === "chat" && (
              <button className="text-[10px] font-mono text-white/25 hover:text-white/50 transition-colors px-2 py-1 rounded-lg hover:bg-white/5">
                + Nieuw gesprek
              </button>
            )}
          </div>

          {/* Content area */}
          <div className="flex-1 min-h-0 flex">
            {view === "chat" && (
              <>
                {/* Chat thread */}
                <div className="flex-1 min-w-0 flex flex-col">
                  {/* Hologram - shows prominently when no messages, compact otherwise */}
                  <div className={`shrink-0 flex justify-center transition-all duration-500 ${
                    messages === 0 ? "py-8" : "py-2"
                  }`}>
                    <AIHologram state={aiState} compact={messages > 0} />
                  </div>
                  <div className="flex-1 min-h-0">
                    <ChatThread onStateChange={setAiState} />
                  </div>
                </div>
              </>
            )}
            {view === "kanban" && <KanbanBoard />}
            {view === "history" && <ChatHistory />}
            {view === "settings" && (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-sm text-white/20 font-mono">Settings — coming soon</p>
              </div>
            )}
          </div>
        </div>

        {/* Right panel - Telemetry (desktop only, chat view) */}
        {view === "chat" && (
          <div className="hidden xl:block w-72 border-l border-white/5 bg-white/[0.01]">
            <TelemetryPanel />
          </div>
        )}
      </div>
    </div>
  );
};

export default MissionControl;
