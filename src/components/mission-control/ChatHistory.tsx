import { Clock, MessageSquare } from "lucide-react";

interface HistoryItem {
  id: string;
  title: string;
  preview: string;
  time: string;
  messages: number;
}

const mockHistory: HistoryItem[] = [
  { id: "1", title: "Productie analyse ochtend", preview: "De APU van BQ Field L ligt 10% boven target...", time: "09:15", messages: 8 },
  { id: "2", title: "Bezettingsadvies middag", preview: "Op basis van de huidige output raad ik aan...", time: "11:30", messages: 5 },
  { id: "3", title: "Koelcel voorraad check", preview: "De voorraad in koelcel 2 is voldoende voor...", time: "Gisteren", messages: 12 },
  { id: "4", title: "Weekplanning review", preview: "Voor komende week staan 2400 boeketten gepland...", time: "19 feb", messages: 15 },
];

const ChatHistory = () => {
  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-white/30" />
        <h2 className="text-sm font-bold text-white/60">Chat Historie</h2>
      </div>

      <div className="flex-1 min-h-0 space-y-2 overflow-y-auto">
        {mockHistory.map(item => (
          <button key={item.id} className="w-full text-left p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 hover:bg-white/[0.04] transition-all group">
            <div className="flex items-start justify-between mb-1">
              <h4 className="text-xs font-bold text-white/60 group-hover:text-white/80 transition-colors truncate">{item.title}</h4>
              <span className="text-[10px] font-mono text-white/20 shrink-0 ml-2">{item.time}</span>
            </div>
            <p className="text-[11px] text-white/30 truncate">{item.preview}</p>
            <div className="flex items-center gap-1 mt-1.5">
              <MessageSquare className="w-3 h-3 text-white/15" />
              <span className="text-[9px] font-mono text-white/20">{item.messages} berichten</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatHistory;
