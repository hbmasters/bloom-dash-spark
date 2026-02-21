import { MessageSquare, LayoutGrid, Clock, Settings, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type MCView = "chat" | "kanban" | "history" | "settings";

interface MCSidebarProps {
  active: MCView;
  onNavigate: (view: MCView) => void;
}

const navItems: { id: MCView; icon: typeof MessageSquare; label: string }[] = [
  { id: "chat", icon: MessageSquare, label: "Chat" },
  { id: "kanban", icon: LayoutGrid, label: "Kanban" },
  { id: "history", icon: Clock, label: "Historie" },
  { id: "settings", icon: Settings, label: "Settings" },
];

const MCSidebar = ({ active, onNavigate }: MCSidebarProps) => {
  const navigate = useNavigate();

  return (
    <div className="w-16 lg:w-52 shrink-0 flex flex-col border-r border-white/5 bg-white/[0.02]">
      {/* Logo */}
      <div className="p-3 lg:px-4 lg:py-5 border-b border-white/5">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors">
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span className="hidden lg:block text-xs font-mono">Terug</span>
        </button>
        <div className="mt-3 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
            <span className="text-[9px] font-black text-white">HB</span>
          </div>
          <div className="hidden lg:block">
            <div className="text-xs font-bold text-white/80">Mission Control</div>
            <div className="text-[9px] font-mono text-white/30">OpenClaw v1.0</div>
          </div>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              active === item.id
                ? "bg-blue-500/15 text-blue-400 shadow-sm shadow-blue-500/10"
                : "text-white/35 hover:text-white/60 hover:bg-white/5"
            }`}
          >
            <item.icon className="w-4 h-4 shrink-0" />
            <span className="hidden lg:block">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom status */}
      <div className="p-3 border-t border-white/5">
        <div className="flex items-center gap-2 px-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden lg:block text-[10px] font-mono text-white/30">AI Online</span>
        </div>
      </div>
    </div>
  );
};

export default MCSidebar;
