
import toast from "toastify";
import { LoginDto, RegisterDto } from "@/common/dto/authDto";
import axios from "axios";
import { BASE_URL } from "@/common/lib/loadEnv";
import { apiClient } from "@/common/lib/apiClient";

class AuthService {

  async login(dto: LoginDto) {
    try {
      const res = await apiClient<{ message: string, data: string, }>({ url: `/api/v1/auth/login`, data: dto, method: "post" })

      // Validate response 
      if (!res.data) {
        throw new Error("Invalid response from server");
      }

      const token = res.data;
      sessionStorage.setItem("token", token);

      toast.success("Selamat datang");
      return true;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data.message
      }
      throw error;
    }
  }

  async register(dto: RegisterDto) {
    const res = await axios.post(`${BASE_URL}/api/v1/auth/register`, dto);
    toast.success(res.data.message);
    return true;
  }

  logout() {
    sessionStorage.clear();
  }
}

export const authService = new AuthService();
