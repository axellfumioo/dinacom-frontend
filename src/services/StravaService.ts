import { apiClient } from "@/common/lib/apiClient"


class StravaService {
    async getStravaProfile() {
        const res = await apiClient<{
            message: string
        }>({
            url: "/strava/profile",
            method: "get",
        });
        if (!res) {
            throw new Error("Invalid response from server");
        }
        return res;
    }

    async getStravaActivities() {
        const res = await apiClient<{
            message: string
        }>({
            url: "/strava/activities",
            method: "get",
        });
        if (!res) {
            throw new Error("Invalid response from server");
        }
        return res;
    }

    async getStravaActivityById(id: string) {
        const res = await apiClient<{
            message: string
        }>({
            url: `/strava/activities/${id}`,
            method: "get",
        });
        if (!res) {
            throw new Error("Invalid response from server");
        }
        return res;
    }
}

export const stravaService = new StravaService();