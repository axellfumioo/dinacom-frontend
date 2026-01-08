
import toast from "toastify-js";
import { LoginDto, RegisterDto } from "@/common/dto/authDto";
import axios from "axios";
import { BASE_URL } from "@/common/lib/loadEnv";
import { apiClient } from "@/common/lib/apiClient";
import { deleteCookies, setCookies } from "@/lib/cookie";

class AuthService {
  async login(dto: LoginDto) {
    try {
      const res = await apiClient<{ message: string; data: string }>({
        url: `/api/v1/auth/login`,
        data: dto,
        method: "post",
      });

      if (!res.data) {
        throw new Error("Invalid response from server");
      }

      setCookies(res.data);

      toast({
        text: "Berhasil login",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#22c55e",
      }).showToast();

      return true;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data.message;
      }
      throw error;
    }
  }

  async register(dto: RegisterDto) {
    const res = await axios.post(`${BASE_URL}/api/v1/auth/register`, dto);
    setCookies(res.data);
    toast({
      text: "Berhasil Register",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "#22c55e",
    }).showToast();
    return true;
  }

  logout() {
    deleteCookies();
    toast({
      text: "Berhasil logout",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "#22c55e",
    }).showToast();
  }
}

export const authService = new AuthService();



