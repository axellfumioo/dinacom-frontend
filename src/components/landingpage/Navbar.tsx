"use client";

import React from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

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
            className="cursor-pointer text-xl font-semibold text-black"
          >
            NutriOne
          </div>

          {/* Menu */}
          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-black">
            <button className="hover:opacity-80 hover:underline">
              Home
            </button>
            <button className="hover:opacity-80 hover:underline">
              Features
            </button>
            <button className="hover:opacity-80 hover:underline">
              Dashboard
            </button>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            {/* Login */}
            <button
              onClick={() => router.push(authActions.login)}
              className={clsx(
                "border border-black/30",
                "px-5 py-2 rounded-full",
                "text-sm text-black",
                "hover:bg-black/5 hover:border-black/50",
                "transition"
              )}
            >
              Log In
            </button>

            {/* Register */}
            <button
              onClick={() => router.push(authActions.register)}
              className={clsx(
                "bg-black text-white",
                "px-5 py-2 rounded-full",
                "text-sm font-medium",
                "hover:bg-black/90",
                "transition"
              )}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
