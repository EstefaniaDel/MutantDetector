'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-900 text-white shadow-lg drop-shadow-[0_0_15px_rgba(0,149,255,0.3)] fixed w-full z-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold">Mutant Detector</span>
          </div>
          <div className="flex space-x-4">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/'
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              DNA Analysis
            </Link>
            <Link
              href="/stats"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/stats'
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Statistics
            </Link>
            <Link
              href="/docs"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/docs'
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Documentation
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
