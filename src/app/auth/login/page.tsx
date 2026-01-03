"use client";

import { authService } from '@/services/AuthService';
import { useRouter } from 'next/router';
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
            const message = err instanceof Error ? err.message : "Terjadi kesalahan saat login";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    function handleLoginStrava() {
        setLoading(true);
        try {
            window.location.href = "http://localhost:8080/api/v1/auth/strava/redirect";
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Terjadi kesalahan saat login";
            setError(message);
            setLoading(false);
        }
    }

    // Strava Icon SVG Component
    const StravaIcon = () => (
        <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="currentColor"
            className="w-5 h-5"
        >
            <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.599h4.172L10.463 0l-7.02 13.828h4.169"/>
        </svg>
    );

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
                                    placeholder="contoh@gmail.com"
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

                    {/* Strava Login Button */}
                    <button
                        type="button"
                        onClick={handleLoginStrava}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md text-white bg-[#FC4C02] hover:bg-[#E03D00] transition font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <StravaIcon />
                        {loading ? "Memproses..." : "Masuk dengan Strava"}
                    </button>

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
