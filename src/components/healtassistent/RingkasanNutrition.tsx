import { Droplets, Moon, Lightbulb } from "lucide-react";

export function NutritionSummary() {
  const nutritionData = [
    {
      label: "Kalori",
      value: 1250,
      unit: "kkal",
      color: "bg-yellow-100"
    },
    {
      label: "Protein",
      value: 45,
      unit: "g",
      color: "bg-orange-100"
    },
    {
      label: "Langkah",
      value: 4500,
      unit: "",
      color: "bg-blue-100"
    }
  ];

  const healthTips = [
    {
      icon: <Droplets className="w-5 h-5 text-blue-500" />,
      title: "Hidrasi Penting",
      description: "Cuaca panas hari ini, usahakan minum 2 gelas air lagi sebelum jam 2 siang.",
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
      {/* Ringkasan Nutrisi */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {nutritionData.map((item, index) => (
          <div
            key={index}
            className={`p-5 rounded-2xl border border-gray-200 flex flex-col items-start gap-2 ${item.color}`}
          >
            <span className="text-sm font-medium text-gray-700">{item.label}</span>
            <span className="text-lg font-bold text-gray-900">
              {item.value.toLocaleString()} {item.unit}
            </span>
          </div>
        ))}
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
