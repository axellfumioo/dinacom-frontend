import { LoginDto, RegisterDto } from "@/common/dto/authDto"
import { UserModel } from "@/common/model/user"
import { authService } from "@/services/AuthService"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import React from "react"
import toast from "react-hot-toast"


export const useLogin = (
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (dto: LoginDto) => authService.login(dto),
    onSuccess: () => {
      toast.success("Berhasil login!");
      router.push("/dashboard");
    },

    onError: (err: Error) => {
      setError(err.message);
    },
  });
};


export const useRegister = (
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  onSuccess?: (user: UserModel) => void
) => {
    const router = useRouter()
    return useMutation({
        mutationKey: ['register'],
        mutationFn: (dto: RegisterDto) => authService.register(dto),
        onSuccess: (user) => {
            if (onSuccess) {
                onSuccess(user);
                router.push("/auth/register/questioner");
            }
            
        },
        onError: (err) => {
            setError(err.message)
        }
    })
}
