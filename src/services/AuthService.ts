
import toast from "toastify";
import { LoginDto, RegisterDto } from "@/common/dto/authDto";
import axios from "axios";
import { BASE_URL } from "@/common/lib/loadEnv";
import api from "@/common/lib/apiClient";

class AuthService {

  async login(dto: LoginDto) {
    try {
      const res = await api.post(`/api/v1/auth/login`, dto)

      // Validate response 
      if (!res.data?.data?.token || !res.data?.data?.user) {
        throw new Error("Invalid response from server");
      }

      const { token, user } = res.data.data;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));

      toast.success("Selamat datang");
      return true;
    } catch (error: unknown) {
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
