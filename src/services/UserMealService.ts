import {
  CreateUserMealRequest,
  PaginatedUserMealResponse,
  UserMeal,
} from "@/common/dto/usermealDto";
import { apiClient } from "@/common/lib/apiClient";
import { getCookies } from "@/lib/cookie";

class userMealService {
  async getUserMeals(
    page = 1,
    pageSize = 10,
  ): (Promise<PaginatedUserMealResponse>) {
    const token = await getCookies();

    return apiClient<PaginatedUserMealResponse>({
      method: "get",
      url: `/usermeals?page=${page}&page_size=${pageSize}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getTodayUserMeals(): Promise<UserMeal[]> {
    const token = await getCookies();

    return apiClient<UserMeal[]>({
      method: "get",
      url: "/usermeals/today",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async addUserMeals(dto: CreateUserMealRequest) {
    const token = await getCookies();

    // return apiClient<{dto: CreateUserMealRequest}>({
    //   method: "post",
    //   url: "/usermeals",
    //   data: dto,
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });

    return await apiClient<{message: string}>({
      method: "post",
      url: "/usermeals",
      data: dto,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export const userMealServiceInstance = new userMealService();
