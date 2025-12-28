"use client";
import { useRef } from "react";
import Navbar from "@/components/landingpage/Navbar";
import Section1 from "@/components/landingpage/Section1";
import Section2 from "@/components/landingpage/Section2";
import Section3 from "@/components/landingpage/Section3";
import Footer from '@/components/ui/Footer';
import Section4 from "./Section4";


export default function LandingPage() {
  const section1Ref = useRef<HTMLElement>(null);
  const section2Ref = useRef<HTMLElement>(null);
  const section3Ref = useRef<HTMLElement>(null);

  return (
    <>
      <Navbar
        onSection1={() => section1Ref.current?.scrollIntoView({ behavior: "smooth" })}
        onSection2={() => section2Ref.current?.scrollIntoView({ behavior: "smooth" })}
        onSection3={() => section3Ref.current?.scrollIntoView({ behavior: "smooth" })}
      />

      <section ref={section1Ref}><Section1 /></section>
      <section ref={section2Ref}><Section2 /></section>
      <section ref={section3Ref}><Section3 /></section>
      <Section4 />
    </>
  );
}
