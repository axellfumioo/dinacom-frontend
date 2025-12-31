export function NutritionCard({
  label,
  value,
  unit,
  progress,
}: {
  label: string;
  value: number;
  unit: string;
  progress: number;
}) {
  return (
    <div className="border rounded-lg p-4 w-45">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-semibold text-lg">
        {value}
        <span className="text-xs text-gray-400 ml-1">{unit}</span>
      </p>

      <div className="mt-2 h-1 bg-gray-200 rounded">
        <div
          className="h-1 bg-yellow-400 rounded"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
