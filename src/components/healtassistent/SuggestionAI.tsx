interface SuggestionCardsProps {
  onSuggestionClick: (suggestion: string) => void;
}

export function SuggestionCards({ onSuggestionClick }: SuggestionCardsProps) {
  const suggestions = [
    {
      text: "Apakah pola makan saya sudah cukup sehat?",
      icon: "🍎"
    },
    {
      text: "Kesimpulan kondisi kesehatan saya",
      icon: "📋"
    },
    {
      text: "Apakah saya mengalami defisit atau surplus kalori?",
      icon: "⚖️"
    },
    {
      text: "Rekomendasi menu sehat berdasarkan data saya",
      icon: "🥗"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSuggestionClick(suggestion.text)}
          className="bg-white border border-gray-200 rounded-2xl p-5 text-left hover:border-yellow-400 hover:shadow-md transition-all group"
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl group-hover:scale-110 transition-transform">
              {suggestion.icon}
            </span>
            <p className="text-sm text-gray-700 leading-relaxed font-medium">
              {suggestion.text}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}