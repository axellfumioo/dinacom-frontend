import { LoginDto, RegisterDto } from "@/common/dto/authDto";
import axios from "axios";
import { apiClient } from "@/common/lib/apiClient";
import { deleteCookies, setCookies } from "@/lib/cookie";
import toast from "react-hot-toast";
import { setUserStore } from "@/common/lib/store";

class AuthService {
  async login(dto: LoginDto) {
    try {
      const res = await apiClient<{ message: string; data: string }>({
        url: `/auth/login`,
        data: dto,
        method: "post",
      });

      if (!res.data) {
        throw new Error("Invalid response from server");
      }

      setCookies(res.data);
      sessionStorage.setItem("showLoginAlert", "true");
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
    const res = await apiClient<{
      message: string;
      data: { user: any; token: string };
    }>({
      url: `/auth/register`,
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

  connectStrava() {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      throw new Error("NEXT_PUBLIC_API_URL belum diset");
    }

    window.location.href =
      `${process.env.NEXT_PUBLIC_API_URL}/auth/strava/redirect`;
  }

  logout() {
    deleteCookies();
    setUserStore(null);
  }
}

export const authService = new AuthService();
