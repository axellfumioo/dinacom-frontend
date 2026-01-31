'use client';

import { useCreateFamily } from '@/hooks/useFamily';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddFamilyPage() {
  const router = useRouter();
  const { mutate, isPending } = useCreateFamily();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;
    if (!avatar) return;

    mutate(
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full border p-3 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files?.[0] || null)}
          required
        />

        <button
          type="submit"
          disabled={isPending}
          className={`px-6 py-3 rounded-lg font-semibold transition
            ${isPending ? 'bg-gray-300 cursor-not-allowed' : 'bg-yellow-400'}
          `}
        >
          {isPending ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  );
}
