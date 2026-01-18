"use client";

import { authService } from "@/services/AuthService"

export const useAuthStrava = () => {
    const connectStrava = () => {
        authService.connectStrava();
    }
    return { connectStrava };
};