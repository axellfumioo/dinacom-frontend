"use client";

import React from "react";

export default function Hero() {
  return (
    <section className="px-4 pt-60">
      <div className="max-w-5xl mx-auto text-center">

        {/* Heading */}
        <h1 className="text-white font-extrabold text-4xl md:text-6xl leading-tight mb-6">
          Pendamping Nutrisi & <br />
          Kesehatan Terpadu
        </h1>

        {/* Description */}
        <p className="text-white/80 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
          Pantau nutrisi harian, aktivitas fisik, dan konsultasi dengan dokter
          secara praktis melalui satu platform kesehatan digital berbasis
          kecerdasan buatan.
        </p>

      </div>
    </section>
  );
}
