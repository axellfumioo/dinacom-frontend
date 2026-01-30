'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { CreateFamilyRequestDto, UpdateFamilyAvatarDto } from '@/common/dto/familyDto';
import toast from 'react-hot-toast';
import { familyService } from '@/services/FamilyService';

export const useGetFamily = () => {
  return useQuery({
    queryKey: ['families'],
    queryFn: async () => { 
    const res = await familyService.getFamilies();
    return res.data
}
})
}

export const useCreateFamily = () => {
  return useMutation({
    mutationKey: ['createFamily'],
    mutationFn: (dto: CreateFamilyRequestDto) => familyService.createNewFamily(dto),
    onSuccess: () => {

      toast.success('Family created successfully');
    }  
  })
}

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