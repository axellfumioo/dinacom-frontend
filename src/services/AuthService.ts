import { LoginDto, RegisterDto } from "@/common/dto/authDto";
import axios from "axios";
import { apiClient } from "@/common/lib/apiClient";
import { deleteCookies, setCookies } from "@/lib/cookie";
import toast from "react-hot-toast";
import { setUserStore } from "@/common/lib/store";
import { UserModel } from "@/common/model/user";
import { setUserIdStore } from "@/common/lib/userId";

class AuthService {
async login(dto: LoginDto) {
  try {
    const res = await apiClient<{
      message: string;
      data: string;
    }>({
      url: `/auth/login`,
      data: dto,
      method: "post",
    });

    if (!res.data) {
      throw new Error("Invalid response from server");
    }

    await setCookies(res.data);
    sessionStorage.setItem("showLoginAlert", "true");

    return res.data; // return user
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Login gagal");
    }
    throw new Error("Terjadi kesalahan");
  }
}


  async register(dto: RegisterDto) {
    const res = await apiClient<{
      message: string;
      data:UserModel;
    }>({
      url: `/auth/register`,
      data: dto,
      method: "post",
    });

    if (!res.data) {
      throw new Error("Invalid response from server");
    }

    setUserIdStore(res.data.user_id);
    toast.success("Berhasil Register");

    return res.data;
  }

   connectStrava() {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/strava/redirect`;
  }

  logout() {
    deleteCookies();
    setUserStore(null);
  }
}

export const authService = new AuthService();
