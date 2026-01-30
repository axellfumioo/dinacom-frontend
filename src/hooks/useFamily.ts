'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { CreateFamilyRequestDto, UpdateFamilyAvatar } from '@/common/dto/familyDto';
import toast from 'react-hot-toast';
import { familyService } from '@/services/FamilyService';

export const useGetFamily = () => {
  return useQuery({
    queryKey: ['families'],
    queryFn: () => familyService.getFamilies(),
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
    mutationFn: (dto: UpdateFamilyAvatar) => familyService.updateFamilyAvatar(dto),
  })
}

export const useDeleteFamily = () => {
  return useMutation({
    mutationKey: ['deleteFamily'],
    mutationFn: (id: string) => familyService.deleteFamily(id),
  })
}