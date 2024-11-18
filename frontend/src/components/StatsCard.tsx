'use client';

import { useEffect } from 'react';

interface Stats {
  count_mutant_dna: number;
  count_human_dna: number;
  ratio: number;
}

interface StatsCardProps {
  stats: Stats | null;
  onRefresh: () => void;
}

export function StatsCard({ stats, onRefresh }: StatsCardProps) {
  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">DNA Analysis Statistics</h2>
        <button
          onClick={onRefresh}
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          ↻ Refresh Stats
        </button>
      </div>

      {stats ? (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-900/50 p-6 rounded-lg border border-blue-900/50">
              <p className="text-blue-400 text-sm font-medium mb-1">Mutants Detected</p>
              <p className="text-4xl font-bold text-white">{stats.count_mutant_dna}</p>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-lg border border-green-900/50">
              <p className="text-green-400 text-sm font-medium mb-1">Humans Detected</p>
              <p className="text-4xl font-bold text-white">{stats.count_human_dna}</p>
            </div>
          </div>
          <div className="bg-gray-900/50 p-6 rounded-lg border border-purple-900/50">
            <p className="text-purple-400 text-sm font-medium mb-1">Mutant Ratio</p>
            <p className="text-4xl font-bold text-white">
              {(stats.ratio * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-40">
          <div className="animate-pulse text-gray-400">Loading statistics...</div>
        </div>
      )}
    </div>
  );
}
