export function CalorieRing({
  current,
  target,
}: {
  current: number;
  target: number;
}) {
  const percentage = Math.round((current / target) * 100);
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center border rounded-xl p-4">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="48"
            cy="48"
            r="45"
            stroke="#E5E7EB"
            strokeWidth="8"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="48"
            cy="48"
            r="45"
            stroke="#FFC107"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xl font-bold text-gray-900">{current}</p>
          <p className="text-[10px] text-gray-400">dari {target}</p>
        </div>
      </div>
      
      <p className="text-xs text-gray-600 mt-3">Kalori (kkal)</p>
    </div>
  );
}