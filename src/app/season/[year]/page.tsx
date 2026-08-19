import React from "react";
import { notFound } from "next/navigation";
import { getSeason, getAllSeasons } from "@/lib/data-service";
import { SeasonViewClient } from "@/components/season/SeasonViewClient";

interface SeasonPageProps {
  params: Promise<{ year: string }>;
}

export async function generateStaticParams() {
  const seasons = getAllSeasons();
  return seasons.map((s) => ({ year: String(s.season) }));
}

export async function generateMetadata({ params }: SeasonPageProps) {
  const { year } = await params;
  const season = getSeason(year);
  if (!season) return { title: "Season Not Found" };

  const dChamp = season.drivers_champion?.name || "F1";
  const cChamp = season.constructors_champion?.team_name || "F1";

  return {
    title: `${year} Formula 1 Season Summary & Results`,
    description: `Complete historical telemetry, race classifications, driver & constructor standings for the ${year} FIA Formula 1 World Championship. Champion: ${dChamp} (${cChamp}).`,
    openGraph: {
      title: `${year} Formula 1 Season | F1 Archive`,
      description: `${season.total_grands_prix} Grands Prix, ${season.total_drivers} Drivers, ${season.total_constructors} Constructors. Champion: ${dChamp}.`
    }
  };
}

export default async function SeasonPage({ params }: SeasonPageProps) {
  const { year } = await params;
  const season = getSeason(year);

  if (!season) {
    notFound();
  }

  return <SeasonViewClient season={season} />;
}
