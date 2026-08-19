"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trophy,
  Shield,
  Calendar,
  Zap,
  ArrowRight,
  TrendingUp,
  Award,
  Gauge
} from "lucide-react";
import { Driver, Team, SeasonSummary } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { RadarComparisonChart } from "@/components/charts/RadarComparisonChart";
import { useLanguage } from "@/lib/i18n";
import { formatPoints, getTeamColor } from "@/lib/utils";

export default function ComparePage() {
  const { lang, t, dName, tName, natName } = useLanguage();
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [seasons, setSeasons] = useState<SeasonSummary[]>([]);

  // Selection states
  const [driverAId, setDriverAId] = useState("michael_schumacher");
  const [driverBId, setDriverBId] = useState("hamilton");

  const [teamAId, setTeamAId] = useState("ferrari");
  const [teamBId, setTeamBId] = useState("mercedes");

  const [seasonAYear, setSeasonAYear] = useState("2004");
  const [seasonBYear, setSeasonBYear] = useState("2021");

  useEffect(() => {
    fetch("/data/drivers.json")
      .then((res) => res.json())
      .then((d) => setDrivers(d))
      .catch((e) => console.error(e));

    fetch("/data/teams.json")
      .then((res) => res.json())
      .then((t) => setTeams(t))
      .catch((e) => console.error(e));

    fetch("/data/seasons.json")
      .then((res) => res.json())
      .then((s) => setSeasons(s))
      .catch((e) => console.error(e));
  }, []);

  const driverA = drivers.find((d) => d.driver_id === driverAId) || drivers[0];
  const driverB = drivers.find((d) => d.driver_id === driverBId) || drivers[1];

  const teamA = teams.find((t) => t.constructor_id === teamAId) || teams[0];
  const teamB = teams.find((t) => t.constructor_id === teamBId) || teams[1];

  const seasonA = seasons.find((s) => String(s.season) === seasonAYear) || seasons[0];
  const seasonB = seasons.find((s) => String(s.season) === seasonBYear) || seasons[1];

  // Prepare radar metrics for Driver A vs B
  const radarMetrics = driverA && driverB ? [
    {
      label: lang === "zh" ? "世界冠军 (Titles)" : "Titles",
      val1: driverA.championships,
      val2: driverB.championships,
    },
    {
      label: lang === "zh" ? "分站胜场 (Wins)" : "Wins",
      val1: driverA.wins,
      val2: driverB.wins,
    },
    {
      label: lang === "zh" ? "领奖台 (Podiums)" : "Podiums",
      val1: driverA.podiums,
      val2: driverB.podiums,
    },
    {
      label: lang === "zh" ? "杆位 (Poles)" : "Poles",
      val1: driverA.poles,
      val2: driverB.poles,
    },
    {
      label: lang === "zh" ? "最快圈 (FL)" : "Fastest Laps",
      val1: driverA.fastest_laps,
      val2: driverB.fastest_laps,
    },
    {
      label: lang === "zh" ? "生涯积分 (Points)" : "Points",
      val1: driverA.points,
      val2: driverB.points,
    }
  ] : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-zinc-800 pb-6 space-y-2">
        <div className="flex items-center space-x-2">
          <Badge variant="era">{lang === "zh" ? "跨时代对比竞技场" : "HEAD-TO-HEAD ARENA"}</Badge>
          <span className="text-xs font-mono text-zinc-400">2000–2025 Multi-Metric Radar</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white uppercase font-mono">
          {t("compare.title")}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-3xl leading-relaxed">
          {t("compare.subtitle")}
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="drivers" className="space-y-6">
        <TabsList className="bg-[#111116] p-1 rounded-xl border border-zinc-800">
          <TabsTrigger value="drivers">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>{t("compare.driverVsDriver")}</span>
          </TabsTrigger>
          <TabsTrigger value="teams">
            <Shield className="w-3.5 h-3.5 text-red-500" />
            <span>{t("compare.teamVsTeam")}</span>
          </TabsTrigger>
          <TabsTrigger value="seasons">
            <Calendar className="w-3.5 h-3.5 text-purple-400" />
            <span>{t("compare.seasonVsSeason")}</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Driver vs Driver */}
        <TabsContent value="drivers" className="space-y-6">
          {/* Selectors Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#111116] p-4 rounded-xl border border-zinc-800">
            <div>
              <label className="text-xs font-semibold text-red-400 uppercase tracking-wider block mb-1.5">
                {lang === "zh" ? "选择车手 A" : "Select Driver A"}
              </label>
              <select
                value={driverAId}
                onChange={(e) => setDriverAId(e.target.value)}
                className="w-full bg-[#16161d] border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-red-500"
              >
                {drivers.map((d) => (
                  <option key={d.driver_id} value={d.driver_id}>
                    {dName(d)} ({natName(d)}) — {d.wins} {lang === "zh" ? "胜" : "Wins"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-blue-400 uppercase tracking-wider block mb-1.5">
                {lang === "zh" ? "选择车手 B" : "Select Driver B"}
              </label>
              <select
                value={driverBId}
                onChange={(e) => setDriverBId(e.target.value)}
                className="w-full bg-[#16161d] border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-blue-500"
              >
                {drivers.map((d) => (
                  <option key={d.driver_id} value={d.driver_id}>
                    {dName(d)} ({natName(d)}) — {d.wins} {lang === "zh" ? "胜" : "Wins"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Comparison Cards & Radar */}
          {driverA && driverB && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Driver A Card */}
              <div className="lg:col-span-4 bg-[#101015] border-2 border-red-500/40 rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-zinc-900 border border-zinc-700 flex-shrink-0">
                    {driverA.image ? (
                      <Image
                        src={driverA.image}
                        alt={driverA.full_name}
                        fill
                        sizes="80px"
                        className="object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs font-mono text-zinc-600">
                        {driverA.code}
                      </div>
                    )}
                  </div>
                  <div>
                    <Badge variant="gold" className="text-[10px]">DRIVER A</Badge>
                    <h3 className="text-xl font-bold text-white mt-1">
                      <Link href={`/driver/${driverA.driver_id}`} className="hover:text-red-400">
                        {dName(driverA)}
                      </Link>
                    </h3>
                    <div className="text-xs text-zinc-400">{natName(driverA)}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800 font-mono text-xs">
                  <div className="bg-[#15151c] p-2.5 rounded-lg border border-zinc-800">
                    <span className="text-zinc-500 text-[10px] block">{t("driver.titles")}</span>
                    <span className="text-amber-400 font-bold text-base">{driverA.championships}</span>
                  </div>
                  <div className="bg-[#15151c] p-2.5 rounded-lg border border-zinc-800">
                    <span className="text-zinc-500 text-[10px] block">{t("driver.wins")}</span>
                    <span className="text-red-400 font-bold text-base">{driverA.wins}</span>
                  </div>
                  <div className="bg-[#15151c] p-2.5 rounded-lg border border-zinc-800">
                    <span className="text-zinc-500 text-[10px] block">{t("driver.podiums")}</span>
                    <span className="text-zinc-200 font-bold text-base">{driverA.podiums}</span>
                  </div>
                  <div className="bg-[#15151c] p-2.5 rounded-lg border border-zinc-800">
                    <span className="text-zinc-500 text-[10px] block">{t("driver.poles")}</span>
                    <span className="text-zinc-200 font-bold text-base">{driverA.poles}</span>
                  </div>
                  <div className="bg-[#15151c] p-2.5 rounded-lg border border-zinc-800">
                    <span className="text-zinc-500 text-[10px] block">{t("driver.fls")}</span>
                    <span className="text-purple-400 font-bold text-base">{driverA.fastest_laps}</span>
                  </div>
                  <div className="bg-[#15151c] p-2.5 rounded-lg border border-zinc-800">
                    <span className="text-zinc-500 text-[10px] block">{t("driver.points")}</span>
                    <span className="text-emerald-400 font-bold text-base">{formatPoints(driverA.points)}</span>
                  </div>
                </div>
              </div>

              {/* Radar Chart (Center) */}
              <div className="lg:col-span-4 bg-[#101015] border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
                <div className="text-center">
                  <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                    {t("compare.radarTitle")}
                  </h4>
                  <div className="flex items-center justify-center space-x-4 text-xs font-mono mt-2">
                    <span className="text-red-400 flex items-center space-x-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                      <span>{dName(driverA)}</span>
                    </span>
                    <span className="text-blue-400 flex items-center space-x-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
                      <span>{dName(driverB)}</span>
                    </span>
                  </div>
                </div>

                <div className="py-2">
                  <RadarComparisonChart
                    name1={dName(driverA)}
                    name2={dName(driverB)}
                    metrics={radarMetrics}
                  />
                </div>
              </div>

              {/* Driver B Card */}
              <div className="lg:col-span-4 bg-[#101015] border-2 border-blue-500/40 rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-zinc-900 border border-zinc-700 flex-shrink-0">
                    {driverB.image ? (
                      <Image
                        src={driverB.image}
                        alt={driverB.full_name}
                        fill
                        sizes="80px"
                        className="object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs font-mono text-zinc-600">
                        {driverB.code}
                      </div>
                    )}
                  </div>
                  <div>
                    <Badge variant="outline" className="text-[10px] text-blue-400 border-blue-500/40">
                      DRIVER B
                    </Badge>
                    <h3 className="text-xl font-bold text-white mt-1">
                      <Link href={`/driver/${driverB.driver_id}`} className="hover:text-blue-400">
                        {dName(driverB)}
                      </Link>
                    </h3>
                    <div className="text-xs text-zinc-400">{natName(driverB)}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800 font-mono text-xs">
                  <div className="bg-[#15151c] p-2.5 rounded-lg border border-zinc-800">
                    <span className="text-zinc-500 text-[10px] block">{t("driver.titles")}</span>
                    <span className="text-amber-400 font-bold text-base">{driverB.championships}</span>
                  </div>
                  <div className="bg-[#15151c] p-2.5 rounded-lg border border-zinc-800">
                    <span className="text-zinc-500 text-[10px] block">{t("driver.wins")}</span>
                    <span className="text-red-400 font-bold text-base">{driverB.wins}</span>
                  </div>
                  <div className="bg-[#15151c] p-2.5 rounded-lg border border-zinc-800">
                    <span className="text-zinc-500 text-[10px] block">{t("driver.podiums")}</span>
                    <span className="text-zinc-200 font-bold text-base">{driverB.podiums}</span>
                  </div>
                  <div className="bg-[#15151c] p-2.5 rounded-lg border border-zinc-800">
                    <span className="text-zinc-500 text-[10px] block">{t("driver.poles")}</span>
                    <span className="text-zinc-200 font-bold text-base">{driverB.poles}</span>
                  </div>
                  <div className="bg-[#15151c] p-2.5 rounded-lg border border-zinc-800">
                    <span className="text-zinc-500 text-[10px] block">{t("driver.fls")}</span>
                    <span className="text-purple-400 font-bold text-base">{driverB.fastest_laps}</span>
                  </div>
                  <div className="bg-[#15151c] p-2.5 rounded-lg border border-zinc-800">
                    <span className="text-zinc-500 text-[10px] block">{t("driver.points")}</span>
                    <span className="text-emerald-400 font-bold text-base">{formatPoints(driverB.points)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        {/* Tab 2: Team vs Team */}
        <TabsContent value="teams" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#111116] p-4 rounded-xl border border-zinc-800">
            <div>
              <label className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-1.5">
                {lang === "zh" ? "选择车队 A" : "Select Constructor A"}
              </label>
              <select
                value={teamAId}
                onChange={(e) => setTeamAId(e.target.value)}
                className="w-full bg-[#16161d] border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
              >
                {teams.map((tItem) => (
                  <option key={tItem.constructor_id} value={tItem.constructor_id}>
                    {tName(tItem)} ({natName(tItem)}) — {tItem.wins} {lang === "zh" ? "胜" : "Wins"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block mb-1.5">
                {lang === "zh" ? "选择车队 B" : "Select Constructor B"}
              </label>
              <select
                value={teamBId}
                onChange={(e) => setTeamBId(e.target.value)}
                className="w-full bg-[#16161d] border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-cyan-500"
              >
                {teams.map((tItem) => (
                  <option key={tItem.constructor_id} value={tItem.constructor_id}>
                    {tName(tItem)} ({natName(tItem)}) — {tItem.wins} {lang === "zh" ? "胜" : "Wins"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {teamA && teamB && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#101015] border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center space-x-3">
                  <span
                    className="w-3.5 h-3.5 rounded-full inline-block"
                    style={{ backgroundColor: getTeamColor(teamA.constructor_id) }}
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      <Link href={`/team/${teamA.constructor_id}`} className="hover:text-red-400">
                        {tName(teamA)}
                      </Link>
                    </h3>
                    <div className="text-xs text-zinc-400">{natName(teamA)} • {teamA.headquarters}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-zinc-800 font-mono text-xs">
                  <div className="bg-[#15151c] p-3 rounded-lg border border-zinc-800">
                    <span className="text-zinc-500 text-[10px] block">{t("driver.titles")}</span>
                    <span className="text-amber-400 font-bold text-lg">{teamA.championships}</span>
                  </div>
                  <div className="bg-[#15151c] p-3 rounded-lg border border-zinc-800">
                    <span className="text-zinc-500 text-[10px] block">{t("driver.wins")}</span>
                    <span className="text-red-400 font-bold text-lg">{teamA.wins}</span>
                  </div>
                  <div className="bg-[#15151c] p-3 rounded-lg border border-zinc-800">
                    <span className="text-zinc-500 text-[10px] block">{t("driver.podiums")}</span>
                    <span className="text-zinc-200 font-bold text-lg">{teamA.podiums}</span>
                  </div>
                  <div className="bg-[#15151c] p-3 rounded-lg border border-zinc-800">
                    <span className="text-zinc-500 text-[10px] block">{t("driver.poles")}</span>
                    <span className="text-zinc-200 font-bold text-lg">{teamA.poles}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#101015] border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center space-x-3">
                  <span
                    className="w-3.5 h-3.5 rounded-full inline-block"
                    style={{ backgroundColor: getTeamColor(teamB.constructor_id) }}
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      <Link href={`/team/${teamB.constructor_id}`} className="hover:text-red-400">
                        {tName(teamB)}
                      </Link>
                    </h3>
                    <div className="text-xs text-zinc-400">{natName(teamB)} • {teamB.headquarters}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-zinc-800 font-mono text-xs">
                  <div className="bg-[#15151c] p-3 rounded-lg border border-zinc-800">
                    <span className="text-zinc-500 text-[10px] block">{t("driver.titles")}</span>
                    <span className="text-amber-400 font-bold text-lg">{teamB.championships}</span>
                  </div>
                  <div className="bg-[#15151c] p-3 rounded-lg border border-zinc-800">
                    <span className="text-zinc-500 text-[10px] block">{t("driver.wins")}</span>
                    <span className="text-red-400 font-bold text-lg">{teamB.wins}</span>
                  </div>
                  <div className="bg-[#15151c] p-3 rounded-lg border border-zinc-800">
                    <span className="text-zinc-500 text-[10px] block">{t("driver.podiums")}</span>
                    <span className="text-zinc-200 font-bold text-lg">{teamB.podiums}</span>
                  </div>
                  <div className="bg-[#15151c] p-3 rounded-lg border border-zinc-800">
                    <span className="text-zinc-500 text-[10px] block">{t("driver.poles")}</span>
                    <span className="text-zinc-200 font-bold text-lg">{teamB.poles}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        {/* Tab 3: Season vs Season */}
        <TabsContent value="seasons" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#111116] p-4 rounded-xl border border-zinc-800">
            <div>
              <label className="text-xs font-semibold text-purple-400 uppercase tracking-wider block mb-1.5">
                {lang === "zh" ? "选择赛季 A" : "Select Season A"}
              </label>
              <select
                value={seasonAYear}
                onChange={(e) => setSeasonAYear(e.target.value)}
                className="w-full bg-[#16161d] border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-purple-500"
              >
                {seasons.map((s) => (
                  <option key={s.season} value={String(s.season)}>
                    {s.season} {lang === "zh" ? "赛季" : "Season"} ({s.total_grands_prix} GPs)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-1.5">
                {lang === "zh" ? "选择赛季 B" : "Select Season B"}
              </label>
              <select
                value={seasonBYear}
                onChange={(e) => setSeasonBYear(e.target.value)}
                className="w-full bg-[#16161d] border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500"
              >
                {seasons.map((s) => (
                  <option key={s.season} value={String(s.season)}>
                    {s.season} {lang === "zh" ? "赛季" : "Season"} ({s.total_grands_prix} GPs)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {seasonA && seasonB && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#101015] border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold font-mono text-white">
                    <Link href={`/season/${seasonA.season}`} className="hover:text-red-400">
                      {seasonA.season} {t("season.seasonDossier")}
                    </Link>
                  </h3>
                  <Badge variant="era">{seasonA.engine_era}</Badge>
                </div>

                <div className="space-y-2 text-xs font-mono text-zinc-300">
                  <div className="bg-[#15151c] p-3 rounded-lg border border-zinc-800">
                    <div className="text-zinc-500 text-[10px] font-sans">{t("season.wdc")}</div>
                    <div className="font-bold text-amber-400 text-sm mt-0.5">
                      🏆 {dName(seasonA.drivers_champion)} ({seasonA.drivers_champion?.wins ?? 0} {lang === "zh" ? "胜" : "wins"})
                    </div>
                  </div>
                  <div className="bg-[#15151c] p-3 rounded-lg border border-zinc-800">
                    <div className="text-zinc-500 text-[10px] font-sans">{t("season.wcc")}</div>
                    <div className="font-bold text-zinc-200 text-sm mt-0.5">
                      🏎️ {tName(seasonA.constructors_champion)}
                    </div>
                  </div>
                  <div className="bg-[#15151c] p-3 rounded-lg border border-zinc-800">
                    <div className="text-zinc-500 text-[10px] font-sans">{t("season.pointSystem")}</div>
                    <div className="text-zinc-300 mt-0.5">{seasonA.point_system_rule}</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#101015] border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold font-mono text-white">
                    <Link href={`/season/${seasonB.season}`} className="hover:text-red-400">
                      {seasonB.season} {t("season.seasonDossier")}
                    </Link>
                  </h3>
                  <Badge variant="era">{seasonB.engine_era}</Badge>
                </div>

                <div className="space-y-2 text-xs font-mono text-zinc-300">
                  <div className="bg-[#15151c] p-3 rounded-lg border border-zinc-800">
                    <div className="text-zinc-500 text-[10px] font-sans">{t("season.wdc")}</div>
                    <div className="font-bold text-amber-400 text-sm mt-0.5">
                      🏆 {dName(seasonB.drivers_champion)} ({seasonB.drivers_champion?.wins ?? 0} {lang === "zh" ? "胜" : "wins"})
                    </div>
                  </div>
                  <div className="bg-[#15151c] p-3 rounded-lg border border-zinc-800">
                    <div className="text-zinc-500 text-[10px] font-sans">{t("season.wcc")}</div>
                    <div className="font-bold text-zinc-200 text-sm mt-0.5">
                      🏎️ {tName(seasonB.constructors_champion)}
                    </div>
                  </div>
                  <div className="bg-[#15151c] p-3 rounded-lg border border-zinc-800">
                    <div className="text-zinc-500 text-[10px] font-sans">{t("season.pointSystem")}</div>
                    <div className="text-zinc-300 mt-0.5">{seasonB.point_system_rule}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
