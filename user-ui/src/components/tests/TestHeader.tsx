// src/components/TestHeader.tsx
import {
  AlarmClockCheck,
  CircleDollarSign,
  Clock3,
  ShieldUser,
} from "lucide-react";
import { Button } from "../ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { buildRoute } from "@/constants/appRoutes";

interface TestHeaderProps {
  title: string;
  price: string;
  image: string;
  resultTime: string;
  notes: string[];
}

const TestHeader = ({
  title,
  price,
  image,
  resultTime,
  notes,
}: TestHeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(buildRoute.bookingService(location.pathname.split("/")[1]));
  };
  return (
    <div className="flex flex-col md:flex-row gap-8 bg-gradient-to-br from-primary to-sky-200 rounded-2xl p-8 mb-6">
      <div className="flex flex-col items-center justify-center w-full md:w-1/3 space-y-6">
        <div className="relative group overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 to-white p-1 shadow-2xl">
          <div className="relative overflow-hidden rounded-3xl bg-white">
            <img
              src={image}
              alt="Bác sĩ"
              className="w-full h-64 object-cover transition-all duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
        <Button
          className="mt-6 bg-gradient-to-r from-sky-500 via-blue-700 to-sky-800 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white font-semibold rounded-2xl px-12 py-5 text-base shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 border-0 relative overflow-hidden group"
          onClick={handleClick}
        >
          <span className="relative z-10 flex items-center gap-2">
            Đặt Lịch Xét Nghiệm Ngay
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </span>
        </Button>
      </div>
      <div className="flex-1 flex flex-col justify-start items-start space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r text-gray-900 mb-6">
          {title}
        </h1>
        <ul className="space-y-4 text-base w-full">
          <li className="flex items-center gap-4 p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-blue-100 hover:bg-white/80 transition-all duration-300 hover:shadow-md">
            <span className="text-xl text-blue-600 bg-blue-50 p-2 rounded-lg">
              <ShieldUser />
            </span>
            <span className="text-gray-700 font-medium">{notes[0]}</span>
          </li>
          <li className="flex items-center gap-4 p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-green-100 hover:bg-white/80 transition-all duration-300 hover:shadow-md">
            <span className="text-xl text-green-600 bg-green-50 p-2 rounded-lg">
              <Clock3 />
            </span>
            <span className="text-gray-700 font-medium">{resultTime}</span>
          </li>
          <li className="flex items-center gap-4 p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-orange-100 hover:bg-white/80 transition-all duration-300 hover:shadow-md">
            <span className="text-xl text-orange-600 bg-orange-50 p-2 rounded-lg">
              <AlarmClockCheck />
            </span>
            <span className="text-gray-700 font-medium">{notes[1]}</span>
          </li>
          <li className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 hover:from-emerald-100 hover:to-blue-100 transition-all duration-300 hover:shadow-lg">
            <span className="text-xl text-emerald-600 bg-emerald-100 p-2 rounded-lg">
              <CircleDollarSign />
            </span>
            <span className="text-gray-700 font-medium">
              Giá Chỉ:{" "}
              <span className="text-2xl font-bold  text-emerald-600 ">
                {price}
              </span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TestHeader;
