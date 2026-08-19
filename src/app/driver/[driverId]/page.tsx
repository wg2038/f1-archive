import React from "react";
import { notFound } from "next/navigation";
import { getDriver, getAllDrivers } from "@/lib/data-service";
import { DriverViewClient } from "@/components/driver/DriverViewClient";

interface DriverPageProps {
  params: Promise<{ driverId: string }>;
}

export async function generateStaticParams() {
  const drivers = getAllDrivers();
  return drivers.map((d) => ({ driverId: d.driver_id }));
}

export async function generateMetadata({ params }: DriverPageProps) {
  const { driverId } = await params;
  const driver = getDriver(driverId);
  if (!driver) return { title: "Driver Not Found" };

  return {
    title: `${driver.full_name} (${driver.name_cn || ""}) — F1 Career Statistics`,
    description: `Complete 2000–2025 Formula 1 career statistics for ${driver.full_name} (${driver.nationality}). ${driver.championships} World Championships, ${driver.wins} Wins.`,
    openGraph: {
      title: `${driver.full_name} | F1 Archive`,
      description: `Formula 1 telemetry and race archive for ${driver.full_name}.`
    }
  };
}

export default async function DriverPage({ params }: DriverPageProps) {
  const { driverId } = await params;
  const driver = getDriver(driverId);

  if (!driver) {
    notFound();
  }

  return <DriverViewClient driver={driver} />;
}
