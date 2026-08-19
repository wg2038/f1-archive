"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Trophy,
  Shield,
  Flag,
  Award,
  Zap,
  Gauge,
  TrendingUp
} from "lucide-react";
import { StatisticsData } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { PositionBadge } from "@/components/ui/PositionBadge";
import { useLanguage } from "@/lib/i18n";
import { formatPoints, getTeamColor } from "@/lib/utils";

export default function StatisticsPage() {
  const { lang, t, dName, tName, natName } = useLanguage();
  const [stats, setStats] = useState<StatisticsData | null>(null);

  useEffect(() => {
    fetch("/data/statistics.json")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((e) => console.error(e));
  }, []);

  if (!stats) {
    return <div className="p-8 text-center text-zinc-400">Loading statistics...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-zinc-800 pb-6 space-y-2">
        <div className="flex items-center space-x-2">
          <Badge variant="era">{lang === "zh" ? "历史官方纪录大全" : "HISTORICAL RECORD BOOK"}</Badge>
          <span className="text-xs font-mono text-zinc-400">{lang === "zh" ? "2000–2025 跨时代榜单" : "2000–2025 Multi-Era Leaderboards"}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white uppercase font-mono">
          {t("stats.title")}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-3xl leading-relaxed">
          {t("stats.subtitle")}
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="drivers" className="space-y-6">
        <TabsList className="bg-[#111116] p-1 rounded-xl border border-zinc-800">
          <TabsTrigger value="drivers">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>{t("stats.drivers")}</span>
          </TabsTrigger>
          <TabsTrigger value="constructors">
            <Shield className="w-3.5 h-3.5 text-red-500" />
            <span>{t("stats.constructors")}</span>
          </TabsTrigger>
          <TabsTrigger value="dominant">
            <Zap className="w-3.5 h-3.5 text-purple-400" />
            <span>{t("stats.dominant")}</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Drivers */}
        <TabsContent value="drivers" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Most Championships */}
            <div className="bg-[#111116] border border-zinc-800 rounded-xl p-5 space-y-3">
              <h3 className="font-bold text-sm text-amber-400 flex items-center space-x-2 uppercase tracking-wider">
                <Trophy className="w-4 h-4" />
                <span>{lang === "zh" ? "世界车手总冠军榜" : "World Championships"}</span>
              </h3>
              <div className="divide-y divide-zinc-800/60 font-mono text-xs">
                {stats.most_championships_drivers.map((d, idx) => (
                  <div key={d.driver_id} className="py-2 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-zinc-500 font-bold w-4">{idx + 1}.</span>
                      <Link href={`/driver/${d.driver_id}`} className="text-zinc-200 hover:text-amber-400 font-sans font-medium">
                        {dName(d)}
                      </Link>
                    </div>
                    <span className="font-bold text-amber-400 text-sm">
                      {d.championships} {lang === "zh" ? "届总冠军" : "Titles"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Most Race Wins */}
            <div className="bg-[#111116] border border-zinc-800 rounded-xl p-5 space-y-3">
              <h3 className="font-bold text-sm text-red-400 flex items-center space-x-2 uppercase tracking-wider">
                <Flag className="w-4 h-4" />
                <span>{lang === "zh" ? "分站冠军胜场榜" : "Most Race Wins"}</span>
              </h3>
              <div className="divide-y divide-zinc-800/60 font-mono text-xs">
                {stats.most_wins_drivers.slice(0, 10).map((d, idx) => (
                  <div key={d.driver_id} className="py-2 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-zinc-500 font-bold w-4">{idx + 1}.</span>
                      <Link href={`/driver/${d.driver_id}`} className="text-zinc-200 hover:text-red-400 font-sans font-medium">
                        {dName(d)}
                      </Link>
                    </div>
                    <span className="font-bold text-red-400 text-sm">{d.wins} {lang === "zh" ? "胜" : "Wins"}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Most Podiums */}
            <div className="bg-[#111116] border border-zinc-800 rounded-xl p-5 space-y-3">
              <h3 className="font-bold text-sm text-zinc-300 flex items-center space-x-2 uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>{lang === "zh" ? "生涯领奖台总数榜" : "Most Podiums"}</span>
              </h3>
              <div className="divide-y divide-zinc-800/60 font-mono text-xs">
                {stats.most_podiums_drivers.slice(0, 10).map((d, idx) => (
                  <div key={d.driver_id} className="py-2 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-zinc-500 font-bold w-4">{idx + 1}.</span>
                      <Link href={`/driver/${d.driver_id}`} className="text-zinc-200 hover:text-zinc-100 font-sans font-medium">
                        {dName(d)}
                      </Link>
                    </div>
                    <span className="font-bold text-zinc-200 text-sm">{d.podiums} {lang === "zh" ? "次" : ""}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Most Pole Positions */}
            <div className="bg-[#111116] border border-zinc-800 rounded-xl p-5 space-y-3">
              <h3 className="font-bold text-sm text-blue-400 flex items-center space-x-2 uppercase tracking-wider">
                <Gauge className="w-4 h-4" />
                <span>{lang === "zh" ? "生涯杆位总数榜" : "Most Pole Positions"}</span>
              </h3>
              <div className="divide-y divide-zinc-800/60 font-mono text-xs">
                {stats.most_poles_drivers.slice(0, 10).map((d, idx) => (
                  <div key={d.driver_id} className="py-2 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-zinc-500 font-bold w-4">{idx + 1}.</span>
                      <Link href={`/driver/${d.driver_id}`} className="text-zinc-200 hover:text-blue-400 font-sans font-medium">
                        {dName(d)}
                      </Link>
                    </div>
                    <span className="font-bold text-blue-400 text-sm">{d.poles} {lang === "zh" ? "次" : ""}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Most Fastest Laps */}
            <div className="bg-[#111116] border border-zinc-800 rounded-xl p-5 space-y-3">
              <h3 className="font-bold text-sm text-purple-400 flex items-center space-x-2 uppercase tracking-wider">
                <Zap className="w-4 h-4" />
                <span>{lang === "zh" ? "最快圈速总数榜" : "Most Fastest Laps"}</span>
              </h3>
              <div className="divide-y divide-zinc-800/60 font-mono text-xs">
                {stats.most_fastest_laps_drivers.slice(0, 10).map((d, idx) => (
                  <div key={d.driver_id} className="py-2 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-zinc-500 font-bold w-4">{idx + 1}.</span>
                      <Link href={`/driver/${d.driver_id}`} className="text-zinc-200 hover:text-purple-400 font-sans font-medium">
                        {dName(d)}
                      </Link>
                    </div>
                    <span className="font-bold text-purple-400 text-sm">{d.fastest_laps} {lang === "zh" ? "次" : ""}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Most Career Points */}
            <div className="bg-[#111116] border border-zinc-800 rounded-xl p-5 space-y-3">
              <h3 className="font-bold text-sm text-emerald-400 flex items-center space-x-2 uppercase tracking-wider">
                <TrendingUp className="w-4 h-4" />
                <span>{lang === "zh" ? "生涯累计总积分榜" : "Total Career Points"}</span>
              </h3>
              <div className="divide-y divide-zinc-800/60 font-mono text-xs">
                {stats.most_points_drivers.slice(0, 10).map((d, idx) => (
                  <div key={d.driver_id} className="py-2 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-zinc-500 font-bold w-4">{idx + 1}.</span>
                      <Link href={`/driver/${d.driver_id}`} className="text-zinc-200 hover:text-emerald-400 font-sans font-medium">
                        {dName(d)}
                      </Link>
                    </div>
                    <span className="font-bold text-emerald-400 text-sm">{formatPoints(d.points)} pts</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: Constructors */}
        <TabsContent value="constructors" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Constructor Titles */}
            <div className="bg-[#111116] border border-zinc-800 rounded-xl p-5 space-y-3">
              <h3 className="font-bold text-sm text-amber-400 flex items-center space-x-2 uppercase tracking-wider">
                <Trophy className="w-4 h-4" />
                <span>{lang === "zh" ? "车队总冠军榜 (2000–2025)" : "Constructors' World Championships (2000–2025)"}</span>
              </h3>
              <div className="divide-y divide-zinc-800/60 font-mono text-xs">
                {stats.most_championships_teams.map((tItem, idx) => {
                  const teamColor = getTeamColor(tItem.constructor_id);
                  return (
                    <div key={tItem.constructor_id} className="py-3 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-zinc-500 font-bold w-4">{idx + 1}.</span>
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block"
                          style={{ backgroundColor: teamColor }}
                        />
                        <Link href={`/team/${tItem.constructor_id}`} className="text-zinc-200 hover:text-amber-400 font-sans font-semibold text-sm">
                          {tName(tItem)}
                        </Link>
                        <span className="text-zinc-500 text-[11px] font-sans">({natName(tItem)})</span>
                      </div>
                      <span className="font-bold text-amber-400 text-base">{tItem.championships} {lang === "zh" ? "届总冠军" : "Titles"}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Constructor Wins */}
            <div className="bg-[#111116] border border-zinc-800 rounded-xl p-5 space-y-3">
              <h3 className="font-bold text-sm text-red-400 flex items-center space-x-2 uppercase tracking-wider">
                <Shield className="w-4 h-4" />
                <span>{lang === "zh" ? "车队分站胜场榜 (2000–2025)" : "Total Grand Prix Victories (2000–2025)"}</span>
              </h3>
              <div className="divide-y divide-zinc-800/60 font-mono text-xs">
                {stats.most_wins_teams.map((tItem, idx) => {
                  const teamColor = getTeamColor(tItem.constructor_id);
                  return (
                    <div key={tItem.constructor_id} className="py-3 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-zinc-500 font-bold w-4">{idx + 1}.</span>
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block"
                          style={{ backgroundColor: teamColor }}
                        />
                        <Link href={`/team/${tItem.constructor_id}`} className="text-zinc-200 hover:text-red-400 font-sans font-semibold text-sm">
                          {tName(tItem)}
                        </Link>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-red-400 text-base">{tItem.wins} {lang === "zh" ? "胜" : "Wins"}</span>
                        <span className="text-[11px] text-zinc-500 block font-sans">
                          {tItem.podiums} {lang === "zh" ? "领奖台" : "Podiums"} • {tItem.poles} {lang === "zh" ? "杆位" : "Poles"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tab 3: Dominant Single Seasons */}
        <TabsContent value="dominant" className="space-y-4">
          <div className="bg-[#101014] border border-zinc-800/80 rounded-xl overflow-hidden shadow-md">
            <div className="table-container">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 bg-[#14141a] text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                    <th className="py-3 px-3 w-12 text-center">{t("th.pos")}</th>
                    <th className="py-3 px-3 font-mono">{lang === "zh" ? "赛季" : "Season"}</th>
                    <th className="py-3 px-3">{lang === "zh" ? "冠军车手" : "Champion Driver"}</th>
                    <th className="py-3 px-3">{lang === "zh" ? "获胜车队" : "Winning Constructor"}</th>
                    <th className="py-3 px-3 text-center font-mono">{lang === "zh" ? "胜场 / 总站数" : "Wins / GPs"}</th>
                    <th className="py-3 px-3 text-right font-mono text-amber-400 font-bold">{t("stats.winRate")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {stats.dominant_seasons.map((ds, idx) => (
                    <tr key={ds.year} className="hover:bg-zinc-800/40 transition-colors">
                      <td className="py-3 px-3 text-center">
                        <PositionBadge pos={idx + 1} />
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-zinc-200">
                        <Link href={`/season/${ds.year}`} className="hover:text-red-400">
                          {ds.year}
                        </Link>
                      </td>
                      <td className="py-3 px-3 font-bold text-zinc-100">
                        {lang === "zh" ? ds.champion_driver_cn || ds.champion_driver : ds.champion_driver}
                      </td>
                      <td className="py-3 px-3 text-zinc-300">
                        {lang === "zh" ? ds.champion_team_cn || ds.champion_team : ds.champion_team}
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-zinc-300">
                        {ds.driver_wins} / {ds.total_gps}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-extrabold text-amber-400 text-sm">
                        {ds.win_percentage}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
