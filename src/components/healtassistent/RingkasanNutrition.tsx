import { Droplets, Moon, Lightbulb } from "lucide-react";

export function NutritionSummary() {
  const nutritionData = [
    {
      label: "Kalori",
      current: 1250,
      target: 2000,
      unit: "kkal",
      color: "bg-yellow-400"
    },
    {
      label: "Protein",
      current: 45,
      target: 120,
      unit: "g",
      color: "bg-orange-400"
    },
    {
      label: "Langkah",
      current: 4500,
      target: 5000,
      unit: "",
      color: "bg-blue-400"
    }
  ];

  const healthTips = [
    {
      icon: <Droplets className="w-5 h-5 text-blue-500" />,
      title: "Hidrasi Penting",
      description: "Cuaca panas hari ini, Usahakan minum 2 gelas air lagi sebelum jam 2 siang.",
      bgColor: "bg-blue-50"
    },
    {
      icon: <Moon className="w-5 h-5 text-purple-500" />,
      title: "Persiapan Tidur",
      description: "Karena Anda lelah, coba hindari kafein setelah jam 2 siang ini.",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <div className="space-y-4">
      {/* Ringkasan Hari Ini */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-base font-bold text-gray-900 mb-5">Ringkasan hari ini</h3>
        
        <div className="space-y-4">
          {nutritionData.map((item, index) => {
            const percentage = (item.current / item.target) * 100;
            return (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700 font-medium">{item.label}</span>
                  <span className="text-xs text-gray-500">
                    {item.current.toLocaleString()} / {item.target.toLocaleString()} {item.unit}
                  </span>
                </div>
                <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-300`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Health Tips */}
      <div className="space-y-3">
        {healthTips.map((tip, index) => (
          <div key={index} className={`${tip.bgColor} rounded-2xl p-5 border border-gray-200`}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                {tip.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-gray-900 mb-1">{tip.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {tip.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fakta Nutrisi */}
      <div className="bg-yellow-50 rounded-2xl p-5 border border-yellow-200">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-5 h-5 text-gray-900" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-gray-900 mb-1">Fakta Nutrisi</h4>
            <p className="text-xs text-gray-700 leading-relaxed">
              Tahukah Anda? Makan perlahan dapat meningkatkan pencernaan dan membantu Anda merasa kenyang lebih cepat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}