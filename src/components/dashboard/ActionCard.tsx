import { Camera, Sparkles, Video } from "lucide-react";

interface ActionCardProps {
  title: string;
  description: string;
  buttonText: string;
  icon?: "scan" | "health" | "consultation";
  highlight?: boolean;
}

export default function ActionCard({
  title,
  description,
  buttonText,
  icon = "scan",
  highlight = false,
}: ActionCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "scan":
        return <Camera className="w-5 h-5" />;
      case "health":
        return <Sparkles className="w-5 h-5" />;
      case "consultation":
        return <Video className="w-5 h-5" />;
      default:
        return <Camera className="w-5 h-5" />;
    }
  };

  const cardClass = highlight
    ? "bg-yellow-400 border-yellow-500"
    : "bg-white border-yellow-400";

  const buttonClass = highlight
    ? "bg-white text-gray-900 hover:bg-gray-50"
    : "bg-yellow-400 text-gray-900 hover:bg-yellow-500";

  const iconClass = highlight
    ? "bg-yellow-500 text-gray-900"
    : "bg-yellow-100 text-yellow-600";

  return (
    <div
      className={`${cardClass} border-2 rounded-2xl p-6 shadow-sm transition-all hover:shadow-md`}
    >
      <div className="flex items-start gap-3 mb-4">
        <div className={`w-10 h-10 ${iconClass} rounded-lg flex items-center justify-center`}>
          {getIcon()}
        </div>
        <h3 className="text-base font-bold text-gray-900">{title}</h3>
      </div>

      <p className="text-sm text-gray-700 mb-6 leading-relaxed min-h-[48px]">
        {description}
      </p>

      <button
        className={`w-full ${buttonClass} py-3 px-4 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2`}
      >
        {icon === "scan" && <Camera className="w-4 h-4" />}
        {icon === "health" && <Sparkles className="w-4 h-4" />}
        {icon === "consultation" && <Video className="w-4 h-4" />}
        {buttonText}
      </button>
    </div>
  );
}