"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Trophy,
  Shield,
  MapPin,
  Gauge,
  Calendar,
  ChevronRight,
  TrendingUp,
  ArrowUpRight,
  Award,
  Zap,
  Activity
} from "lucide-react";
import { SeasonSummary, Driver, Team, Circuit } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { useLanguage } from "@/lib/i18n";
import { getTeamColor } from "@/lib/utils";

export default function HomePage() {
  const { lang, t, dName, tName } = useLanguage();
  const [seasons, setSeasons] = useState<SeasonSummary[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [circuits, setCircuits] = useState<Circuit[]>([]);

  useEffect(() => {
    fetch("/data/seasons.json")
      .then((res) => res.json())
      .then((d) => setSeasons(d))
      .catch((e) => console.error(e));

    fetch("/data/drivers.json")
      .then((res) => res.json())
      .then((d) => setDrivers(d))
      .catch((e) => console.error(e));

    fetch("/data/teams.json")
      .then((res) => res.json())
      .then((d) => setTeams(d))
      .catch((e) => console.error(e));

    fetch("/data/circuits.json")
      .then((res) => res.json())
      .then((d) => setCircuits(d))
      .catch((e) => console.error(e));
  }, []);

  const topChampions = drivers
    .filter((d) => d.championships > 0)
    .sort((a, b) => b.championships - a.championships || b.wins - a.wins);

  const eras = [
    {
      title: lang === "zh" ? "3.0L V10 引擎时代" : "3.0L V10 Era",
      years: "2000–2005",
      desc: lang === "zh"
        ? "高转速高亢的 3.0 升 V10 发动机，动力超过 900 匹马力。舒马赫与法拉利王朝统治，随后阿隆索与雷诺崛起。"
        : "High-revving screaming V10s producing over 900 bhp. Schumacher & Ferrari dominance followed by Alonso's rise.",
      championCount: lang === "zh" ? "6 届世界冠军" : "6 Titles",
      sampleYear: 2004,
      accent: "border-red-800/40 bg-red-950/10"
    },
    {
      title: lang === "zh" ? "2.4L V8 与 KERS 时代" : "2.4L V8 & KERS Era",
      years: "2006–2013",
      desc: lang === "zh"
        ? "发动机性能趋于均等化，双层扩散器、废气扩散器技术争鸣，维特尔与红牛车队实现四连冠伟业。"
        : "Equalized engines, customer chassis debates, double diffusers, blown diffusers, and Vettel's 4-peat with Red Bull.",
      championCount: lang === "zh" ? "8 届世界冠军" : "8 Titles",
      sampleYear: 2012,
      accent: "border-amber-800/40 bg-amber-950/10"
    },
    {
      title: lang === "zh" ? "1.6L V6 涡轮混动时代" : "1.6L V6 Turbo Hybrid",
      years: "2014–2021",
      desc: lang === "zh"
        ? "MGU-K 与 MGU-H 双重能量回收混动总成。梅赛德斯车队创下史无前例的连续 8 届制造车队世界冠军。"
        : "Ultra-efficient MGU-K and MGU-H power units. Unprecedented 8 consecutive constructors' titles for Mercedes.",
      championCount: lang === "zh" ? "8 届世界冠军" : "8 Titles",
      sampleYear: 2021,
      accent: "border-cyan-800/40 bg-cyan-950/10"
    },
    {
      title: lang === "zh" ? "地面效应气动新规时代" : "Ground Effect Aerodynamics",
      years: "2022–2025",
      desc: lang === "zh"
        ? "文丘里通道地面效应设计、18寸轮毂与预算帽均势。马克斯·维斯塔潘破纪录统治与迈凯伦2024重夺王座。"
        : "Venturi tunnels, 18-inch wheels, and budget cap parity. Max Verstappen's record-breaking seasons & McLaren's 2024 crown.",
      championCount: lang === "zh" ? "4 届世界冠军" : "4 Titles",
      sampleYear: 2024,
      accent: "border-emerald-800/40 bg-emerald-950/10"
    }
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Header Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-800/80 bg-[#09090d] py-12 sm:py-16 racing-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-2.5">
                <span className="bg-red-600 text-white font-black text-xs px-2 py-0.5 rounded tracking-tighter uppercase">
                  FIA Formula 1
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  {lang === "zh" ? "历史遥测与成绩档案馆" : "HISTORICAL TELEMETRY & RESULTS ARCHIVE"}
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase font-mono">
                {t("home.title")} <span className="text-red-500 text-2xl sm:text-4xl">2000—2025</span>
              </h1>
              <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
                {t("home.desc")}
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-2.5">
              <Link
                href="/statistics"
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-xs font-semibold tracking-wide border border-zinc-700 transition-colors flex items-center space-x-1.5"
              >
                <TrendingUp className="w-4 h-4 text-red-400" />
                <span>{t("home.allRecords")}</span>
              </Link>
              <Link
                href="/compare"
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-semibold tracking-wide transition-colors flex items-center space-x-1.5 shadow-lg shadow-red-900/30"
              >
                <Zap className="w-4 h-4" />
                <span>{t("home.compareAction")}</span>
              </Link>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-10">
            <div className="bg-[#121217]/90 border border-zinc-800/80 rounded-lg p-3.5 flex flex-col">
              <div className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                {t("home.statSeasons")}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-zinc-100 font-mono mt-1">
                26
              </div>
              <div className="text-[10px] text-zinc-500 mt-1">{t("home.statSeasonsSub")}</div>
            </div>

            <div className="bg-[#121217]/90 border border-zinc-800/80 rounded-lg p-3.5 flex flex-col">
              <div className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                {t("home.statGPs")}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-zinc-100 font-mono mt-1">
                491
              </div>
              <div className="text-[10px] text-zinc-500 mt-1">{t("home.statGPsSub")}</div>
            </div>

            <div className="bg-[#121217]/90 border border-zinc-800/80 rounded-lg p-3.5 flex flex-col">
              <div className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                {t("home.statDrivers")}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-zinc-100 font-mono mt-1">
                {drivers.length || 129}
              </div>
              <div className="text-[10px] text-zinc-500 mt-1">{t("home.statDriversSub")}</div>
            </div>

            <div className="bg-[#121217]/90 border border-zinc-800/80 rounded-lg p-3.5 flex flex-col">
              <div className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                {t("home.statConstructors")}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-zinc-100 font-mono mt-1">
                {teams.length || 38}
              </div>
              <div className="text-[10px] text-zinc-500 mt-1">{t("home.statConstructorsSub")}</div>
            </div>

            <div className="bg-[#121217]/90 border border-zinc-800/80 rounded-lg p-3.5 flex flex-col col-span-2 sm:col-span-1">
              <div className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                {t("home.statCircuits")}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-zinc-100 font-mono mt-1">
                {circuits.length || 38}
              </div>
              <div className="text-[10px] text-zinc-500 mt-1">{t("home.statCircuitsSub")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Season Explorer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-bold text-zinc-100 uppercase tracking-wide">
              {t("home.seasonExplorer")}
            </h2>
          </div>
          <span className="text-xs text-zinc-400">{t("home.seasonExplorerSub")}</span>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-4 pt-1 scrollbar-thin">
          {seasons.map((s) => {
            const dChamp = s.drivers_champion;
            const cChamp = s.constructors_champion;
            return (
              <Link
                key={s.season}
                href={`/season/${s.season}`}
                className="group flex-shrink-0 bg-[#111116] hover:bg-[#181820] border border-zinc-800/90 hover:border-red-500/60 rounded-lg p-3 w-36 transition-all duration-150 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-base font-extrabold font-mono text-zinc-100 group-hover:text-red-400">
                    {s.season}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    {s.total_grands_prix} {lang === "zh" ? "站" : "GPs"}
                  </span>
                </div>
                <div className="mt-3 pt-2 border-t border-zinc-800/80">
                  <div className="text-[11px] font-semibold text-zinc-300 truncate">
                    🏆 {dName(dChamp)}
                  </div>
                  <div className="text-[10px] text-zinc-400 truncate mt-0.5">
                    🏎️ {tName(cChamp)}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. Engine Eras */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-zinc-100 uppercase tracking-wide flex items-center space-x-2">
            <Activity className="w-5 h-5 text-red-500" />
            <span>{t("home.erasTitle")}</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1">{t("home.erasSub")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {eras.map((era) => (
            <Card key={era.title} glow className={`p-5 flex flex-col justify-between ${era.accent}`}>
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-xs font-mono text-zinc-400">{era.years}</span>
                  <Badge variant="era">{era.championCount}</Badge>
                </div>
                <h3 className="text-base font-bold text-zinc-100 mt-2">{era.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mt-2">{era.desc}</p>
              </div>
              <div className="mt-5 pt-3 border-t border-zinc-800/80 flex justify-between items-center">
                <Link
                  href={`/season/${era.sampleYear}`}
                  className="text-xs font-medium text-red-400 hover:text-red-300 flex items-center space-x-1"
                >
                  <span>{lang === "zh" ? `浏览 ${era.sampleYear} 赛季` : `Explore ${era.sampleYear} Season`}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. Champions Hall of Fame */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-zinc-100 uppercase tracking-wide flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>{t("home.championsTitle")}</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-1">{t("home.championsSub")}</p>
          </div>
          <Link
            href="/statistics"
            className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center space-x-1"
          >
            <span>{t("home.allRankings")}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {topChampions.slice(0, 5).map((champ) => {
            return (
              <Link
                key={champ.driver_id}
                href={`/driver/${champ.driver_id}`}
                className="group bg-[#111116] hover:bg-[#171720] border border-zinc-800 hover:border-amber-500/50 rounded-xl p-4 transition-all duration-150 flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-zinc-900 mb-3 border border-zinc-800">
                    {champ.image ? (
                      <Image
                        src={champ.image}
                        alt={champ.full_name}
                        fill
                        sizes="(max-width: 768px) 50vw, 20vw"
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-700 font-mono text-2xl">
                        {champ.code || "F1"}
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm border border-amber-500/40 rounded px-1.5 py-0.5 text-[11px] font-bold text-amber-300 font-mono">
                      {champ.championships}× {lang === "zh" ? "世界冠军" : "WDC"}
                    </div>
                  </div>

                  <h3 className="font-bold text-sm text-zinc-100 group-hover:text-amber-400 transition-colors">
                    {dName(champ)}
                  </h3>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    {lang === "zh" ? champ.nationality_cn || champ.nationality : champ.nationality}
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-zinc-800/80 grid grid-cols-3 gap-1 text-center font-mono">
                  <div>
                    <div className="text-[10px] text-zinc-500">{lang === "zh" ? "胜场" : "WINS"}</div>
                    <div className="text-xs font-bold text-zinc-200">{champ.wins}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500">{lang === "zh" ? "领奖台" : "PODIUMS"}</div>
                    <div className="text-xs font-bold text-zinc-200">{champ.podiums}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500">{lang === "zh" ? "杆位" : "POLES"}</div>
                    <div className="text-xs font-bold text-zinc-200">{champ.poles}</div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 5. Quick Links Hub */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/compare"
            className="group bg-[#121217] hover:bg-[#171720] border border-zinc-800 hover:border-red-500/50 rounded-xl p-6 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-red-950/40 border border-red-800/40 flex items-center justify-center text-red-400 mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-zinc-100 group-hover:text-red-400 transition-colors">
                {lang === "zh" ? "车手与车队历史对比竞技场" : "Head-to-Head Arena"}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mt-2">
                {lang === "zh"
                  ? "直接对比舒马赫 vs 阿隆索、汉密尔顿 vs 维斯塔潘、法拉利 vs 迈凯伦等传奇宿敌，呈现多维雷达图与生涯重叠对决。"
                  : "Directly compare legends like Schumacher vs Alonso, Hamilton vs Verstappen, or Ferrari vs McLaren with radar metrics."}
              </p>
            </div>
            <div className="mt-5 text-xs font-semibold text-red-400 flex items-center space-x-1">
              <span>{lang === "zh" ? "进入对比竞技场" : "Launch Arena"}</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </Link>

          <Link
            href="/cars"
            className="group bg-[#121217] hover:bg-[#171720] border border-zinc-800 hover:border-purple-500/50 rounded-xl p-6 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-purple-950/40 border border-purple-800/40 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                <Gauge className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-zinc-100 group-hover:text-purple-400 transition-colors">
                {lang === "zh" ? "275 辆赛车与动力单元档案" : "275 Formula 1 Cars & Engines"}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mt-2">
                {lang === "zh"
                  ? "收录 2000–2025 年间参赛的每一辆 F1 赛车底盘代号、引擎型号、供应商与参赛战绩档案。"
                  : "Detailed technical archive of every chassis, powertrain supplier, and engine configuration between 2000 and 2025."}
              </p>
            </div>
            <div className="mt-5 text-xs font-semibold text-purple-400 flex items-center space-x-1">
              <span>{lang === "zh" ? "浏览赛车底盘库" : "Browse Chassis Catalog"}</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </Link>

          <Link
            href="/circuits"
            className="group bg-[#121217] hover:bg-[#171720] border border-zinc-800 hover:border-emerald-500/50 rounded-xl p-6 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-950/40 border border-emerald-800/40 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                {lang === "zh" ? "38 条世界锦标赛赛道几何" : "38 World Championship Circuits"}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mt-2">
                {lang === "zh"
                  ? "包含赛道矢量线路图、历史改建版本对比、弯道数量、官方最快圈速纪录与历届分站冠军。"
                  : "Interactive track geometry diagrams, historical layout changes, turn counts, and all 491 race winners across each circuit."}
              </p>
            </div>
            <div className="mt-5 text-xs font-semibold text-emerald-400 flex items-center space-x-1">
              <span>{lang === "zh" ? "查看赛道地图" : "Explore Circuit Maps"}</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
