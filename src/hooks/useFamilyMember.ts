'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { memberService } from '@/services/MemberService';
import { AddFamilyRequestDto } from '@/common/dto/memberDto';
import toast from 'react-hot-toast';

export const FAMILY_MEMBERS_KEY = (familyID: string) => [
  'family-members',
  familyID,
];

export const useFamilyMembers = (familyID: string) => {
  const queryClient = useQueryClient();


  const {
    data: members,
    isLoading,
    isError,
  } = useQuery({
    queryKey: FAMILY_MEMBERS_KEY(familyID),
    queryFn: async () => {
      const res = await memberService.getFamilyMembers(familyID);
      return res.data;
    },
    enabled: !!familyID,
  });


  const addMember = useMutation({
    mutationFn: (dto: AddFamilyRequestDto) =>
      memberService.addFamilyMembers(dto),
    onSuccess: () => {
      toast.success('Member berhasil ditambahkan');
      queryClient.invalidateQueries({
        queryKey: FAMILY_MEMBERS_KEY(familyID),
      });
    },
    onError: () => {
      toast.error('Gagal menambahkan member');
    },
  });


  const deleteMember = useMutation({
    mutationFn: (memberID: string) =>
      memberService.deleteFamilyMember(memberID, familyID),
    onSuccess: () => {
      toast.success('Member berhasil dihapus');
      queryClient.invalidateQueries({
        queryKey: FAMILY_MEMBERS_KEY(familyID),
      });
    },
    onError: () => {
      toast.error('Gagal menghapus member');
    },
  });

  return {
    members,
    isLoading,
    isError,

    addMember: addMember.mutate,
    isAdding: addMember.isPending,

    deleteMember: deleteMember.mutate,
    isDeleting: deleteMember.isPending,
  };
};
