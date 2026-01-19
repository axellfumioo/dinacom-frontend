import { LoginDto, RegisterDto } from "@/common/dto/authDto";
import axios from "axios";
import { apiClient } from "@/common/lib/apiClient";
import { deleteCookies, setCookies } from "@/lib/cookie";
import toast from "react-hot-toast";
import { setUserStore } from "@/common/lib/store";
import { UserModel } from "@/common/model/user";

class AuthService {
async login(dto: LoginDto) {
  try {
    const res = await apiClient<{
      message: string;
      data: { token: string; user: UserModel };
    }>({
      url: `/auth/login`,
      data: dto,
      method: "post",
    });

    if (!res.data) {
      throw new Error("Invalid response from server");
    }

    setCookies(res.data.token);
    setUserStore(res.data.user);

    sessionStorage.setItem("showLoginAlert", "true");

    return res.data.user; // return user
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
      data: {token: string, user: UserModel};
    }>({
      url: `/auth/register`,
      data: dto,
      method: "post",
    });

    if (!res.data) {
      throw new Error("Invalid response from server");
    }

    setUserStore(res.data.user);
    toast.success("Berhasil Register");

    return res.data.user;
  }

  logout() {
    deleteCookies();
    setUserStore(null);
  }
}

export const authService = new AuthService();
