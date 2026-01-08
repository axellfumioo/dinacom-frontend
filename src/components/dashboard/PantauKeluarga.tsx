import { Users, Settings } from "lucide-react";

export function PantauKeluargaCard() {
  const familyMembers = [
    { name: "Raffi", status: "Iaki - Iaki - Sehat", initial: "R", color: "bg-blue-500" },
    { name: "Viona", status: "Perempuan - Perlu Perhatian", initial: "V", color: "bg-pink-500" }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-base font-bold text-gray-900">Pantau Keluarga</h3>
        </div>
        <button className="w-8 h-8 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors">
          <Settings className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      <div className="space-y-3">
        {familyMembers.map((member, index) => (
          <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
            <div className={`w-10 h-10 ${member.color} rounded-full flex items-center justify-center text-white font-bold`}>
              {member.initial}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">{member.name}</p>
              <p className="text-xs text-gray-500">{member.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}