"use client";

import { useRouter } from "next/navigation";
import { useAuthStrava } from "@/hooks/useStrava";

export default function StravaPopup() {
  const router = useRouter();
  const { connectStrava } = useAuthStrava();
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full space-y-4">
        <h3 className="text-lg font-semibold">Hubungkan Strava?</h3>
        <p className="text-sm text-gray-600">
          Apakah kamu ingin langsung menghubungkan akun Strava sekarang?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="px-4 py-2 border rounded"
          >
            Tidak
          </button>

          <button
            onClick={connectStrava}
            className="px-4 py-2 bg-orange-600 text-white rounded"
          >
            Hubungkan
          </button>
        </div>
      </div>
    </div>
  );
}
