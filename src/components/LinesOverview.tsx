import { productionLines } from "@/data/mockData";

const LinesOverview = () => {
  const sorted = [...productionLines].sort((a, b) => b.piecesPerHour - a.piecesPerHour);
  const topId = sorted[0]?.id;

  return (
    <section className="flex flex-col h-full">
      <h2 className="text-sm font-bold text-foreground uppercase tracking-wider mb-2 shrink-0">
        Snelheidsranking
      </h2>
      <div className="flex-1 min-h-0 space-y-1 overflow-hidden">
        {sorted.map((line, i) => {
          const isTop = line.id === topId;
          const rank = i + 1;

          return (
            <div
              key={line.id}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border transition-all ${
                isTop
                  ? "border-accent/30 bg-accent/8"
                  : rank <= 3
                  ? "border-border bg-card/80"
                  : "border-transparent bg-transparent"
              }`}
            >
              {/* Rank */}
              <div className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-black shrink-0 ${
                rank === 1 ? "bg-bloom-warm/20 text-bloom-warm" :
                rank === 2 ? "bg-bloom-sky/20 text-bloom-sky" :
                rank === 3 ? "bg-bloom-lavender/20 text-bloom-lavender" :
                "text-muted-foreground"
              }`}>
                {rank}
              </div>

              {/* Name + badge */}
              <div className="flex-1 min-w-0 flex items-center gap-1.5">
                <span className="text-[11px] font-semibold text-foreground truncate">{line.name}</span>
                {line.badge && (
                  <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-accent/10 text-accent whitespace-nowrap">
                    {line.badge}
                  </span>
                )}
              </div>

              {/* People */}
              <span className="text-[10px] text-muted-foreground w-6 text-center">{line.people}p</span>

              {/* Produced */}
              <span className="text-[11px] font-mono font-bold text-foreground w-10 text-right">{line.produced}</span>

              {/* SPEED - dominant */}
              <div className={`text-xs font-mono font-black w-12 text-right ${rank <= 3 ? "text-accent" : "text-foreground"}`}>
                {line.piecesPerHour}/u
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LinesOverview;
