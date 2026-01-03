"use client";

import { useState } from "react";
import { Mail, Lock, UserPlus, Calendar, Users } from "lucide-react";
import { useRouter } from "next/router";
import toast from "toastify";
import { authService } from "@/services/AuthService";

interface FormData {
  name: string;
  email: string;
  password: string;
  date_of_birdth: string;
  gender: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    date_of_birdth: "",
    gender: ""
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
 
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({...form, [e.target.name]: e.target.value});
  };

  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!form.name || form.name.length < 3) {
      toast.error("Nama harus lebih dari 3");
      return setError("Nama harus lebih dari 3");
    }
    if (!form.email) {
      toast.error("Email harus diisi")
      return setError("Email harus diisi");
    }
    if (!form.password || form.password.length < 6) {
      toast.error("Password harus lebih dari 6")
      return setError("Password lebih dari 6 huruf");
    }
    if (!form.date_of_birdth) {
      toast.error("Tanggal lahir harus diisi")
      return setError("Tanggal lahir harus diisi");
    }
    if (!form.gender) {
      toast.error("Gender harus diisi")
      return setError("Gender harus diisi");
    }

    setLoading(true);

    try {
      await authService.register({
        name: form.name,
        email: form.email,
        password: form.password,
        gender: form.gender,
        date_of_birdth: form.date_of_birdth
      });
      setForm({
        name: "",
        email: "",
        password: "",
        date_of_birdth: "",
        gender: ""
      });
      setTimeout(() => {
        router.push("auth/login?register=true")
      }, 1500); 
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi Kesalahan";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-sm border border-gray-200 rounded-xl px-8 py-10">
          <h1 className="text-2xl font-semibold text-gray-900 text-center">
            Buat akun Anda
          </h1>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* NAME */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Nama</label>
              <div className="relative">
                <UserPlus className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2.5 rounded-md border border-gray-300 focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 transition bg-white"
                  placeholder="Budi"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2.5 rounded-md border border-gray-300 focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 transition bg-white"
                  placeholder="halo@gmail.com"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Kata Sandi</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2.5 rounded-md border border-gray-300 focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 transition bg-white"
                  placeholder="******"
                />
              </div>
            </div>

            {/* DATE OF BIRTH */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Tanggal Lahir</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  name="date_of_birdth"
                  type="date"
                  value={form.date_of_birdth}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2.5 rounded-md border border-gray-300 focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 transition bg-white"
                />
              </div>
            </div>

            {/* GENDER */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Jenis Kelamin</label>
              <div className="relative">
                <Users className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 z-10" />
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2.5 rounded-md border border-gray-300 focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 transition bg-white appearance-none cursor-pointer"
                >
                  <option value="">--Pilih jenis kelamin--</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md text-white bg-yellow-500 hover:bg-yellow-600 transition font-medium shadow-sm"
            >
              {loading ? "Mendaftar..." : "Daftar"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            Sudah punya akun?{" "}
            <button
              onClick={() => router.push("/auth/login")}
              className="text-yellow-500 hover:underline font-medium"
            >
              Login di sini
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}