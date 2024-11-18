'use client';

import { MutantForm } from '@/components/MutantForm';
import Image from "next/image";
import humanMutant from "@/assets/human-mutant.png";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white p-8 pt-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">
            DNA Sequence Analysis
          </h1>
          <p className="text-gray-400">
            Submit a DNA sequence to detect mutant patterns
          </p>
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
        <MutantForm onAnalysisComplete={() => {}} />
      </div>
    </main>
  );
}
