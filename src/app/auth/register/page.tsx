"use client";

import React from "react";
import { Mail, Lock, UserPlus, Calendar, Users, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { registerValidate } from "@/common/validation/authValidate";
import FieldInfo from "@/components/FieldInfo";
import { useRegister } from "@/hooks/AuthHook";

export default function RegisterPage() {
  const router = useRouter();

  const { mutate: registerUser, isPending } = useRegister()

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone_number: "",
      date_of_birth: "",
      gender: "",
    },
    validators: {
      onChange: registerValidate,
    },
    onSubmit: async ({ value }) => {
      registerUser(value);
    },
  });

  return (
<div className="min-h-screen bg-gray-50 overflow-y-auto">
  <div className="flex items-start justify-center px-4 py-10">
    <div className="w-full max-w-md bg-white border border-gray-50 shadow-sm rounded-2xl p-6 ">
          <h1 className="text-2xl font-semibold text-gray-900 text-center">
            Buat akun Anda
          </h1>

          <form
            className="mt-8 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            {/* NAME */}
            <form.Field name="name">
              {(field) => (
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Nama
                  </label>
                  <div className="relative">
                    <UserPlus className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      className="w-full pl-10 pr-3 py-2.5 rounded-md border border-gray-300 focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 transition bg-white"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="Budi"
                    />
                  <FieldInfo field={field} />

                  </div>
                </div>
              )}
            </form.Field>

            {/* EMAIL */}
            <form.Field name="email">
              {(field) => (
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      className="w-full pl-10 pr-3 py-2.5 rounded-md border border-gray-300 focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 transition bg-white"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="budi@gmail.com"
                    />
<FieldInfo field={field} />

                  </div>
                </div>
              )}
            </form.Field>

            {/* PASSWORD */}
            <form.Field name="password">
              {(field) => (
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Kata Sandi
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      className="w-full pl-10 pr-3 py-2.5 rounded-md border border-gray-300 focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 transition bg-white"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="******"
                    />
                                        <FieldInfo field={field} />

                  </div>
                </div>
              )}
            </form.Field>

            {/* PHONE */}
            <form.Field name="phone_number">
              {(field) => (
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Nomor Telepon
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      className="w-full pl-10 pr-3 py-2.5 rounded-md border border-gray-300 focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 transition bg-white"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="08xxxxxxxxxx"
                    />
                                        <FieldInfo field={field} />

                  </div>
                </div>
              )}
            </form.Field>

            {/* DATE */}
            <form.Field name="date_of_birth">
              {(field) => (
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Tanggal Lahir
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-3 py-2.5 rounded-md border border-gray-300 focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 transition bg-white"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                                        <FieldInfo field={field} />

                  </div>
                </div>
              )}
            </form.Field>

            {/* GENDER */}
            <form.Field name="gender">
              {(field) => (
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Jenis Kelamin
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 z-10" />
                    <select
                      className="w-full pl-10 pr-3 py-2.5 rounded-md border border-gray-300 focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 transition bg-white appearance-none"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    >
                      <option value="">-- Pilih --</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                                        <FieldInfo field={field} />

                  </div>
                </div>
              )}
            </form.Field>

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md text-white bg-yellow-500 hover:bg-yellow-600 transition font-medium shadow-sm disabled:opacity-50"
            >
              {isPending ? "Mendaftar..." : "Daftar"}
            </button>
          </form>

          {/* Divider (sama seperti Login) */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">atau</span>
            </div>
          </div>

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
