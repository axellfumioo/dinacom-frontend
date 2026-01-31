'use client';

import { useCreateFamily } from '@/hooks/useFamily';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Users, Upload, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export default function AddFamilyPage() {
  const router = useRouter();
  const { mutate, isPending } = useCreateFamily();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

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
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali
        </button>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-8 text-center">
            <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-yellow-600" />
            </div>
            <h1 className="text-3xl font-bold text-white drop-shadow-sm mb-2">
              Buat Family Baru
            </h1>
            <p className="text-white/90">
              Mulai pantau kesehatan keluarga Anda
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Avatar Upload */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Avatar Family
              </label>
              <div className="flex items-center gap-6">
                {previewUrl ? (
                  <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-yellow-100">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
                    <Upload className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <div className="flex-1">
                  <label
                    htmlFor="avatar-upload"
                    className="cursor-pointer inline-block bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Pilih Gambar
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    JPG, PNG, atau GIF (Max 5MB)
                  </p>
                </div>
              </div>
            </div>

            {/* Name Input */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Nama Family <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Keluarga Bahagia"
                className="w-full border-2 border-gray-300 focus:border-yellow-400 rounded-xl px-4 py-3 focus:outline-none transition-colors"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Description Input */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Deskripsi
              </label>
              <textarea
                placeholder="Ceritakan sedikit tentang keluarga Anda..."
                className="w-full border-2 border-gray-300 focus:border-yellow-400 rounded-xl px-4 py-3 focus:outline-none transition-colors resize-none"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isPending}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  isPending
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-yellow-400 hover:bg-yellow-500 text-gray-900 hover:shadow-lg'
                }`}
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-500"></div>
                    Membuat Family...
                  </span>
                ) : (
                  'Buat Family'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
