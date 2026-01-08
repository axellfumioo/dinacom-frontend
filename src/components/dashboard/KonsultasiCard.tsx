import { MessageCircle, Calendar } from "lucide-react";

export function KonsultasiCard() {
  return (
    <div className="bg-yellow-400 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-gray-900" />
        </div>
        <h3 className="text-base font-bold text-gray-900">Konsultasi</h3>
      </div>

      <p className="text-sm text-gray-800 mb-5 leading-relaxed">
        Chat atau video call dengan dokter mengenai penyakit yang sudah 
        didiagnosa oleh AI
      </p>

      <button className="w-full bg-white text-gray-900 py-3 px-4 rounded-xl font-semibold text-sm transition-colors hover:bg-gray-50 flex items-center justify-center gap-2">
        <Calendar className="w-4 h-4" />
        Buat Janji
      </button>
    </div>
  );
}