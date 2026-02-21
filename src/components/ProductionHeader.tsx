import { useState, useEffect } from "react";
import { Flower2, Users, Package, Zap, Bot } from "lucide-react";
import { dashboardStats, aiMessages } from "@/data/mockData";

const LiveClock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-end leading-none">
      <div className="text-3xl font-mono font-black text-foreground tracking-tight tabular-nums">
        {time.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" })}
      </div>
      <div className="text-[11px] text-muted-foreground capitalize mt-0.5">
        {time.toLocaleDateString("nl-NL", { weekday: "short", day: "numeric", month: "short" })}
      </div>
    </div>
  );
};

const ProductionHeader = () => {
  const [aiIndex, setAiIndex] = useState(0);
  const [aiVisible, setAiVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setAiVisible(false);
      setTimeout(() => {
        setAiIndex((p) => (p + 1) % aiMessages.length);
        setAiVisible(true);
      }, 400);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="flex items-center gap-4 px-5 py-3 border-b border-border bg-card/60 backdrop-blur-sm shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 rounded-xl bg-gradient-bloom flex items-center justify-center">
          <Flower2 className="w-6 h-6 text-primary-foreground" />
        </div>
        <div className="leading-tight">
          <h1 className="text-base font-bold text-foreground tracking-tight">
            Bloom<span className="text-primary">masters</span>
          </h1>
          <p className="text-[10px] text-muted-foreground">Productie Live</p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-3 ml-4">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card">
          <Users className="w-4 h-4 text-muted-foreground" />
          <div className="leading-none">
            <div className="text-[9px] text-muted-foreground uppercase tracking-wider">Actief</div>
            <div className="text-lg font-mono font-black text-foreground">{dashboardStats.totalPeople}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card">
          <Package className="w-4 h-4 text-muted-foreground" />
          <div className="leading-none">
            <div className="text-[9px] text-muted-foreground uppercase tracking-wider">Stuks</div>
            <div className="text-lg font-mono font-black text-foreground">{dashboardStats.totalProduced.toLocaleString("nl-NL")}</div>
          </div>
        </div>
        {/* DOMINANT SPEED METRIC */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-accent/30 bg-accent/8 glow-success">
          <Zap className="w-5 h-5 text-accent" />
          <div className="leading-none">
            <div className="text-[9px] text-accent uppercase tracking-wider font-semibold">Stuks/uur</div>
            <div className="text-2xl font-mono font-black text-accent text-glow-success">{dashboardStats.avgPiecesPerHour}</div>
          </div>
        </div>
      </div>

      {/* AI Assistant */}
      <div className="flex-1 mx-4">
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-bloom overflow-hidden">
          <Bot className="w-5 h-5 text-primary-foreground/90 shrink-0" />
          <div className="overflow-hidden flex-1">
            <div className="text-[9px] text-primary-foreground/60 uppercase tracking-wider font-semibold mb-0.5">AI Assistent</div>
            <p className={`text-sm font-semibold text-primary-foreground truncate transition-all duration-300 ${aiVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
              {aiMessages[aiIndex]}
            </p>
          </div>
        </div>
      </div>

      <LiveClock />
    </header>
  );
};

export default ProductionHeader;
