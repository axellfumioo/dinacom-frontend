"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn } from "lucide-react";
import Image from "next/image";

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Halaman login untuk mengakses fitur dan data yang telah tersimpan.
 *
 * Komponen ini terdiri dari form login yang berisi input email dan password.
 * Ketika tombol login ditekan, maka akan dilakukan simulasi login dan user akan
 * diarahkan ke halaman dashboard.
 *
 * @returns {React.ReactElement} Komponen halaman login.
 */
/*******  2d3a9c01-ac3e-41cd-b981-3053c5f40668  *******/ export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // UI only → simulasi login
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-xl border border-white/20 bg-white/90 backdrop-blur shadow-xl px-8 py-10">
          <h1 className="text-2xl font-semibold text-gray-900 text-center">
            Masuk ke akun Anda
          </h1>

          <form className="mt-6 space-y-5" onSubmit={handleLogin}>
            <div className="text-center">
              <button
                type="button"
                onClick={() => router.push("/auth/register")}
                className="text-sm text-purple-600 hover:underline font-medium"
              >
                Belum punya akun? Daftar di sini
              </button>
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative mt-1">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@domain.com"
                  className="w-full pl-10 pr-3 py-2.5 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Kata Sandi
              </label>
              <div className="relative mt-1">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-2.5 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md text-white bg-purple-600 hover:bg-purple-700 transition font-medium"
            >
              <LogIn className="w-4 h-4" />
              Masuk
            </button>

            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-500">ATAU</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <button
              type="button"
              className="w-full py-2.5 rounded-md border border-gray-300 bg-white hover:bg-gray-50 transition flex items-center justify-center gap-2 text-gray-700 font-medium"
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png"
                alt="Google"
                width={16}
                height={16}
                className="h-4 w-4"
              />
              Lanjutkan dengan Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
