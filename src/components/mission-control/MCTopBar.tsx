import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type MCView = "chat" | "kanban" | "history" | "settings";

interface MCTopBarProps {
  view: MCView;
  onNewChat?: () => void;
}

const viewTitles: Record<MCView, string> = {
  chat: "HBMaster Chat",
  kanban: "Kanban Board",
  history: "Chat Historie",
  settings: "Instellingen",
};

const MCTopBar = ({ view, onNewChat }: MCTopBarProps) => {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-card px-6 flex-shrink-0">
      <h1 className="text-lg font-semibold text-foreground">{viewTitles[view]}</h1>

      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Zoeken..." className="w-56 pl-9 h-9 text-sm" />
        </div>

        {view === "chat" && onNewChat && (
          <button
            onClick={onNewChat}
            className="text-xs font-medium text-primary hover:text-primary/80 transition-colors px-3 py-1.5 rounded-md border border-border hover:border-primary/30 hover:bg-primary/5"
          >
            + Nieuw gesprek
          </button>
        )}
      </div>
    </header>
  );
};

export default MCTopBar;
