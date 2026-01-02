import { LoginDto, RegisterDto } from "@/common/dto/authDto";
import api from "@/common/lib/apiClient";
import { BASE_URL } from "@/common/lib/loadEnv";
import toast from "toastify";

interface IAuthService {
    login: (dto: LoginDto) => void;
    logout: () => void;
    register: (dto: RegisterDto) => void;
}

class AuthService implements IAuthService {

    public async login(dto: LoginDto) {
        try {
            const res = await api.post(`${BASE_URL}/auth/login`, dto);
            const {token, user} = res.data.data;
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("user", user);
            toast.success(`Selamat datang, ${user}`)
            return true;
        } catch (error) {
            const errorMessage = error instanceof Error 
                ? error.message 
                : (error && typeof error === 'object' && 'message' in error)
                    ? String(error.message)
                    : "Login Failed";
            toast.error(errorMessage);
        }
    };

    public async register(dto: RegisterDto) {
        try {
            const res = await api.post(`${BASE_URL}/auth/register`,dto) ;
            toast.success(res.data.message);
        } catch (error) {
            const errorMessage = error instanceof Error 
                ? error.message 
                : (error && typeof error === 'object' && 'message' in error)
                    ? String(error.message)
                    : "Register Failed";
            toast.error(errorMessage);
        }
    }

    public async logout() {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        return true;
    }

}

export const authService = new AuthService();