'use client';

import { useState } from 'react';
import axios from 'axios';

interface MutantFormProps {
  onAnalysisComplete: () => void;
}

export function MutantForm({ onAnalysisComplete }: MutantFormProps) {
  const [dna, setDna] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ message: string; success: boolean } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDna(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const trimmedDna = dna.trim();
      
      if (!trimmedDna) {
        throw new Error('Input cannot be empty. Please provide a JSON array of strings.');
      }

      let parsedDna;
      try {
        parsedDna = JSON.parse(trimmedDna);
      } catch {
        throw new Error('Please enter a valid JSON array of strings.');
      }
      
      if (!Array.isArray(parsedDna) || parsedDna.some(seq => typeof seq !== 'string')) {
        throw new Error('Please enter a valid list format');
      }

      const response = await axios.post('/api/mutant', { dna: parsedDna });

      if (response.status === 200) {
        setResult({
          message: response.data.message || 'Mutant Detected',
          success: true,
        });
      } else if (response.status === 403) {
        setResult({
          message: response.data.message || 'Not a mutant',
          success: false,
        });
      }
      
      onAnalysisComplete();
    } catch (error: unknown) {
      if (error instanceof SyntaxError) {
        setResult({
          message: 'Please enter a valid JSON array of strings.',
          success: false,
        });
      } else {
        setResult({
          message: error instanceof Error ? error.message : 'Error analyzing DNA sequence',
          success: false,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-white">DNA Sequence Analysis</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          value={dna}
          onChange={handleInputChange}
          className="w-full p-3 border bg-gray-700 border-gray-600 rounded text-center text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder='Enter DNA sequences as a JSON array (e.g., ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"])'
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            loading
              ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {loading ? 'Analyzing...' : 'Analyze DNA'}
        </button>
        
        {result && (
          <div
            className={`mt-6 p-4 rounded-lg ${
              result.success 
                ? 'bg-green-900/50 text-green-300 border border-green-700' 
                : 'bg-red-900/50 text-red-300 border border-red-700'
            }`}
          >
            {result.message}
          </div>
        )}
      </form>
    </div>
  );
}
