import { apiClient } from "./apiClient";


export default async function validateToken(token: string) {
    try {
        const res = await apiClient<{ success: boolean, message: string, data: any }>({
            url: "/api/v1/users/session",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (res.success === true) {
            return true;
        }

        return false;
    } catch {
        if (typeof window !== "undefined") {
            sessionStorage.removeItem("token");
        }

        return false;
    }
}