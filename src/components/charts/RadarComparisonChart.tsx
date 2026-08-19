"use client";

import React from "react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip
} from "recharts";

interface MetricComparison {
  metric: string;
  driver1Val: number;
  driver2Val: number;
  driver1Norm: number;
  driver2Norm: number;
}

interface RadarComparisonChartProps {
  name1: string;
  name2: string;
  color1?: string;
  color2?: string;
  metrics: Array<{
    label: string;
    val1: number;
    val2: number;
  }>;
}

export function RadarComparisonChart({
  name1,
  name2,
  color1 = "#ef4444",
  color2 = "#06b6d4",
  metrics
}: RadarComparisonChartProps) {
  // Normalize metrics so radar vertices are proportional
  const chartData = metrics.map((m) => {
    const maxVal = Math.max(m.val1, m.val2, 1);
    return {
      metric: m.label,
      [name1]: Math.round((m.val1 / maxVal) * 100),
      [name2]: Math.round((m.val2 / maxVal) * 100),
      raw1: m.val1,
      raw2: m.val2
    };
  });

  return (
    <div className="h-[320px] w-full bg-[#0d0d11] rounded-lg p-2 border border-zinc-800/70">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
          <PolarGrid stroke="#27272a" />
          <PolarAngleAxis
            dataKey="metric"
            tick={{ fill: "#a1a1aa", fontSize: 11 }}
          />
          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const dataItem = payload[0]?.payload;
                return (
                  <div className="bg-[#18181e] border border-zinc-700 p-3 rounded-lg shadow-xl text-xs space-y-1.5">
                    <div className="font-semibold text-zinc-200 border-b border-zinc-700/60 pb-1">
                      {dataItem?.metric}
                    </div>
                    <div className="flex justify-between space-x-4">
                      <span style={{ color: color1 }} className="font-medium">
                        {name1}:
                      </span>
                      <span className="font-mono font-bold text-zinc-100">{dataItem?.raw1}</span>
                    </div>
                    <div className="flex justify-between space-x-4">
                      <span style={{ color: color2 }} className="font-medium">
                        {name2}:
                      </span>
                      <span className="font-mono font-bold text-zinc-100">{dataItem?.raw2}</span>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Radar
            name={name1}
            dataKey={name1}
            stroke={color1}
            fill={color1}
            fillOpacity={0.4}
          />
          <Radar
            name={name2}
            dataKey={name2}
            stroke={color2}
            fill={color2}
            fillOpacity={0.3}
          />
          <Legend
            wrapperStyle={{ paddingTop: "10px", fontSize: "12px", color: "#d4d4d8" }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
