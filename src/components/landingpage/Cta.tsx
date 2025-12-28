"use client";

import { useRouter } from 'next/navigation';
import React from 'react';

export default function Cta() {

      const router = useRouter();
      const authActions = { register: "/auth/register"}

  return (
    <div className="p-20 -mt-28">
      <div className="relative rounded-3xl max-w-5xl mx-auto overflow-hidden">
        {/* Background kuning */}
        <div className="bg-yellow-400 rounded-2xl px-8 py-16 md:px-16 md:py-20 relative">
          

          {/* Content */}
          <div className="relative z-10 text-center">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
              Budayakan Hidup Sehat Dengan Jadi<br />
              Bagian Dari #SahabatSehat.
            </h2>
            
            <button 
            onClick={() => router.push(authActions.register)}
            className="bg-white text-yellow-500 font-bold text-lg md:text-xl px-8 py-4 rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-2xs">
              Mulai Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}