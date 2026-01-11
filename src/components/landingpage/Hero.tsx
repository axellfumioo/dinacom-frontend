"use client";

import React from "react";
import SplitText from "../../common/reactbits/SplitText";

export default function Hero() {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <section className="px-4 pt-60">

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 hover:shadow-md transition">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-400 text-white text-sm">
            ✨
          </span>
          <span className="font-semibold text-gray-900 text-sm">
            AI Nutrition
          </span>
        </button>

        <SplitText
          text="Cek Nutrisi Lebih Mudah, Hidup Lebih Sehat."
          className="text-black font-extrabold font-serif text-4xl md:text-6xl leading-tight mb-6 text-center"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          onLetterAnimationComplete={handleAnimationComplete}
        />

        <p className="text-black/80 text-sm md:text-base leading-relaxed font-semibold">
          NutriOne membantu menganalisis asupan makanan, aktivitas, dan
          kebiasaan harianmu secara otomatis, sehingga kamu dapat memahami
          kebutuhan nutrisi tubuh dengan lebih akurat.
        </p>
      </div>
    </section>
  );
}
