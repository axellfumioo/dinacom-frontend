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
  onSuccess?: (user: UserModel) => void
) => {
    const router = useRouter()
    return useMutation({
        mutationKey: ['register'],
        mutationFn: (dto: RegisterDto) => authService.register({ name : dto.name, phone_number : dto.phone_number, email : dto.email, gender : dto.gender, password: dto.password, date_of_birth : new Date(dto.date_of_birth).toISOString() }),
        onSuccess: () => {
         
                router.push("/auth/register/questioner");
            
        },
        onError: (err) => {
          toast.error(err.message)
        }
    })
}
