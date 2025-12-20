"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // UI only → simulasi sukses register
    router.push("/auth/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-xl border border-white/20 bg-white/90 backdrop-blur shadow-xl px-8 py-10">

          <h1 className="text-2xl font-semibold text-gray-900 text-center">
            Buat akun Anda
          </h1>

          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            {/* NAME */}
            <div>
              <label className="text-sm font-medium text-gray-700">Nama</label>
              <div className="relative mt-1">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Nama Lengkap"
                  className="w-full pl-10 pr-3 py-2.5 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative mt-1">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
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
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-2.5 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-md text-white bg-purple-600 hover:bg-purple-700 transition font-medium"
            >
              Daftar
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            Sudah punya akun?{" "}
            <button
              onClick={() => router.push("/auth/login")}
              className="text-purple-600 hover:underline font-medium"
            >
              Login di sini
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}
