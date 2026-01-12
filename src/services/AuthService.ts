
import { LoginDto, RegisterDto } from "@/common/dto/authDto";
import axios from "axios";
import { BASE_URL } from "@/common/lib/loadEnv";
import { apiClient } from "@/common/lib/apiClient";
import { deleteCookies, setCookies } from "@/lib/cookie";
import toast from "react-hot-toast";
import { setUserStore } from "@/common/lib/store";

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
      setUserStore(null); 

      toast.success("Berhasil Login");

      return true;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data.message;
      }
      throw error;
    }
  }

  async register(dto: RegisterDto) {
    const res = await apiClient<{ message: string; data: { user: any; token: string } }>({
      url: `/api/v1/auth/register`,
      data: dto,
      method: "post",
    });

    if (!res.data) {
      throw new Error("Invalid response from server");
    }

    setCookies(res.data.token);
    toast.success("Berhasil Register");
    return res.data.user;
  }

  logout() {
    deleteCookies();
    setUserStore(null);
    toast.success("Berhasil Logout");
  }
}

export const authService = new AuthService();



