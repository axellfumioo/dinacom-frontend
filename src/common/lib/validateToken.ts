import { UserModel } from "../model/user";
import { apiClient } from "./apiClient";


export default async function validateToken(token: string) {
    try {
        const res = await apiClient<{ success: boolean, message: string, data: UserModel }>({
            url: "/users/session",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch {
        return false;
    }
}