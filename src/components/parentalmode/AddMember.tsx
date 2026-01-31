'use client';

import { useState } from "react";
import { useAddFamilyMembers } from "@/hooks/useMember";
import { UserPlus, X } from "lucide-react";

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
          UserID: userID,
          Family: "",
          FamilyID: familyID,
          ID: "",
          UpdatedAt: "",
          Role: role,
          CreatedAt: "",
        },
      ],
    });

    setUserID("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-200"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-yellow-400 p-2 rounded-lg">
          <UserPlus className="w-5 h-5 text-white" />
        </div>
        <h3 className="font-bold text-lg text-gray-900">Tambah Anggota Baru</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            User ID
          </label>
          <input
            type="text"
            placeholder="Masukkan User ID"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:border-yellow-400 focus:outline-none transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:border-yellow-400 focus:outline-none transition-colors bg-white"
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={addMember.isPending}
          className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
            addMember.isPending
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-yellow-400 hover:bg-yellow-500 text-gray-900 hover:shadow-md'
          }`}
        >
          {addMember.isPending ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-500"></div>
              Menambahkan...
            </>
          ) : (
            <>
              <UserPlus className="w-5 h-5" />
              Tambah Member
            </>
          )}
        </button>
      </div>
    </form>
  );
};
