import api from '../common/lib/apiClient';
import {
  ScanFoodRequest,
  ScanFoodResponse,
  GetAllFoodScansResponse,
  GetUserFoodScansResponse,
} from '../common/dto/foodscanDto';

class FoodScanService {
  async getAllFoodScans(): Promise<GetAllFoodScansResponse> {
    try {
      const response = await api.get('/foodscans');
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  async scanFood(request: ScanFoodRequest): Promise<ScanFoodResponse> {
    try {
      const formData = new FormData();
      formData.append('image', request.image);

      const response = await api.post('/foodscans/scan/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  async getUserFoodScans(): Promise<GetUserFoodScansResponse> {
    try {
      const response = await api.get('/foodscans/user');
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new FoodScanService();
