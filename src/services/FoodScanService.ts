import { apiClient } from "@/common/lib/apiClient";
import { FoodScanDto } from "@/common/dto/foodscanDto";

class FoodScanService {

  async getAllFoodScans() {
    return apiClient({
      method: "GET",
      url: "/foodscans",
    });
  }


  async scanFood(dto: FoodScanDto) {
    const formData = new FormData();
    formData.append("image", dto.image);

    return apiClient({
      method: "POST",
      url: "/foodscans/scan",
      data: formData,
    });
  }


  async getUserFoodScans() {
    return apiClient({
      method: "GET",
      url: "/foodscans/user",
    });
  }
}

export const foodScanService = new FoodScanService();
