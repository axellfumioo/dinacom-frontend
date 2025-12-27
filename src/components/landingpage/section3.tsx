import React from 'react';

export default function NutriOneSection() {
  return (
    <section className="min-h-screen bg-white p-20 px-4 mt-28">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            NutriOne, Sahabat Sehatmu.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Kami bantu kamu ngatur nutrisi, pantau olahraga, hingga konsultasi dokter dalam
            satu akses. Semua yang kamu butuhkan untuk jadi lebih sehat, kini lebih simpel.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* NutriScan Feature */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4h4m0 0v4M4 4l5 5m11-5h-4m0 0v4m4-4l-5 5M4 20h4m0 0v-4M4 20l5-5m11 5h-4m0 0v-4m4 4l-5-5"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">NutriScan</h3>
            <p className="text-gray-600 leading-relaxed">
              Foto makananmu, dan AI NutriOne akan langsung menganalisis kandungan nutrisinya
              secara instan.
            </p>
          </div>

          {/* Konsultasi Feature */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Konsultasi</h3>
            <p className="text-gray-600 leading-relaxed">
              Hubungi ahli gizi profesional secara langsung melalui NutriOne. Gak perlu antre di
              rumah sakit.
            </p>
          </div>

          {/* Integrasi Strava Feature */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Integrasi Strava</h3>
            <p className="text-gray-600 leading-relaxed">
              Hubungkan Strava kamu untuk catat aktivitas secara otomatis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}