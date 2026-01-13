"use client";

import React from "react";
import CountUp from "../../common/reactbits/CountUp";

export default function Section2() {
  return (
<section className="relative min-h-screen snap-start flex flex-col items-center justify-center bg-yellow-section z-0 pt-28">

      <h1 className="text-black font-bold text-4xl text-center">
         <span> 
        <CountUp
        from={0}
        to={130000000}
        separator=","
        direction="up"
        duration={1}
        className="count-up-text"
      />
      </span> orang di Indonesia
        <br />
        memiliki masalah berat badan.
      </h1>
      <p className="text-black font-semibold text-center mt-3">Data Olahan SKI 2023, 
        Kementrian Kesehatan RI</p>
    </section>
  );
}

