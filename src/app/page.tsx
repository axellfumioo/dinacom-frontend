import React from 'react';
import Section1 from '@/components/landingpage/section1';
import Section2 from '@/components/landingpage/section2';
import Section3 from '@/components/landingpage/section3';
import Footer from '@/components/ui/Footer';

export default function Home() {
  return (
    <div>
      <Section1 />
      <Section2 />
      <Section3 />
      <Footer />
    </div>
  );
}
