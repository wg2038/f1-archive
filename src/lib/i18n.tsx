"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "zh";

export const UI_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    "nav.seasons": "Seasons",
    "nav.drivers": "Drivers",
    "nav.teams": "Constructors",
    "nav.cars": "Chassis & Cars",
    "nav.circuits": "Circuits",
    "nav.statistics": "Statistics",
    "nav.compare": "Compare",
    "nav.sources": "Sources",
    "nav.search": "Search database...",

    // Homepage
    "home.badge": "FIA Formula 1 Historical Archive",
    "home.title": "F1 ARCHIVE",
    "home.subtitle": "2000 — 2025 Formula 1 Historical Telemetry Database",
    "home.desc": "Precision historical database of the modern era. Browse every Grand Prix, session timing, driver telemetry, technical regulation, and championship battle across 26 seasons.",
    "home.allRecords": "All-Time Records",
    "home.compareAction": "Compare Drivers & Teams",
    "home.statSeasons": "Seasons",
    "home.statGPs": "Grands Prix",
    "home.statDrivers": "Unique Drivers",
    "home.statConstructors": "Constructors",
    "home.statCircuits": "Circuits",
    "home.statSeasonsSub": "2000 — 2025 Complete",
    "home.statGPsSub": "100% Calendar Coverage",
    "home.statDriversSub": "Global driver_id Index",
    "home.statConstructorsSub": "Chassis & Lineages",
    "home.statCircuitsSub": "With Historic Layouts",
    "home.seasonExplorer": "Season Explorer",
    "home.seasonExplorerSub": "Scroll horizontally or select year",
    "home.erasTitle": "Formula 1 Engine & Technical Eras (2000–2025)",
    "home.erasSub": "Explore regulation transitions, powertrain architectures, and championship cycles.",
    "home.exploreSeason": "Explore Season",
    "home.championsTitle": "World Champions (2000–2025 Era)",
    "home.championsSub": "Drivers who claimed the FIA Formula One World Drivers' Championship in this epoch.",
    "home.allRankings": "All Rankings",
    "home.wins": "Wins",
    "home.podiums": "Podiums",
    "home.poles": "Poles",
    "home.points": "Points",

    // Season Page
    "season.seasonDossier": "SEASON",
    "season.wdc": "World Drivers' Champion",
    "season.wcc": "World Constructors' Champion",
    "season.regulations": "Regulations & Scoring Rules",
    "season.pointSystem": "Points System",
    "season.flRule": "Fastest Lap Rule",
    "season.sprintFormat": "Sprint Format",
    "season.progression": "Championship Points Progression",
    "season.progressionSub": "Race-by-race cumulative points battle across the season.",
    "season.selectDrivers": "Select Drivers:",
    "season.driverStandings": "World Drivers' Championship Standings",
    "season.constructorStandings": "Constructors Standings",
    "season.calendar": "Grand Prix Calendar & Race Classifications",
    "season.calendarSub": "Click any Grand Prix to view full session telemetry (FP1, FP2, FP3, Qualifying, Sprint & Race).",
    "season.chassisGrid": "Chassis & Powertrain Grid",
    "season.chassisGridSub": "Technical specifications of all participating constructors and engine suppliers.",
    "season.viewSeason": "View Season",
    "season.results": "Results",

    // Table Headers
    "th.pos": "Pos",
    "th.driver": "Driver",
    "th.team": "Team",
    "th.constructor": "Constructor",
    "th.points": "Points",
    "th.wins": "Wins",
    "th.podiums": "Podiums",
    "th.poles": "Poles",
    "th.fl": "FL",
    "th.round": "Round",
    "th.gp": "Grand Prix",
    "th.circuit": "Circuit",
    "th.date": "Date",
    "th.winner": "Winner",
    "th.pole": "Pole Position",
    "th.grid": "Grid",
    "th.laps": "Laps",
    "th.timeStatus": "Time / Status",
    "th.hub": "Hub",
    "th.bestLap": "Best Lap",

    // Race Page
    "race.backSeason": "Back to Season",
    "race.classification": "Official Race Classification",
    "race.qualifying": "Official Qualifying Classification",
    "race.sprint": "Sprint Race Classification",
    "race.practice": "Practice",
    "race.fastestLap": "Fastest Lap",
    "race.starters": "Starters",
    "race.poleSitter": "Pole Position",
    "race.lapTime": "Lap Time",
    "race.avgSpeed": "Average Speed",
    "race.flBonus": "Bonus Point Rule",

    // Driver Page
    "driver.allDrivers": "All Drivers & Records",
    "driver.titles": "TITLES",
    "driver.wins": "WINS",
    "driver.podiums": "PODIUMS",
    "driver.poles": "POLES",
    "driver.fls": "FASTEST LAPS",
    "driver.points": "POINTS",
    "driver.seasonTrend": "Season-by-Season Performance Trend",
    "driver.seasonTrendSub": "Championship points (bars) vs Final Standings Position (line) across active seasons.",
    "driver.recordsTitle": "Complete Season Records (2000–2025)",

    // Team Page
    "team.allTeams": "All Constructors & Records",
    "team.lineage": "Lineage",
    "team.activeSeasons": "Seasons Active",
    "team.roster": "Historical Drivers Roster (2000–2025)",

    // Compare Page
    "compare.title": "Formula 1 Historical Comparison",
    "compare.subtitle": "Directly compare legendary drivers, rival constructors, and historic championship seasons with multi-dimensional radar telemetry and head-to-head metrics.",
    "compare.driverVsDriver": "Driver vs Driver",
    "compare.teamVsTeam": "Team vs Team",
    "compare.seasonVsSeason": "Season vs Season",
    "compare.radarTitle": "Comparative Radar Telemetry",

    // Statistics Page
    "stats.title": "Formula 1 All-Time Statistics",
    "stats.subtitle": "Comprehensive benchmark records across the V10, V8 KERS, V6 Turbo Hybrid, and Ground Effect regulatory epochs.",
    "stats.drivers": "Driver Leaderboards",
    "stats.constructors": "Constructor Records",
    "stats.dominant": "Most Dominant Seasons",
    "stats.winRate": "Win Rate %",

    // Sources
    "sources.title": "Data Sources & Regulatory Lineage",
    "sources.subtitle": "The F1 Archive strictly adheres to verified official data provenance. All race classifications, session telemetry, engine codes, and historical rules are verified across Tier 1, Tier 2, and Tier 3 sources.",
    "sources.primaryTitle": "Primary Sources & Telemetry Repositories",
    "sources.regulationsTitle": "FIA Historical Regulations & Scoring Epochs",
    "sources.licensingTitle": "Visual Media Licensing & Copyright Notices",

    // General
    "lang.toggle": "中文",
    "lang.current": "English"
  },
  zh: {
    // Nav
    "nav.seasons": "赛季一览",
    "nav.drivers": "车手档案",
    "nav.teams": "车队档案",
    "nav.cars": "赛车与底盘",
    "nav.circuits": "赛道地图",
    "nav.statistics": "历史纪录",
    "nav.compare": "对比竞技场",
    "nav.sources": "数据来源",
    "nav.search": "搜索数据库...",

    // Homepage
    "home.badge": "FIA 一级方程式历史档案馆",
    "home.title": "F1 档案库",
    "home.subtitle": "2000 — 2025 F1 历史数据与遥测成绩数据库",
    "home.desc": "现代 F1 核心历史数据平台。收录 26 个赛季全部分站大奖赛、练习赛、排位赛、冲刺赛、正赛圈速、车手积分与技术规则演进。",
    "home.allRecords": "历史纪录榜",
    "home.compareAction": "车手与车队对比",
    "home.statSeasons": "历史赛季",
    "home.statGPs": "分站大奖赛",
    "home.statDrivers": "登场车手",
    "home.statConstructors": "制造车队",
    "home.statCircuits": "大奖赛赛道",
    "home.statSeasonsSub": "2000 — 2025 完整收录",
    "home.statGPsSub": "100% 完整赛历覆盖",
    "home.statDriversSub": "全唯一 driver_id 索引",
    "home.statConstructorsSub": "底盘配置与血统传承",
    "home.statCircuitsSub": "含历史布局改建演变",
    "home.seasonExplorer": "赛季探索器",
    "home.seasonExplorerSub": "横向滚动或点击年份进入赛季详情",
    "home.erasTitle": "F1 动力单元与技术规则时代 (2000–2025)",
    "home.erasSub": "探索发动机架构演进、空气动力学革命与王朝更迭。",
    "home.exploreSeason": "浏览该赛季",
    "home.championsTitle": "世界冠军名人堂 (2000–2025 时代)",
    "home.championsSub": "在 2000–2025 时代斩获 FIA F1 世界车手年度总冠军的传奇名将。",
    "home.allRankings": "查看完整排行榜",
    "home.wins": "胜场",
    "home.podiums": "领奖台",
    "home.poles": "杆位",
    "home.points": "积分",

    // Season Page
    "season.seasonDossier": "赛季",
    "season.wdc": "年度车手世界总冠军",
    "season.wcc": "年度车队世界总冠军",
    "season.regulations": "技术规程与积分规则",
    "season.pointSystem": "积分体系",
    "season.flRule": "最快圈规则",
    "season.sprintFormat": "冲刺赛制",
    "season.progression": "赛季积分走势折线图",
    "season.progressionSub": "整赛季逐站累计积分争夺走势。",
    "season.selectDrivers": "筛选车手：",
    "season.driverStandings": "世界车手年度积分榜",
    "season.constructorStandings": "制造车队年度积分榜",
    "season.calendar": "分站赛历与大奖赛成绩",
    "season.calendarSub": "点击任意分站查看完整比赛遥测（练习赛 FP1/2/3、排位赛、冲刺赛、正赛）。",
    "season.chassisGrid": "参赛赛车与发动机矩阵",
    "season.chassisGridSub": "该赛季所有参赛车队底盘型号与动力单元供应商规格。",
    "season.viewSeason": "查看赛季",
    "season.results": "成绩详情",

    // Table Headers
    "th.pos": "排名",
    "th.driver": "车手",
    "th.team": "车队",
    "th.constructor": "车队",
    "th.points": "积分",
    "th.wins": "胜场",
    "th.podiums": "领奖台",
    "th.poles": "杆位",
    "th.fl": "最快圈",
    "th.round": "分站",
    "th.gp": "大奖赛",
    "th.circuit": "赛道",
    "th.date": "比赛日期",
    "th.winner": "正赛冠军",
    "th.pole": "杆位获得者",
    "th.grid": "发车位",
    "th.laps": "圈数",
    "th.timeStatus": "完赛时间 / 状态",
    "th.hub": "分站详情",
    "th.bestLap": "最快圈速",

    // Race Page
    "race.backSeason": "返回赛季",
    "race.classification": "官方正赛最终排名",
    "race.qualifying": "官方排位赛最终成绩",
    "race.sprint": "冲刺赛最终成绩",
    "race.practice": "自由练习赛",
    "race.fastestLap": "全场最快圈速",
    "race.starters": "位正赛发车车手",
    "race.poleSitter": "杆位发车",
    "race.lapTime": "圈速时间",
    "race.avgSpeed": "平均时速",
    "race.flBonus": "积分奖励规则",

    // Driver Page
    "driver.allDrivers": "全部车手与纪录",
    "driver.titles": "总冠军",
    "driver.wins": "胜场",
    "driver.podiums": "领奖台",
    "driver.poles": "杆位",
    "driver.fls": "最快圈",
    "driver.points": "生涯积分",
    "driver.seasonTrend": "历年赛季表现与积分趋势",
    "driver.seasonTrendSub": "参赛赛季年度积分（柱状）与年度车手排名（折线）对照。",
    "driver.recordsTitle": "2000–2025 赛季完整成绩单",

    // Team Page
    "team.allTeams": "全部车队与纪录",
    "team.lineage": "车队血统",
    "team.activeSeasons": "参赛赛季",
    "team.roster": "历史车手阵容 (2000–2025)",

    // Compare Page
    "compare.title": "F1 历史对比竞技场",
    "compare.subtitle": "直接对比传奇车手、宿敌车队与经典赛季，通过多维雷达遥测图与生涯重叠数据深度洞察。",
    "compare.driverVsDriver": "车手对比 (Driver vs Driver)",
    "compare.teamVsTeam": "车队对比 (Team vs Team)",
    "compare.seasonVsSeason": "赛季对比 (Season vs Season)",
    "compare.radarTitle": "多维对比雷达图",

    // Statistics Page
    "stats.title": "F1 跨年份历史统计与纪录榜",
    "stats.subtitle": "横跨 V10、V8 KERS、V6 涡轮混动与地面效应四大规程时代的官方纪录全书。",
    "stats.drivers": "车手历史纪录榜",
    "stats.constructors": "车队历史纪录榜",
    "stats.dominant": "单赛季最高统治力榜",
    "stats.winRate": "胜率 %",

    // Sources
    "sources.title": "数据溯源与规程演变",
    "sources.subtitle": "F1 Archive 严格遵循官方认证的一手与二手数据源。所有分站成绩、遥测时间、引擎代码及规则均经过 Tier 1/2/3 交叉验证。",
    "sources.primaryTitle": "核心数据源与数据库",
    "sources.regulationsTitle": "FIA 历史比赛规程与积分时代演进",
    "sources.licensingTitle": "视觉素材授权与版权声明",

    // General
    "lang.toggle": "English",
    "lang.current": "中文"
  }
};

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  toggleLang: () => void;
  t: (key: string) => string;
  // Helpers for entities
  dName: (d: any) => string;
  tName: (t: any) => string;
  cName: (c: any) => string;
  rName: (r: any) => string;
  natName: (n: any) => string;
  statName: (s: any) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("zh"); // Default to Chinese as requested

  useEffect(() => {
    const saved = localStorage.getItem("f1_archive_lang") as Language;
    if (saved === "en" || saved === "zh") {
      setLangState(saved);
    }
  }, []);

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem("f1_archive_lang", l);
  };

  const toggleLang = () => {
    const next = lang === "zh" ? "en" : "zh";
    setLang(next);
  };

  const t = (key: string): string => {
    return UI_TRANSLATIONS[lang][key] || UI_TRANSLATIONS["en"][key] || key;
  };

  const dName = (d: any): string => {
    if (!d) return "N/A";
    if (lang === "zh") {
      return d.name_cn || d.driver_name_cn || d.full_name || d.name || d.driver_name || "N/A";
    }
    return d.full_name || d.driver_name || d.name || d.name_cn || "N/A";
  };

  const tName = (item: any): string => {
    if (!item) return "N/A";
    if (lang === "zh") {
      return item.team_name_cn || item.name_cn || item.team_cn || item.name || item.team_name || item.team || "N/A";
    }
    return item.name || item.team_name || item.team || item.team_name_cn || "N/A";
  };

  const cName = (c: any): string => {
    if (!c) return "N/A";
    if (lang === "zh") {
      return c.name_cn || c.circuitName_cn || c.official_name || c.circuitName || "N/A";
    }
    return c.official_name || c.circuitName || c.name_cn || "N/A";
  };

  const rName = (r: any): string => {
    if (!r) return "N/A";
    if (lang === "zh") {
      return r.race_name_cn || r.race_name || "N/A";
    }
    return r.race_name || r.race_name_cn || "N/A";
  };

  const natName = (n: any): string => {
    if (!n) return "";
    if (typeof n === "string") return n;
    if (lang === "zh") {
      return n.nationality_cn || n.country_cn || n.nationality || n.country || "";
    }
    return n.nationality || n.country || n.nationality_cn || "";
  };

  const statName = (s: any): string => {
    if (!s) return "N/A";
    if (lang === "zh") {
      return s.status_cn || s.status || String(s);
    }
    return s.status || String(s);
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        t,
        dName,
        tName,
        cName,
        rName,
        natName,
        statName
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
