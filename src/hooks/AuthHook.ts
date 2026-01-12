import { LoginDto, RegisterDto } from "@/common/dto/authDto"
import { authService } from "@/services/AuthService"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import React from "react"


export const useLogin = (setError: React.Dispatch<React.SetStateAction<string | null>>) => {
    const router = useRouter()
    return useMutation({
        mutationKey: ['login'],
        mutationFn: (dto: LoginDto) => authService.login(dto),
        onSuccess: () => {
            router.push("/dashboard")
        },
        onError: (err) => {
            setError(err.message)
        }
    })
}

export const useRegister = (
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  onSuccess?: (user: any) => void
) => {
    return useMutation({
        mutationKey: ['register'],
        mutationFn: (dto: RegisterDto) => authService.register(dto),
        onSuccess: (user) => {
            if (onSuccess) {
                onSuccess(user);
            }
        },
        onError: (err) => {
            setError(err.message)
        }
    })
}