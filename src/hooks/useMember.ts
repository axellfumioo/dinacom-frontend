'use client';

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { memberService } from "@/services/MemberService";
import { AddFamilyMembersRequestDto } from "@/common/dto/memberDto";
import toast from "react-hot-toast";

export const useGetFamilyMembers = (familyID: string) => {
  return useQuery({
    queryKey: ["family-members", familyID],
    queryFn: () => memberService.getFamilyMembers(familyID),
    enabled: !!familyID,
  });
};

export const useAddFamilyMembers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: AddFamilyMembersRequestDto) =>
      memberService.addFamilyMembers(dto),
    onSuccess: (_, variables) => {
      toast.success("Member added successfully");
      queryClient.invalidateQueries({
        queryKey: ["family-members", variables.familyID],
      });
    },
  });
};

export const useDeleteFamilyMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      memberID,
      familyID,
    }: {
      memberID: string;
      familyID: string;
    }) => memberService.deleteFamilyMember(memberID, familyID),
    onSuccess: (_, variables) => {
      toast.success("Member deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["family-members", variables.familyID],
      });
    },
  });
};
