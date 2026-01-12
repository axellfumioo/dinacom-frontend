import React from 'react';
import { Scan } from 'lucide-react';

export const ScanMealPrompt = ({ onScan }) => {
  return (
    <div className="p-4 bg-yellow-50 border-2 border-dashed border-yellow-300 rounded-xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">Makan malam</h3>
          <p className="text-sm text-gray-500">Belum sempat makan? Scan mesti yuga bisa</p>
        </div>
        
        <button
          onClick={onScan}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors"
        >
          <Scan className="w-4 h-4" />
          Scan Makanan
        </button>
      </div>
    </div>
  );
};