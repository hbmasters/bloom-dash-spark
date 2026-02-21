import { useState, useEffect } from "react";
import { Activity, Zap, Users, BarChart3, CheckCircle2, Cpu } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  color: string;
  delay?: number;
}

const StatCard = ({ icon, label, value, sub, color, delay = 0 }: StatCardProps) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t); }, [delay]);

  return (
    <div className={`rounded-xl border border-white/8 bg-white/[0.03] p-3 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${color}`}>
          {icon}
        </div>
        <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-xl font-mono font-bold text-white/90">{value}</div>
      {sub && <div className="text-[10px] font-mono text-white/30 mt-0.5">{sub}</div>}
    </div>
  );
};

const TelemetryPanel = () => {
  const [latency, setLatency] = useState(142);

  // Simulate latency updates
  useEffect(() => {
    const i = setInterval(() => {
      setLatency(120 + Math.round(Math.random() * 80));
    }, 3000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="flex flex-col h-full p-4 space-y-3 overflow-y-auto">
      <h3 className="text-[10px] font-mono font-bold text-white/30 uppercase tracking-widest">AI Telemetry</h3>
      
      <div className="grid grid-cols-2 gap-2">
        <StatCard icon={<Activity className="w-3.5 h-3.5 text-emerald-400" />} label="Status" value="Online" color="bg-emerald-500/15" delay={0} />
        <StatCard icon={<Zap className="w-3.5 h-3.5 text-amber-400" />} label="Latency" value={`${latency}ms`} sub="avg response" color="bg-amber-500/15" delay={50} />
        <StatCard icon={<Users className="w-3.5 h-3.5 text-blue-400" />} label="Sessions" value="3" sub="actief" color="bg-blue-500/15" delay={100} />
        <StatCard icon={<BarChart3 className="w-3.5 h-3.5 text-purple-400" />} label="Tokens" value="12.4k" sub="vandaag" color="bg-purple-500/15" delay={150} />
        <StatCard icon={<CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />} label="Success" value="98.2%" sub="last 24h" color="bg-cyan-500/15" delay={200} />
        <StatCard icon={<Cpu className="w-3.5 h-3.5 text-rose-400" />} label="Top Task" value="Planning" sub="40% van queries" color="bg-rose-500/15" delay={250} />
      </div>

      {/* System status */}
      <div className="mt-4">
        <h4 className="text-[10px] font-mono text-white/25 uppercase tracking-wider mb-2">System Status</h4>
        <div className="space-y-1.5">
          {[
            { name: "AI Gateway", status: "operational" },
            { name: "Database", status: "operational" },
            { name: "Realtime", status: "operational" },
            { name: "Edge Functions", status: "operational" },
          ].map(s => (
            <div key={s.name} className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white/[0.02] border border-white/5">
              <span className="text-[11px] font-mono text-white/50">{s.name}</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[9px] font-mono text-emerald-400/70">{s.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TelemetryPanel;
