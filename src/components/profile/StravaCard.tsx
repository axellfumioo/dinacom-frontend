import React from 'react';
import { Activity, RefreshCw } from 'lucide-react';

export const StravaCard = ({ activities, onSync }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      <div className="bg-linear-to-r from-orange-500 to-orange-600 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-orange-500" />
            </div>
            <h2 className="text-xl font-bold text-white">Peforma Strava</h2>
          </div>
          
          <button className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-sm font-medium rounded-lg transition-colors backdrop-blur-sm">
            Hubungkan
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center">
              <div className="text-2xl">✓</div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Import Data Otomatis</h3>
              <p className="text-sm text-gray-500">Terakhir disinkonkan: Hari ini, 08:56 AM</p>
            </div>
          </div>
          
          <button
            onClick={onSync}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Sinkronkan
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-xs text-gray-500 uppercase mb-2">Lari Mingguan</p>
            <p className="text-2xl font-bold text-gray-900">{activities.weekly}</p>
          </div>
          
          <div className="text-center border-x border-gray-100">
            <p className="text-xs text-gray-500 uppercase mb-2">ELV. Gain</p>
            <p className="text-2xl font-bold text-gray-900">{activities.elevation}</p>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-gray-500 uppercase mb-2">Total Kalori</p>
            <p className="text-2xl font-bold text-gray-900">{activities.totalCalories.toLocaleString('id-ID')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};