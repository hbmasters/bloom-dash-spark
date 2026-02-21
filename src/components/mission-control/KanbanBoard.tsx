import { LayoutGrid, MoreHorizontal } from "lucide-react";

interface KanbanCard {
  id: string;
  title: string;
  tag: string;
  tagColor: string;
}

interface KanbanColumn {
  title: string;
  cards: KanbanCard[];
  accent: string;
}

const columns: KanbanColumn[] = [
  {
    title: "Te Doen",
    accent: "bg-amber-500/20 text-amber-400",
    cards: [
      { id: "1", title: "BQ Trend voorbereiden", tag: "Productie", tagColor: "bg-blue-500/20 text-blue-400" },
      { id: "2", title: "Bezetting middag plannen", tag: "Planning", tagColor: "bg-purple-500/20 text-purple-400" },
    ],
  },
  {
    title: "In Uitvoering",
    accent: "bg-blue-500/20 text-blue-400",
    cards: [
      { id: "3", title: "BQ Field L produceren", tag: "Actief", tagColor: "bg-emerald-500/20 text-emerald-400" },
      { id: "4", title: "BQ Elegance kwaliteitscheck", tag: "QC", tagColor: "bg-rose-500/20 text-rose-400" },
      { id: "5", title: "Koelcel voorraad tellen", tag: "Logistiek", tagColor: "bg-cyan-500/20 text-cyan-400" },
    ],
  },
  {
    title: "Klaar",
    accent: "bg-emerald-500/20 text-emerald-400",
    cards: [
      { id: "6", title: "BQ de Luxe afgerond", tag: "✓ Done", tagColor: "bg-emerald-500/20 text-emerald-400" },
      { id: "7", title: "BQ Chique afgerond", tag: "✓ Done", tagColor: "bg-emerald-500/20 text-emerald-400" },
    ],
  },
];

const KanbanBoard = () => {
  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex items-center gap-2 mb-4">
        <LayoutGrid className="w-4 h-4 text-white/30" />
        <h2 className="text-sm font-bold text-white/60">Kanban Board</h2>
        <span className="text-[10px] font-mono text-white/20 ml-auto">read-only</span>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-3 gap-3 overflow-hidden">
        {columns.map(col => (
          <div key={col.title} className="flex flex-col min-h-0">
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${col.accent}`}>
                {col.cards.length}
              </span>
              <span className="text-xs font-bold text-white/50">{col.title}</span>
            </div>
            <div className="flex-1 min-h-0 space-y-2 overflow-y-auto">
              {col.cards.map(card => (
                <div key={card.id} className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors group">
                  <div className="flex items-start justify-between">
                    <h4 className="text-xs font-semibold text-white/70 leading-snug">{card.title}</h4>
                    <MoreHorizontal className="w-3 h-3 text-white/15 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </div>
                  <span className={`inline-block text-[9px] font-mono font-bold px-1.5 py-0.5 rounded mt-2 ${card.tagColor}`}>
                    {card.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
