'use client';

import { useState } from "react";
import { useAddFamilyMembers } from "@/hooks/useMember";

interface Props {
  familyID: string;
}

export const AddFamilyMemberForm = ({ familyID }: Props) => {
  const addMember = useAddFamilyMembers();

  const [userID, setUserID] = useState("");
  const [role, setRole] = useState("member");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userID) return;

    addMember.mutate({
      familyID,
      members: [
        {
          UserID: "",
          Family: "",
          FamilyID: "",
          ID: "",
          UpdatedAt: "",
          Role: "",
          CreatedAt: "",
        },
      ],
    });

    setUserID("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 rounded-xl p-4 mb-4 space-y-3"
    >
      <h3 className="font-semibold text-lg">Add Member</h3>

      <input
        type="text"
        placeholder="User ID"
        value={userID}
        onChange={(e) => setUserID(e.target.value)}
        className="w-full border rounded-lg px-3 py-2"
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full border rounded-lg px-3 py-2"
      >
        <option value="member">Member</option>
        <option value="admin">Admin</option>
      </select>

      <button
        type="submit"
        disabled={addMember.isPending}
        className="bg-yellow-400 w-full py-2 rounded-lg font-semibold"
      >
        {addMember.isPending ? "Adding..." : "Add Member"}
      </button>
    </form>
  );
};
