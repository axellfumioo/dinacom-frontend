import { Sparkles } from "lucide-react";

export function AiCard() {
  return (
    <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">Insight AI personal</h3>
        <div className="w-8 h-8 bg-yellow-50 rounded-lg flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-yellow-500" />
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <p className="text-sm text-gray-700 leading-relaxed">
          Dodi, asupan proteinmu pagi ini agak rendah. Coba tambahkan Telur 
          Rebus atau Yoghurt saat makan siang untuk pirmulihan otot yang optimal 
          setelah lari pagi!
        </p>
      </div>
    </div>
  );
}