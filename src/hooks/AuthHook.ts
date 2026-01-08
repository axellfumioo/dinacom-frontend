import { LoginDto } from "@/common/dto/authDto"
import { authService } from "@/services/AuthService"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import React from "react"
import toast from "toastify"

export const useLogin = (setError: React.Dispatch<React.SetStateAction<string | null>>) => {
    const router = useRouter()
    return useMutation({
        mutationKey: ['login'],
        mutationFn: (dto: LoginDto) => authService.login(dto),
        onSuccess: () => {
            toast.success("Login berhasil")
            router.push("/dashboard")
        },
        onError: (err) => {
            setError(err.message)
        }
    })
}