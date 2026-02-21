import { Play, Clock, Users, AlertCircle, Zap, Rocket, ThumbsUp } from "lucide-react";
import { activeProducts, type ActiveProduct } from "@/data/mockData";

const statusConfig = {
  "op-schema": { label: "Op schema", icon: <ThumbsUp className="w-3 h-3" />, className: "bg-bloom-sky/15 text-bloom-sky" },
  "sneller": { label: "Sneller dan gepland", icon: <Zap className="w-3 h-3" />, className: "bg-accent/15 text-accent" },
  "hoog-tempo": { label: "Hoog tempo", icon: <Rocket className="w-3 h-3" />, className: "bg-bloom-warm/15 text-bloom-warm" },
  "onder-check": { label: "Onder check", icon: <AlertCircle className="w-3 h-3" />, className: "bg-bloom-warm/15 text-bloom-warm" },
};

const formatDuration = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}u${m}m` : `${m}m`;
};

const ActiveProductCard = ({ product }: { product: ActiveProduct }) => {
  const pct = Math.round((product.produced / product.target) * 100);
  const status = statusConfig[product.status];

  return (
    <div className="bg-gradient-card rounded-xl border border-border overflow-hidden flex flex-col h-full group">
      {/* Large product image */}
      <div className="relative flex-[5] min-h-0 overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {/* Status badge */}
        <div className="absolute top-2 left-2">
          <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full backdrop-blur-md ${status.className}`}>
            {status.icon}
            {status.label}
          </span>
        </div>
        {/* Line badge */}
        <div className="absolute top-2 right-2">
          <span className="text-[10px] font-bold px-2 py-1 rounded-full backdrop-blur-md bg-card/80 text-foreground border border-border/50">
            {product.line}
          </span>
        </div>
        {/* Speed overlay */}
        <div className="absolute bottom-2 right-2 bg-card/90 backdrop-blur-sm rounded-lg px-2.5 py-1.5 border border-accent/30">
          <div className="text-[8px] text-accent uppercase tracking-wider font-bold">stuks/u</div>
          <div className="text-xl font-mono font-black text-accent text-glow-success leading-none">{product.piecesPerHour}</div>
        </div>
      </div>

      {/* Info */}
      <div className="flex-[3] p-3 flex flex-col justify-between min-h-0">
        <div>
          <h3 className="text-base font-bold text-foreground truncate mb-1">{product.name}</h3>

          {/* Under check info */}
          {product.status === "onder-check" && product.checkStartTime && (
            <div className="mb-2 p-2 rounded-lg bg-bloom-warm/5 border border-bloom-warm/20">
              <div className="flex items-center gap-1 text-bloom-warm text-[10px] font-bold mb-1">
                <AlertCircle className="w-3 h-3" />
                Check actief
              </div>
              <div className="flex gap-3 text-[10px]">
                <div><span className="text-muted-foreground">Start </span><span className="font-mono font-bold text-foreground">{product.checkStartTime}</span></div>
                <div><span className="text-muted-foreground">Pers. </span><span className="font-mono font-bold text-foreground">{product.checkPeople}</span></div>
                <div><span className="text-muted-foreground">Klaar </span><span className="font-mono font-bold text-foreground">{product.checkEndTime}</span></div>
              </div>
            </div>
          )}

          {/* Meta row */}
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground mb-2">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{product.startTime}–{product.expectedEndTime}</span>
            <span className="flex items-center gap-1"><Users className="w-3 h-3" />{product.people} pers.</span>
            <span>{formatDuration(product.minutesActive)} bezig</span>
          </div>
        </div>

        {/* Progress */}
        <div>
          <div className="flex justify-between text-[10px] mb-1">
            <span className="font-mono font-bold text-foreground">{product.produced.toLocaleString("nl-NL")} <span className="text-muted-foreground font-normal">/ {product.target}</span></span>
            <span className="font-mono font-bold text-foreground">{pct}%</span>
          </div>
          <div className="h-2 rounded-full bg-secondary overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${
                product.status === "sneller" || product.status === "hoog-tempo" ? "bg-gradient-success" : "bg-primary"
              }`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ActiveProduction = () => {
  return (
    <section className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-2 shrink-0">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse-slow" />
        <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">In productie</h2>
      </div>
      <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
        {activeProducts.map((product) => (
          <ActiveProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ActiveProduction;
