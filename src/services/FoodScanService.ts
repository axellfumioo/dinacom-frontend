import { apiClient } from "@/common/lib/apiClient";
import { FoodScanDto } from "@/common/dto/foodscanDto";

class FoodScanService {

  async getAllFoodScans() {
    return apiClient({
      method: "get",
      url: "api/v1/foodscans",
    });
  }


  async scanFood(dto: FoodScanDto) {
    const formData = new FormData();
    formData.append("image", dto.image);

    if (!dto.image) {
      throw new Error("Image file is required");
    }

    return apiClient({
      method: "post",
      url: "api/v1/foodscans/scan",
      data: formData,
    });
  }


  async getUserFoodScans() {
    return apiClient({
      method: "get",
      url: "api/v1/foodscans/user",
    });
  }
}

export const foodScanService = new FoodScanService();
