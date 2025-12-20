"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const authActions = {
    login: "/auth/login",
    register: "/auth/register",
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-transparent">
      <div className="mx-auto max-w-7xl px-8 py-6">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <div
            onClick={() => router.push("/")}
            className="text-white text-xl font-semibold cursor-pointer"
          >
            NutriOne
          </div>

          {/* Menu */}
          <div className="hidden md:flex items-center gap-10 text-white text-sm font-medium">
            <button className="hover:opacity-80">Home</button>
            <button className="hover:opacity-80">Features</button>
            <button className="hover:opacity-80">Dashboard</button>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push(authActions.login)}
              className="border border-white/60 text-white px-5 py-2 rounded-full text-sm hover:bg-white hover:text-black transition"
            >
              Log In
            </button>

            <button
              onClick={() => router.push(authActions.register)}
              className="bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition"
            >
              Register
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}
