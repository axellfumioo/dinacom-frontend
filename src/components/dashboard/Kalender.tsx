import { ChevronLeft, ChevronRight } from "lucide-react";

export function CalendarCard() {
  const daysOfWeek = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  const today = 20;
  
  // December 2025 calendar data
  const calendarDays = [
    // Week 1
    { date: null, isToday: false },
    { date: 1, isToday: false },
    { date: 2, isToday: false },
    { date: 3, isToday: false },
    { date: 4, isToday: false },
    { date: 5, isToday: false },
    { date: 6, isToday: false },
    // Week 2
    { date: 7, isToday: false },
    { date: 8, isToday: false },
    { date: 9, isToday: false },
    { date: 10, isToday: false },
    { date: 11, isToday: false },
    { date: 12, isToday: false },
    { date: 13, isToday: false },
    // Week 3
    { date: 14, isToday: false },
    { date: 15, isToday: false },
    { date: 16, isToday: false },
    { date: 17, isToday: false },
    { date: 18, isToday: false },
    { date: 19, isToday: false },
    { date: 20, isToday: true },
    // Week 4
    { date: 21, isToday: false },
    { date: 22, isToday: false },
    { date: 23, isToday: false },
    { date: 24, isToday: false },
    { date: 25, isToday: false },
    { date: 26, isToday: false },
    { date: 27, isToday: false },
    // Week 5
    { date: 28, isToday: false },
    { date: 29, isToday: false },
    { date: 30, isToday: false },
    { date: 31, isToday: false },
    { date: null, isToday: false },
    { date: null, isToday: false },
    { date: null, isToday: false },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold text-gray-900">Desember 2025</h3>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors">
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button className="w-8 h-8 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors">
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`
              aspect-square flex items-center justify-center text-sm rounded-lg cursor-pointer transition-colors
              ${!day.date ? "invisible" : ""}
              ${day.isToday 
                ? "bg-yellow-400 text-gray-900 font-bold hover:bg-yellow-500" 
                : "text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            {day.date}
          </div>
        ))}
      </div>
    </div>
  );
}