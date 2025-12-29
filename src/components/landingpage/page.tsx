"use client";

import { useRef } from "react";
import Navbar from "@/components/landingpage/Navbar";
import Section1 from "@/components/landingpage/Section1";
import Section2 from "@/components/landingpage/Section2";
import Section3 from "@/components/landingpage/Section3";
import Section4 from "@/components/landingpage/Section4";

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null); // ambil berdasarakan element div

  const scrollToSection = (index: number) => { // menerima parameter index number
    const container = containerRef.current; // container itu element div sekarang
    if (!container) return;

    const section = container.children[index] as HTMLElement; // ambil element div sesuai index
    section?.scrollIntoView({ behavior: "smooth" }); // scroll ke element div
  };

  return (
    <>
      <Navbar onNavigate={scrollToSection} />

      <main
        ref={containerRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
      >
        <section><Section1 /></section>
        <section><Section2 /></section>
        <section><Section3 /></section>
        <section><Section4 /></section>
      </main>
    </>
  );
}
