"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";
import { ProgressionDataPoint, DriverStanding } from "@/lib/types";
import { getTeamColor } from "@/lib/utils";

interface ChampionshipProgressionChartProps {
  data: ProgressionDataPoint[];
  standings: DriverStanding[];
}

export function ChampionshipProgressionChart({ data, standings }: ChampionshipProgressionChartProps) {
  // Initially select top 4 drivers
  const topDriverIds = standings.slice(0, 4).map((d) => d.driver_id);
  const [selectedDrivers, setSelectedDrivers] = useState<string[]>(topDriverIds);

  const toggleDriver = (driverId: string) => {
    if (selectedDrivers.includes(driverId)) {
      if (selectedDrivers.length > 1) {
        setSelectedDrivers(selectedDrivers.filter((id) => id !== driverId));
      }
    } else {
      setSelectedDrivers([...selectedDrivers, driverId]);
    }
  };

  // Build driver lookup map for quick label & color retrieval
  const driverMap = new Map<string, DriverStanding>();
  standings.forEach((d) => driverMap.set(d.driver_id, d));

  return (
    <div className="space-y-4">
      {/* Driver Toggle Pills */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs text-zinc-400 font-medium mr-1">Select Drivers:</span>
        {standings.slice(0, 10).map((d) => {
          const isSelected = selectedDrivers.includes(d.driver_id);
          const color = getTeamColor(d.constructor_id);
          return (
            <button
              key={d.driver_id}
              onClick={() => toggleDriver(d.driver_id)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-all flex items-center space-x-1.5 ${
                isSelected
                  ? "bg-zinc-800 border-zinc-500 text-zinc-100 font-medium shadow-sm"
                  : "bg-zinc-900/50 border-zinc-800/80 text-zinc-400 hover:text-zinc-300 hover:border-zinc-700"
              }`}
            >
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ backgroundColor: color }}
              />
              <span>{d.driver_name}</span>
            </button>
          );
        })}
      </div>

      {/* Chart */}
      <div className="h-[340px] w-full bg-[#0d0d11] rounded-lg p-2 border border-zinc-800/70">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 15, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f1f26" vertical={false} />
            <XAxis
              dataKey="round"
              stroke="#52525b"
              tick={{ fill: "#71717a", fontSize: 11 }}
              tickFormatter={(r) => `R${r}`}
            />
            <YAxis
              stroke="#52525b"
              tick={{ fill: "#71717a", fontSize: 11 }}
              domain={[0, "auto"]}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const raceName = payload[0]?.payload?.race_name || `Round ${label}`;
                  return (
                    <div className="bg-[#18181e] border border-zinc-700 p-3 rounded-lg shadow-xl text-xs space-y-1.5">
                      <div className="font-semibold text-zinc-200 border-b border-zinc-700/60 pb-1">
                        Round {label}: {raceName}
                      </div>
                      {payload.map((entry) => {
                        const drv = driverMap.get(entry.dataKey as string);
                        return (
                          <div key={entry.dataKey} className="flex justify-between space-x-4 items-center">
                            <span className="flex items-center space-x-1.5 text-zinc-300">
                              <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: entry.color }}
                              />
                              <span>{drv?.driver_name || entry.dataKey}</span>
                            </span>
                            <span className="font-mono font-bold text-zinc-100">
                              {entry.value} pts
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  );
                }
                return null;
              }}
            />
            {selectedDrivers.map((driverId) => {
              const drv = driverMap.get(driverId);
              const color = getTeamColor(drv?.constructor_id);
              return (
                <Line
                  key={driverId}
                  type="monotone"
                  dataKey={driverId}
                  name={drv?.driver_name || driverId}
                  stroke={color}
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: color, strokeWidth: 1, stroke: "#000" }}
                  activeDot={{ r: 5 }}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
