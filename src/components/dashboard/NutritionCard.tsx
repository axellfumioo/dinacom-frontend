export function NutritionCard({
  label,
  value,
  unit,
  target,
  progress,
}: {
  label: string;
  value: number;
  unit: string;
  target: number;
  progress: number;
}) {
  return (
    <div className="border rounded-xl p-5 w-full">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-gray-500">{label} ({unit})</p>
        <p className="text-[10px] text-gray-400">/ {target}{unit}</p>
      </div>

      <p className="text-xl font-semibold mb-2">
        {value}
        <span className="text-xs text-gray-400 ml-1">{unit}</span>
      </p>

      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-yellow-400 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
