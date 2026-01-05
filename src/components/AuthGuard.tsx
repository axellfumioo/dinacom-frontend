"use client";

import validateToken from '@/common/lib/validateToken';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface AuthGuardProps {
    children: React.ReactNode
}

export default function AuthGuard({children}: AuthGuardProps) {
    const router = useRouter();
    const [tokenStatus, setTokenStatus] = useState<'loading' | 'false' | 'true'>('loading');

    useEffect(() => {
        const token = typeof window !== 'undefined'
        ? sessionStorage.getItem("token")
        : null;


        const evaluate = async () => {
            if (!token) {
                setTokenStatus('false');
                router.push('/auth/login');
                return;
            }

            setTokenStatus('loading');
            const isTokenValid = await validateToken(token)
            if (!isTokenValid) {
                setTokenStatus('false');
                router.push('/auth/login');
            } else {
                setTokenStatus('true');
            }
        };

        evaluate();
    }, [router]);

    useEffect(() => {
        if (tokenStatus !== 'true') return;

        const check = setInterval(() => {
            (async () => {
                const token = typeof window !== 'undefined'
                ? sessionStorage.getItem("token")
                : null;
            
            if (!token) {
                setTokenStatus('false');
                router.push('/auth/login');
                return;
            }

            const isTokenValid = await validateToken(token);
            if (!isTokenValid) {
                setTokenStatus('false');
                router.push('/auth/login');
            }
            
            }) ();
        }, 3000);
        return () => clearInterval(check);
    }, [tokenStatus, router]);

    if (tokenStatus === 'loading') {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
                    <p className="text-sm text-gray-600 font-medium">Loading...</p>
                </div>
            </div>
        )
    } 

    if (tokenStatus === 'false') {
        return null;
    }

    return <>{children}</>
}


