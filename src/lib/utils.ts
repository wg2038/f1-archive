import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number | string | undefined | null): string {
  if (num === undefined || num === null || num === "") return "N/A";
  const n = typeof num === "string" ? parseFloat(num) : num;
  if (isNaN(n)) return String(num);
  return n.toLocaleString();
}

export function formatPoints(points: number | string | undefined | null): string {
  if (points === undefined || points === null || points === "") return "0";
  const p = typeof points === "string" ? parseFloat(points) : points;
  if (isNaN(p)) return "0";
  return p % 1 === 0 ? p.toString() : p.toFixed(1);
}

// Team primary color mapping for UI accents & charts
export const TEAM_COLORS: Record<string, string> = {
  ferrari: "#ef4444",
  mercedes: "#06b6d4",
  red_bull: "#3b82f6",
  mclaren: "#f97316",
  aston_martin: "#10b981",
  alpine: "#38bdf8",
  williams: "#60a5fa",
  rb: "#6366f1",
  alphatauri: "#94a3b8",
  toro_rosso: "#3b82f6",
  sauber: "#22c55e",
  alfa: "#991b1b",
  haas: "#f43f5e",
  renault: "#eab308",
  brawn: "#a3e635",
  force_india: "#f97316",
  racing_point: "#f472b6",
  lotus_f1: "#eab308",
  bmw_sauber: "#3b82f6",
  toyota: "#ef4444",
  bar: "#a855f7",
  jordan: "#eab308",
  benetton: "#06b6d4",
  jaguar: "#15803d",
  minardi: "#475569",
  prost: "#1d4ed8",
  arrows: "#f97316",
  super_aguri: "#dc2626",
  spyker: "#ea580c",
  caterham: "#16a34a",
  marussia: "#b91c1c",
  manor: "#dc2626",
  virgin: "#ef4444",
  hrt: "#ca8a04"
};

export function getTeamColor(constructorId: string | undefined): string {
  if (!constructorId) return "#71717a";
  const key = constructorId.toLowerCase().replace(/-/g, "_");
  return TEAM_COLORS[key] || "#71717a";
}

// Nationality to ISO flag code / country name helper
export const NATIONALITY_MAP: Record<string, string> = {
  German: "DE",
  British: "GB",
  Dutch: "NL",
  Spanish: "ES",
  Finnish: "FI",
  Brazilian: "BR",
  French: "FR",
  Italian: "IT",
  Australian: "AU",
  Monegasque: "MC",
  Mexican: "MX",
  Canadian: "CA",
  Japanese: "JP",
  Austrian: "AT",
  Polish: "PL",
  Russian: "RU",
  Colombian: "CO",
  American: "US",
  Swiss: "CH",
  Danish: "DK",
  Thai: "TH",
  Chinese: "CN",
  Argentine: "AR",
  Indian: "IN",
  Swedish: "SE",
  NewZealander: "NZ",
  Venezuelan: "VE",
  Belgian: "BE"
};

export function getCountryCode(nationality: string | undefined): string {
  if (!nationality) return "";
  return NATIONALITY_MAP[nationality] || "";
}
