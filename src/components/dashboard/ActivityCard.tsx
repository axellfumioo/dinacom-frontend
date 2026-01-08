import { Flame } from "lucide-react";

export function ActivityCard() {
  return (
    <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">Aktivitas Fisik</h3>
        <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
          <Flame className="w-4 h-4 text-orange-500" />
        </div>
      </div>

      <p className="text-xs text-gray-500 mb-1">Terhubung dengan Strava</p>

      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
          <span className="text-lg">🏃</span>
        </div>
        <div>
          <p className="text-sm font-semibold">Lari Pagi (5K)</p>
          <p className="text-xs text-gray-500">06:30 - 07:15</p>
        </div>
        <div className="ml-auto">
          <p className="text-lg font-bold text-orange-500">345</p>
          <p className="text-[10px] text-gray-400">kkal</p>
        </div>
      </div>

      <div className="pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Target Harian</span>
          <span className="font-semibold text-green-600">85% Tercapai</span>
        </div>
      </div>
    </div>
  );
}