'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { CreateFamilyRequestDto, UpdateFamilyAvatarDto } from '@/common/dto/familyDto';
import toast from 'react-hot-toast';
import { familyService } from '@/services/FamilyService';

import { Family } from "@/common/model/family";

export const useGetFamily = () => {
  return useQuery({
    queryKey: ["family"],
    queryFn: async () => await familyService.getFamilies(), // ambil family user
  });
};


import { useQueryClient } from '@tanstack/react-query';

export const useCreateFamily = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createFamily'],
    mutationFn: (dto: CreateFamilyRequestDto) =>
      familyService.createNewFamily(dto),
    onSuccess: () => {
      toast.success('Family created successfully');
      queryClient.invalidateQueries({ queryKey: ['family'] });
    },
  });
};


export const useUpdateAvatar = () => {
  return useMutation({
    mutationKey: ['updateFamilyAvatar'],
    mutationFn: (dto: UpdateFamilyAvatarDto) => familyService.updateFamilyAvatar(dto),
  })
}

export const useDeleteFamily = () => {
  return useMutation({
    mutationKey: ['deleteFamily'],
    mutationFn: (id: string) => familyService.deleteFamily(id),
  })
}