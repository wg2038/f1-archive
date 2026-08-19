import React from "react";
import { notFound } from "next/navigation";
import { getRace, getAllSeasons, getSeason } from "@/lib/data-service";
import { RaceViewClient } from "@/components/race/RaceViewClient";

interface RacePageProps {
  params: Promise<{ year: string; raceSlug: string }>;
}

export async function generateStaticParams() {
  const seasons = getAllSeasons();
  const paramsList: Array<{ year: string; raceSlug: string }> = [];

  for (const s of seasons) {
    const sDetail = getSeason(s.season);
    if (sDetail && sDetail.races) {
      for (const r of sDetail.races) {
        paramsList.push({
          year: String(s.season),
          raceSlug: r.race_slug
        });
      }
    }
  }
  return paramsList;
}

export async function generateMetadata({ params }: RacePageProps) {
  const { year, raceSlug } = await params;
  const raceData = getRace(year, raceSlug);
  if (!raceData) return { title: "Grand Prix Not Found" };

  const { race } = raceData;
  return {
    title: `${year} ${race.race_name} — Results & Timing Telemetry`,
    description: `Official race results, qualifying classifications, and practice timings for the ${year} ${race.race_name} at ${race.circuit?.circuitName}. Winner: ${race.winner?.name || "F1"}.`,
    openGraph: {
      title: `${year} ${race.race_name} | F1 Archive`,
      description: `Official FIA Formula 1 timing archive for ${year} ${race.race_name}.`
    }
  };
}

export default async function RacePage({ params }: RacePageProps) {
  const { year, raceSlug } = await params;
  const raceData = getRace(year, raceSlug);

  if (!raceData) {
    notFound();
  }

  const { race, season } = raceData;
  return <RaceViewClient race={race} season={season} />;
}
