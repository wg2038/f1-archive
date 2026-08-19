"use client";

import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";
import { DriverSeasonRecord } from "@/lib/types";

interface CareerProgressionChartProps {
  data: DriverSeasonRecord[];
}

export function CareerProgressionChart({ data }: CareerProgressionChartProps) {
  const chartData = data.map((sr) => ({
    season: sr.season,
    points: sr.points,
    wins: sr.wins,
    podiums: sr.podiums,
    rank: typeof sr.position === "number" ? sr.position : parseInt(String(sr.position), 10) || 20,
    team: sr.team_name
  }));

  return (
    <div className="h-[280px] w-full bg-[#0d0d11] rounded-lg p-2 border border-zinc-800/70">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData} margin={{ top: 15, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f1f26" vertical={false} />
          <XAxis
            dataKey="season"
            stroke="#52525b"
            tick={{ fill: "#71717a", fontSize: 11 }}
          />
          <YAxis
            yAxisId="points"
            stroke="#52525b"
            tick={{ fill: "#71717a", fontSize: 11 }}
          />
          <YAxis
            yAxisId="rank"
            orientation="right"
            reversed
            domain={[1, 22]}
            stroke="#52525b"
            tick={{ fill: "#71717a", fontSize: 11 }}
            tickFormatter={(v) => `P${v}`}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const item = payload[0]?.payload;
                return (
                  <div className="bg-[#18181e] border border-zinc-700 p-3 rounded-lg shadow-xl text-xs space-y-1">
                    <div className="font-semibold text-zinc-200 border-b border-zinc-700/60 pb-1">
                      {label} Season — {item?.team}
                    </div>
                    <div className="text-zinc-300">
                      Championship Rank: <span className="font-mono font-bold text-amber-400">P{item?.rank}</span>
                    </div>
                    <div className="text-zinc-300">
                      Points: <span className="font-mono font-bold text-zinc-100">{item?.points} pts</span>
                    </div>
                    <div className="text-zinc-300">
                      Wins: <span className="font-mono font-bold text-red-400">{item?.wins}</span> | Podiums: <span className="font-mono font-bold text-zinc-200">{item?.podiums}</span>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar
            yAxisId="points"
            dataKey="points"
            name="Points"
            fill="#e10600"
            radius={[3, 3, 0, 0]}
            maxBarSize={28}
          />
          <Line
            yAxisId="rank"
            type="monotone"
            dataKey="rank"
            name="Rank"
            stroke="#fbbf24"
            strokeWidth={2}
            dot={{ r: 3, fill: "#fbbf24" }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
