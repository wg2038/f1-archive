import fs from "fs";
import path from "path";
import {
  SeasonSummary,
  SeasonDetail,
  Driver,
  Team,
  Circuit,
  Car,
  StatisticsData,
  SearchSummary,
  Race
} from "./types";

const DATA_DIR = path.join(process.cwd(), "public/data");

// In-memory cache for speed
let cachedSeasonsSummary: SeasonSummary[] | null = null;
let cachedDrivers: Driver[] | null = null;
let cachedTeams: Team[] | null = null;
let cachedCircuits: Circuit[] | null = null;
let cachedCars: Car[] | null = null;
let cachedStats: StatisticsData | null = null;
let cachedSearch: SearchSummary | null = null;
const seasonDetailCache = new Map<number, SeasonDetail>();

function readJsonFile<T>(relPath: string): T | null {
  try {
    const fullPath = path.join(DATA_DIR, relPath);
    if (!fs.existsSync(fullPath)) return null;
    const content = fs.readFileSync(fullPath, "utf-8");
    return JSON.parse(content) as T;
  } catch (err) {
    console.error(`Error reading JSON file ${relPath}:`, err);
    return null;
  }
}

export function getAllSeasons(): SeasonSummary[] {
  if (cachedSeasonsSummary) return cachedSeasonsSummary;
  const data = readJsonFile<SeasonSummary[]>("seasons.json");
  if (data) {
    cachedSeasonsSummary = data.sort((a, b) => b.season - a.season);
    return cachedSeasonsSummary;
  }
  return [];
}

export function getSeason(year: number | string): SeasonDetail | null {
  const y = typeof year === "string" ? parseInt(year, 10) : year;
  if (seasonDetailCache.has(y)) {
    return seasonDetailCache.get(y)!;
  }
  const data = readJsonFile<SeasonDetail>(`seasons/${y}.json`);
  if (data) {
    seasonDetailCache.set(y, data);
    return data;
  }
  return null;
}

export function getAllDrivers(): Driver[] {
  if (cachedDrivers) return cachedDrivers;
  const data = readJsonFile<Driver[]>("drivers.json");
  if (data) {
    cachedDrivers = data;
    return cachedDrivers;
  }
  return [];
}

export function getDriver(id: string): Driver | null {
  const drivers = getAllDrivers();
  const lower = id.toLowerCase();
  return drivers.find(d => d.driver_id.toLowerCase() === lower) || null;
}

export function getAllTeams(): Team[] {
  if (cachedTeams) return cachedTeams;
  const data = readJsonFile<Team[]>("teams.json");
  if (data) {
    cachedTeams = data.sort((a, b) => b.points - a.points);
    return cachedTeams;
  }
  return [];
}

export function getTeam(id: string): Team | null {
  const teams = getAllTeams();
  const lower = id.toLowerCase();
  return teams.find(t => t.constructor_id.toLowerCase() === lower) || null;
}

export function getAllCircuits(): Circuit[] {
  if (cachedCircuits) return cachedCircuits;
  const data = readJsonFile<Circuit[]>("circuits.json");
  if (data) {
    cachedCircuits = data.sort((a, b) => b.total_grands_prix - a.total_grands_prix);
    return cachedCircuits;
  }
  return [];
}

export function getCircuit(id: string): Circuit | null {
  const circuits = getAllCircuits();
  const lower = id.toLowerCase();
  return circuits.find(c => c.circuit_id.toLowerCase() === lower) || null;
}

export function getAllCars(): Car[] {
  if (cachedCars) return cachedCars;
  const data = readJsonFile<Car[]>("cars.json");
  if (data) {
    cachedCars = data.sort((a, b) => b.year - a.year);
    return cachedCars;
  }
  return [];
}

export function getCar(slug: string): Car | null {
  const cars = getAllCars();
  const lower = slug.toLowerCase();
  return cars.find(c => c.slug.toLowerCase() === lower) || null;
}

export function getRace(year: number | string, raceSlugOrRound: string): { race: Race; season: SeasonDetail } | null {
  const season = getSeason(year);
  if (!season || !season.races) return null;
  const lower = raceSlugOrRound.toLowerCase();
  
  const race = season.races.find(r => 
    r.race_slug.toLowerCase() === lower || 
    String(r.round) === lower ||
    r.circuit?.circuitId?.toLowerCase() === lower
  );

  if (!race) return null;
  return { race, season };
}

export function getStatistics(): StatisticsData | null {
  if (cachedStats) return cachedStats;
  const data = readJsonFile<StatisticsData>("statistics.json");
  if (data) {
    cachedStats = data;
    return cachedStats;
  }
  return null;
}

export function getSearchSummary(): SearchSummary {
  if (cachedSearch) return cachedSearch;
  const data = readJsonFile<SearchSummary>("summary.json");
  if (data) {
    cachedSearch = data;
    return cachedSearch;
  }
  return { drivers: [], teams: [], circuits: [], cars: [], seasons: [] };
}

export function getSources() {
  const sources = readJsonFile<any[]>("sources.json") || [];
  const imageSources = readJsonFile<any>("image_sources.json") || {};
  return { sources, imageSources };
}

export function getDriverComparison(id1: string, id2: string) {
  const d1 = getDriver(id1);
  const d2 = getDriver(id2);
  if (!d1 || !d2) return null;

  // Calculate common seasons
  const s1 = new Set(d1.seasons);
  const commonSeasons = d2.seasons.filter(y => s1.has(y)).sort((a, b) => a - b);

  return {
    driver1: d1,
    driver2: d2,
    commonSeasons
  };
}

export function getTeamComparison(id1: string, id2: string) {
  const t1 = getTeam(id1);
  const t2 = getTeam(id2);
  if (!t1 || !t2) return null;

  const s1 = new Set(t1.active_seasons);
  const commonSeasons = t2.active_seasons.filter(y => s1.has(y)).sort((a, b) => a - b);

  return {
    team1: t1,
    team2: t2,
    commonSeasons
  };
}

export function getSeasonComparison(year1: number | string, year2: number | string) {
  const s1 = getSeason(year1);
  const s2 = getSeason(year2);
  if (!s1 || !s2) return null;

  return {
    season1: s1,
    season2: s2
  };
}
