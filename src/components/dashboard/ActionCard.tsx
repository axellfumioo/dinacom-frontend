"use client";


import { useRouter } from "next/navigation";

type ActionCardProps = {
  title: string;
  description: string;
  buttonText: string;
  highlight?: boolean;
};

export default function ActionCard({
  title,
  description,
  buttonText,
  highlight = false,
}: ActionCardProps) {
  const router = useRouter();

  return (
    <div
      className={`
        rounded-xl border
        p-5 flex flex-col justify-between
        h-40
        ${
          highlight
            ? "bg-yellow-400 border-yellow-400"
            : "bg-white border-yellow-400"
        }
      `}
    >
      <div>
        <h3 className="font-semibold text-sm">{title}</h3>
        <p className="text-xs mt-1 text-gray-700">{description}</p>
      </div>

      <button
        className="mt-4 w-full bg-white text-sm font-medium py-2 rounded-md shadow"
        onClick={() => router.push("/dashboard/scanmakanan")}
      >
        {buttonText}
      </button>
    </div>
  );
}
