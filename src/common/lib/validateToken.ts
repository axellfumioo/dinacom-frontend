import api from "./apiClient";


export default async function validateToken(token: string) {
    try {
        const res = await api.get(
            "/users/session",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        
        const data = res.data;

        if (data?.success === true ) {
            return true;
        }

        // Remove token kalo validasi gagalsa
        if (typeof window !== "undefined") {
            sessionStorage.removeItem("token");
        }

        return false;
    } catch {
        if (typeof window !== "undefined") {
            sessionStorage.removeItem("token");
        }

        return false;
    }
}