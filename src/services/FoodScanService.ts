import { apiClient } from "@/common/lib/apiClient";
import { FoodScanDto } from "@/common/dto/foodscanDto";
import { getCookies } from "@/lib/cookie";

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


  async scanFood(dto: FoodScanDto) {
    const token = await getCookies()
    const formData = new FormData();
    formData.append("image", dto.image);

    if (!dto.image) {
      throw new Error("Image file is required");
    }

    return apiClient({
      method: "post",
      url: "api/v1/foodscans/scan",
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
}

export const foodScanService = new FoodScanService();
