import React from "react";
import { notFound } from "next/navigation";
import { getCircuit, getAllCircuits } from "@/lib/data-service";
import { CircuitViewClient } from "@/components/circuit/CircuitViewClient";

interface CircuitPageProps {
  params: Promise<{ circuitId: string }>;
}

export async function generateStaticParams() {
  const circuits = getAllCircuits();
  return circuits.map((c) => ({ circuitId: c.circuit_id }));
}

export async function generateMetadata({ params }: CircuitPageProps) {
  const { circuitId } = await params;
  const circuit = getCircuit(circuitId);
  if (!circuit) return { title: "Circuit Not Found" };

  return {
    title: `${circuit.official_name} (${circuit.name_cn || ""}) — F1 Track Architecture & History`,
    description: `Track geometry, historical layout evolution, lap records, and 2000–2025 Grand Prix history for ${circuit.official_name} (${circuit.city}, ${circuit.country}).`,
    openGraph: {
      title: `${circuit.official_name} | F1 Archive`,
      description: `Formula 1 circuit profile for ${circuit.official_name}.`
    }
  };
}

export default async function CircuitPage({ params }: CircuitPageProps) {
  const { circuitId } = await params;
  const circuit = getCircuit(circuitId);

  if (!circuit) {
    notFound();
  }

  return <CircuitViewClient circuit={circuit} />;
}
