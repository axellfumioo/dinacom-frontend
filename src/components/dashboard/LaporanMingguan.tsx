import { FileText, Download } from "lucide-react";

export function LaporanCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
          <FileText className="w-5 h-5 text-yellow-600" />
        </div>
        <div>
          <h3 className="text-base font-bold text-gray-900">Laporan Mingguan</h3>
          <p className="text-[10px] text-gray-500">1 - 7 Desember</p>
        </div>
      </div>

      <button className="w-full bg-yellow-400 text-gray-900 py-3 px-4 rounded-xl font-semibold text-sm transition-colors hover:bg-yellow-500 flex items-center justify-center gap-2 cursor-pointer">
        <Download className="w-4 h-4" />
        Unduh PDF
      </button>
    </div>
  );
}