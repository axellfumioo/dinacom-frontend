"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function CalendarCard() {
  const daysOfWeek = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  // ambil tanggal sekarang WIB
  const getTodayWIB = () =>
    new Date(
      new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Jakarta",
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }).format(new Date())
    );

  const today = getTodayWIB();

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });

  // jumlah hari dalam bulan
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // hari pertama bulan (0 = Minggu)
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // generate kalender
  const calendarDays = [];

  // kosong sebelum tanggal 1
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }

  // isi tanggal
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const isToday = (day: number) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const prevMonth = () =>
    setCurrentDate(new Date(year, month - 1, 1));

  const nextMonth = () =>
    setCurrentDate(new Date(year, month + 1, 1));

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold text-gray-900 capitalize">
          {monthName}
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="w-8 h-8 hover:bg-gray-100 rounded-lg flex items-center justify-center transition"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={nextMonth}
            className="w-8 h-8 hover:bg-gray-100 rounded-lg flex items-center justify-center transition"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Header hari */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-gray-600 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Kalender */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`
              aspect-square flex items-center justify-center text-sm rounded-lg
              transition cursor-pointer
              ${day === null ? "invisible" : ""}
              ${
                day !== null && isToday(day)
                  ? "bg-yellow-400 text-gray-900 font-bold hover:bg-yellow-500"
                  : "text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
