import { MessageSquare, LayoutGrid, Clock, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

type MCView = "chat" | "kanban" | "history" | "settings";

interface MCBottomNavProps {
  active: MCView;
  onNavigate: (view: MCView) => void;
}

const navItems: { id: MCView; icon: typeof MessageSquare; label: string }[] = [
  { id: "chat", icon: MessageSquare, label: "Chat" },
  { id: "kanban", icon: LayoutGrid, label: "Kanban" },
  { id: "history", icon: Clock, label: "Historie" },
  { id: "settings", icon: Settings, label: "Settings" },
];

const MCBottomNav = ({ active, onNavigate }: MCBottomNavProps) => {
  return (
    <nav className="md:hidden flex-shrink-0 flex items-center justify-around border-t border-border bg-card/80 backdrop-blur-xl px-2 py-1.5 safe-area-bottom">
      {navItems.map(item => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={cn(
              "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors min-w-[56px]",
              isActive
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[9px] font-mono font-medium">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default MCBottomNav;
