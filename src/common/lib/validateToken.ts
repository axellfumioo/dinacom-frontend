import api from "./apiClient";


export default async function validateToken(): Promise<boolean> {
    try {
        const res = await api.get(
            process.env.NEXT_PUBLIC_API_BASE_URL + "/users/session",
        );
        
        const data = res.data;

        if (data?.success === true ) {
            return true;
        }

        if (typeof window !== "undefined") {
            sessionStorage.removeItem(jwt_token);
            window.location.href = "auth/login";
        }

        return false;
    } catch {
        if (typeof window !== "undefined") {
            sessionStorage.removeItem(jwt_token);
            window.location.href = "auth/login";
        }

        return false;
    }
}