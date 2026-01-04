import api from "@/common/lib/apiClient";
import toast from "toastify";
import { LoginDto, RegisterDto } from "@/common/dto/authDto";

class AuthService {

  async login(dto: LoginDto) {
    const res = await api.post("/api/v1/auth/login", dto);

    const { token, user } = res.data.data;
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user", JSON.stringify(user));

    toast.success(`Selamat datang, ${user.name}`);
    return true;
  }

  async register(dto: RegisterDto) {
    const res = await api.post("/api/v1/auth/register", dto);
    toast.success(res.data.message);
    return true;
  }

  logout() {
    sessionStorage.clear();
  }
}

export const authService = new AuthService();
