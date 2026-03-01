interface SparklineProps {
  data: number[];
  trend: "up" | "down" | "neutral";
  width?: number;
  height?: number;
}

const trendColors = {
  up: "hsl(155, 55%, 42%)",
  down: "hsl(0, 55%, 55%)",
  neutral: "hsl(220, 15%, 55%)",
};

const DashboardSparkline = ({ data, trend, width = 72, height = 28 }: SparklineProps) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const color = trendColors[trend];

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * (height - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} className="shrink-0">
      <defs>
        <linearGradient id={`db-spark-${trend}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,${height} ${points} ${width},${height}`}
        fill={`url(#db-spark-${trend})`}
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DashboardSparkline;
