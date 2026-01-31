'use client';

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userMealServiceInstance } from "@/services/UserMealService";
import {
  PaginatedUserMealResponse,
  UserMeal,
  CreateUserMealRequest,
} from "@/common/dto/usermealDto";
import toast from "react-hot-toast";

export const useGetUserMeals = (
  page: number = 1,
  pageSize: number = 10
) => {
  return useQuery<PaginatedUserMealResponse>({
    queryKey: ["user-meals", page, pageSize],
    queryFn: () =>
      userMealServiceInstance.getUserMeals(page, pageSize),

  });
};


export const useUserMealsToday = () => {
  return useQuery<UserMeal[]>({
    queryKey: ["user-meals-today"],
    queryFn: () => userMealServiceInstance.getTodayUserMeals(),
  });
};






export const useAddUserMeals = (options?: {
  onSuccess?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateUserMealRequest) =>
      userMealServiceInstance.addUserMeals(dto),

    onSuccess: () => {
      toast.success("Makanan berhasil disimpan");

      queryClient.invalidateQueries({ queryKey: ["user-meals"] });
      queryClient.invalidateQueries({ queryKey: ["user-meals-today"] });

      options?.onSuccess?.();
    },

    onError: (err) => {
      toast.error(err?.message || "Gagal menyimpan makanan");
    },
  });
};

