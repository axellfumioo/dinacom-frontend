"use client";

import { authService } from '@/services/AuthService';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null); // bisa string atau null tipenya

    async function handleLogin(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await authService.login({ email, password });
            if (res) {
                router.push("/dashboard");
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Email atau Password salah";
            setError(message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-sm border border-gray-200 rounded-xl px-8 py-10">
                    <h1 className="text-2xl font-semibold text-gray-900 text-center">
                        Masuk ke akun Anda
                    </h1>

                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        {/* EMAIL */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            <div className="relative">
                                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-3 py-2.5 rounded-md border border-gray-300 focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 transition bg-white"
                                    placeholder="budi@gmail.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* PASSWORD */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Kata Sandi</label>
                            <div className="relative">
                                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-3 py-2.5 rounded-md border border-gray-300 focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 transition bg-white"
                                    placeholder="******"
                                    required
                                />
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md text-white bg-yellow-500 hover:bg-yellow-600 transition font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Memproses..." : "Masuk"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">atau</span>
                        </div>
                    </div>



                    <p className="text-sm text-center text-gray-500 mt-6">
                        Belum punya akun?{" "}
                        <button
                            onClick={() => router.push("/auth/register")}
                            className="text-yellow-500 hover:underline font-medium"
                        >
                            Daftar di sini
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
