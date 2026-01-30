'use client';

import { useCreateFamily } from '@/hooks/useFamily';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddFamilyPage() {
  const router = useRouter();
  const createFamily = useCreateFamily();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!avatar) return;

    createFamily.mutate(
      {
        name,
        description,
        familyAvatar: avatar,
      },
      {
        onSuccess: () => {
          router.push('/dashboard/parentalmode');
        },
      }
    );
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Create Family</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Family Name"
          className="w-full border p-3 rounded"
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full border p-3 rounded"
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) => setAvatar(e.target.files?.[0] || null)}
        />

        <button
          type="submit"
          className="bg-yellow-400 px-6 py-3 rounded-lg font-semibold"
        >
          Create
        </button>
      </form>
    </div>
  );
}
