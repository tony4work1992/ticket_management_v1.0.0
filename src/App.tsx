/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArtifactTable } from './components/ArtifactTable';
import { artifacts } from './data';

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="p-6">
        {/* Header Section */}
        <div className="flex justify-end mb-4">
          <button className="bg-[#134B5F] hover:bg-[#0f3d4d] text-white font-bold py-2 px-8 rounded shadow-sm transition-colors text-sm uppercase tracking-wide">
            Create
          </button>
        </div>

        {/* Table Section */}
        <div className="border border-gray-200 rounded-sm overflow-hidden">
          <ArtifactTable data={artifacts} />
        </div>
      </div>
    </div>
  );
}

