"use client";

import React from "react";
import { useRouter } from "next/navigation";
import SplitText from "../../common/reactbits/SplitText";




export default function Hero() {
  const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

  const router = useRouter();
  const authActions = { register: "/auth/register"}

  return (
    <section className="px-4 pt-60">
      <div className="max-w-3xl mx-28 text-left justify-left">

        {/* Heading
        <h1 className="text-black font-extrabold text-4xl md:text-6xl leading-tight mb-6 text-left">
          Cek Nutrisi Lebih Mudah, <br />
          Hidup Lebih Sehat.
        </h1> */}

        <SplitText
          text="Cek Nutrisi Lebih Mudah, Hidup Lebih Sehat."
          className="text-black font-extrabold text-4xl md:text-6xl leading-tight mb-6 text-left"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="left"
          onLetterAnimationComplete={handleAnimationComplete}
        />

        {/* Description */}
        <p className="text-black/80 text-sm md:text-base leading-relaxed text-left font-semibold">
          Yuk, jadi bagian dari <span className="text-[#FFD41D]">#SahabatSehat</span>
        </p>

        <button 
        onClick={() => router.push(authActions.register)}
        className="border border-black rounded-2xl text-white text-sm px-6 py-3 mt-5 bg-black">
            Mulai Sekarang
        </button>

      </div>
    </section>
  );
}
