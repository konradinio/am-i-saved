"use client";

// SpiritualRadarChart — placeholder with static mock data.
// Uses Recharts. Must be a Client Component (Recharts requires the DOM).
// TODO (Milestone 6): Accept real ChartDataPoint[] as props from assessment results.
// TODO (Milestone 9): Export to PDF-compatible static image via canvas snapshot.

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { ChartDataPoint } from "@/types";

const MOCK_DATA: ChartDataPoint[] = [
  { category: "Faith", score: 78, fullMark: 100 },
  { category: "Prayer", score: 62, fullMark: 100 },
  { category: "Charity", score: 85, fullMark: 100 },
  { category: "Forgiveness", score: 55, fullMark: 100 },
  { category: "Humility", score: 70, fullMark: 100 },
  { category: "Scripture", score: 48, fullMark: 100 },
  { category: "Community", score: 73, fullMark: 100 },
  { category: "Repentance", score: 66, fullMark: 100 },
];

type Props = {
  data?: ChartDataPoint[];
  height?: number;
};

export function SpiritualRadarChart({ data = MOCK_DATA, height = 400 }: Props) {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          data={data}
          margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
        >
          <PolarGrid
            stroke="rgba(245, 240, 232, 0.15)"
            strokeDasharray="3 3"
          />
          <PolarAngleAxis
            dataKey="category"
            tick={{
              fill: "rgba(245, 240, 232, 0.7)",
              fontSize: 12,
              fontWeight: 500,
            }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: "rgba(245, 240, 232, 0.3)", fontSize: 10 }}
            tickCount={5}
          />
          <Radar
            name="Spiritual Health"
            dataKey="score"
            stroke="#c9973a"
            fill="#c9973a"
            fillOpacity={0.25}
            strokeWidth={2}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0f1f3c",
              border: "1px solid rgba(201, 151, 58, 0.3)",
              borderRadius: "12px",
              color: "#f5f0e8",
              fontSize: "13px",
            }}
            formatter={(value) => [`${value ?? 0}%`, "Score"]}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
