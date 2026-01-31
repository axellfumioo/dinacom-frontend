"use client";

import { useQuery } from "@tanstack/react-query";
import { Sparkles } from "lucide-react";
import {
  aiInsightService,
  AiInsightResponse,
} from "@/services/AiInsightService";

export default function AiInsightCard() {
  const { data, isLoading, isError } = useQuery<AiInsightResponse>({
    queryKey: ["ai-insight-latest"],
    queryFn: () => aiInsightService.getAiInsight(),
  });

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
        <p className="text-sm text-gray-400">AI sedang menganalisis...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
        <p className="text-sm text-gray-400">
          Insight AI belum tersedia
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">Insight AI Personal</h3>

        <div className="w-8 h-8 bg-yellow-50 rounded-lg flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-yellow-500" />
        </div>
      </div>

      {/* AI Insight */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-3">
        <p className="text-sm text-gray-700 leading-relaxed">
          {data.personal_ai_insight}
        </p>
      </div>

      {/* Important Notice (optional) */}
      {data.ai_important_notice && (
        <p className="text-xs text-gray-500">
          ⚠️ {data.ai_important_notice}
        </p>
      )}

      {/* Confidence */}
      <div className="mt-3 text-xs text-gray-400">
        Confidence AI: {Math.round(data.confidence * 100)}%
      </div>
    </div>
  );
}
