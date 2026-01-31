import type { ReactNode } from "react";
import { Star, Calendar, Clock, FileText } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Doctor {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  price: string;
  alumnus: string;
  practice: string;
  str: string;
}

type DoctorCardProps = {
  doctor: Doctor;
  onChat: (doctor: Doctor) => void;
};

export const DoctorCard = ({ doctor, onChat }: DoctorCardProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:shadow-md transition">
      <div className="bg-gray-100 p-6 relative">
        <div className="w-24 h-24 bg-blue-200 rounded-full mx-auto" />
        <span className="absolute top-3 left-3 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-center">{doctor.name}</h3>

        <div className="flex justify-center items-center gap-1 text-sm mb-3">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          {doctor.rating} ({doctor.reviews})
        </div>

        <div className="text-center font-bold text-lg mb-4">
          {doctor.price}
        </div>

        <div className="space-y-2 text-sm mb-4">
          <Info icon={Calendar} title="Alumnus" value={doctor.alumnus} />
          <Info icon={FileText} title="Praktek" value={doctor.practice} />
          <Info icon={Clock} title="STR" value={doctor.str} />
        </div>

        <button
          onClick={() => onChat(doctor)}
          className="w-full bg-yellow-400 hover:bg-yellow-500 py-2 rounded-lg font-semibold"
        >
          Chat
        </button>
      </div>
    </div>
  );
};

type InfoProps = {
  icon: LucideIcon;
  title: string;
  value: ReactNode;
};

const Info = ({ icon: Icon, title, value }: InfoProps) => (
  <div className="flex gap-2">
    <div className="w-5 h-5 bg-yellow-400 rounded flex items-center justify-center text-white">
      <Icon className="w-3.5 h-3.5" />
    </div>
    <div>
      <div className="font-medium">{title}</div>
      <div className="text-xs text-gray-500">{value}</div>
    </div>
  </div>
);
