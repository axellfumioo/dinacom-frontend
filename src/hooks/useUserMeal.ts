import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateUserMealRequest } from "@/common/dto/usermealDto";
import { userMealServiceInstance } from "@/services/UserMealService";


const USER_MEAL_KEYS = {
  all: ["user-meals"] as const,
  list: (page: number, pageSize: number) =>
    [...USER_MEAL_KEYS.all, "list", page, pageSize] as const,
  today: () => [...USER_MEAL_KEYS.all, "today"] as const,
};


export const useUserMeals = (page = 1, pageSize = 10) => {
  return useQuery({
    queryKey: USER_MEAL_KEYS.list(page, pageSize),
    queryFn: () =>
      userMealServiceInstance.getUserMeals(page, pageSize),

    // TanStack Query v5 replacement
    placeholderData: (prev) => prev,
  });
};

export const useTodayUserMeals = () => {
  return useQuery({
    queryKey: USER_MEAL_KEYS.today(),
    queryFn: () =>
      userMealServiceInstance.getTodayUserMeals(),
  });
};


export const useAddUserMeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateUserMealRequest) =>
      userMealServiceInstance.addUserMeals(dto),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: USER_MEAL_KEYS.all,
      });
    },
  });
};
