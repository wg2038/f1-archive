import React from "react";
import { notFound } from "next/navigation";
import { getTeam, getAllTeams } from "@/lib/data-service";
import { TeamViewClient } from "@/components/team/TeamViewClient";

interface TeamPageProps {
  params: Promise<{ teamId: string }>;
}

export async function generateStaticParams() {
  const teams = getAllTeams();
  return teams.map((t) => ({ teamId: t.constructor_id }));
}

export async function generateMetadata({ params }: TeamPageProps) {
  const { teamId } = await params;
  const team = getTeam(teamId);
  if (!team) return { title: "Team Not Found" };

  return {
    title: `${team.name} — F1 Constructor Profile & History (2000–2025)`,
    description: `Complete historical racing archive for ${team.name} (${team.nationality}). ${team.championships} Constructors' Titles, ${team.wins} Race Wins, ${team.podiums} Podiums.`,
    openGraph: {
      title: `${team.name} | F1 Archive`,
      description: `Formula 1 constructor profile and telemetry for ${team.name}.`
    }
  };
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { teamId } = await params;
  const team = getTeam(teamId);

  if (!team) {
    notFound();
  }

  return <TeamViewClient team={team} />;
}
