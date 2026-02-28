import MiniHologram from "@/components/hbmaster-widget/MiniHologram";
import { useEffect, useState } from "react";

export function MCHologramBackground() {
  const [size, setSize] = useState(480);

  useEffect(() => {
    const update = () => setSize(Math.min(window.innerWidth, window.innerHeight) * 0.8);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden opacity-[0.18]">
      <MiniHologram state="idle" accentHsl="228 50% 55%" size={size} />
    </div>
  );
}
