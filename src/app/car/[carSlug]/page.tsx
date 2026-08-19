import React from "react";
import { notFound } from "next/navigation";
import { getCar, getAllCars } from "@/lib/data-service";
import { CarViewClient } from "@/components/car/CarViewClient";

interface CarPageProps {
  params: Promise<{ carSlug: string }>;
}

export async function generateStaticParams() {
  const cars = getAllCars();
  return cars.map((c) => ({ carSlug: c.slug }));
}

export async function generateMetadata({ params }: CarPageProps) {
  const { carSlug } = await params;
  const car = getCar(carSlug);
  if (!car) return { title: "Car Not Found" };

  return {
    title: `${car.team_name} ${car.chassis} (${car.year}) — F1 Technical Dossier`,
    description: `Technical specifications and motorsport racing record for the ${car.year} ${car.team_name} ${car.chassis}, powered by ${car.engine_supplier} ${car.engine_model}.`,
    openGraph: {
      title: `${car.team_name} ${car.chassis} (${car.year}) | F1 Archive`,
      description: `Formula 1 chassis dossier for ${car.chassis}.`
    }
  };
}

export default async function CarPage({ params }: CarPageProps) {
  const { carSlug } = await params;
  const car = getCar(carSlug);

  if (!car) {
    notFound();
  }

  return <CarViewClient car={car} />;
}
