"use client";

import { useState } from "react";
import { Activity, X } from "lucide-react";

interface StravaQuestionerProps {
  onYes: () => void;
  onNo: () => void;
  isOpen: boolean;
}

export default function StravaQuestioner({
  onYes,
  onNo,
  isOpen,
}: StravaQuestionerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-lg">
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="w-8 h-8 text-orange-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Hubungkan dengan Strava
          </h2>
          <p className="text-gray-600 mb-6">
            Apakah Anda ingin menghubungkan akun Anda dengan Strava untuk
            melacak aktivitas olahraga?
          </p>
          <div className="flex gap-3">
            <button
              onClick={onNo}
              className="flex-1 py-2.5 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition font-medium"
            >
              Nanti Saja
            </button>
            <button
              onClick={onYes}
              className="flex-1 py-2.5 px-4 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition font-medium"
            >
              Ya, Hubungkan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}