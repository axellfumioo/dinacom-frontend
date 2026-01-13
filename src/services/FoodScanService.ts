import { apiClient } from "@/common/lib/apiClient";
import { FoodScanDto } from "@/common/dto/foodscanDto";
import { getCookies } from "@/lib/cookie";
import { FoodScanModel } from "@/common/model/foodscan";

class FoodScanService {

  async getAllFoodScans() {
    const token = await getCookies();
    return apiClient({
      method: "get",
      url: "api/v1/foodscans",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  async getFoodScanByID(foodScanID: string) {
    const token = await getCookies();
    return await apiClient<{ data: FoodScanModel }>({ url: `/foodscans/${foodScanID}/get`, headers: { Authorization: `Bearer ${token}` } })
  }

  async scanFood(dto: FoodScanDto) {
    const token = await getCookies()
    const formData = new FormData();
    formData.append("image", dto.image);

    if (!dto.image) {
      throw new Error("Image file is required");
    }

    return apiClient<{ data : FoodScanModel }>({
      method: "post",
      url: "/foodscans/scan",
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }


  async getUserFoodScans() {
    const token = await getCookies()
    return apiClient({
      method: "get",
      url: "api/v1/foodscans/user",
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  async GetAllFoodScanResults() {
    const token = await getCookies();
    return apiClient({
      method: "get",
      url: "api/v1/results",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  async GetUserFoodScanResult() {
    const token = await getCookies();
    return apiClient({
      method: "get",
      url: "api/v1/results/user",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  async GetFoodScanResultByID(id: string) {
    const token = await getCookies();
    return apiClient({
      method: "get",
      url: `api/v1/results/${id}/get`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}

export const foodScanService = new FoodScanService();
