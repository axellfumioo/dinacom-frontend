export function ActivityCard() {
  return (
    <div className="rounded-xl bg-white border border-yellow-400 p-6 h-32">
      <h3 className="text-sm font-semibold mb-3">Aktivitas Fisik</h3>

      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500">Kalori Terbakar</p>
          <p className="text-lg font-semibold">350 kcal</p>
        </div>

        <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full">
          65% tercapai
        </span>
      </div>
    </div>
  );
}
