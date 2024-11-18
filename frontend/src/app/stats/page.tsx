"use client";

import { StatsCard } from "@/components/StatsCard";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import humanMutant from "@/assets/human-mutant.png";

export default function StatsPage() {
  const [stats, setStats] = useState<{
    count_mutant_dna: number;
    count_human_dna: number;
    ratio: number;
  } | null>(null);

  const fetchStats = async () => {
    try {
      const response = await axios.get("/api/stats");
      const data = await response.data;
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };
  return (
    <main className="min-h-screen bg-gray-900 pt-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-center gap-12 mb-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">
              DNA Analysis Statistics
            </h1>
            <p className="text-gray-400">
              View the results of all DNA sequence analyses
            </p>
          </div>
        </div>
        <div className="flex justify-center mb-8"> 
          <div className="relative w-40 h-40 transform hover:scale-105 transition-transform duration-300">
            <Image
              src={humanMutant}
              alt="Human and Mutant DNA Comparison"
              width={160}
              height={160}
              className="object-contain drop-shadow-[0_0_15px_rgba(0,149,255,0.3)]"
            />
          </div>
        </div>
        <StatsCard stats={stats} onRefresh={fetchStats} />
      </div>
    </main>
  );
}
