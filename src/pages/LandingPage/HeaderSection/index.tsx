import { CalendarDays, Search } from "lucide-react";
import React from "react";

const HeaderSection = () => {
  return (
    <header className="bg-[#e9f2ff] py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Left content */}
        <div className="max-w-lg">
          <h1 className="text-3xl font-bold">Hiểu đúng - Sống khỏe</h1>
          <p className="text-blue-600 text-2xl font-semibold mt-2">
            Cùng nhau đẩy lùi HIV
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded flex items-center">
              <CalendarDays /> Đăng ký xét nghiệm
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center">
              <Search /> Tìm bác sĩ
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center">
              <CalendarDays /> Đặt lịch khám
            </button>
          </div>
        </div>
        {/* Right image */}
        <div className="mt-6 md:mt-0 w-64 h-64 bg-gray-200 rounded flex items-center justify-center">
          <span className="text-gray-500">[Ảnh minh họa]</span>
        </div>
      </div>
    </header>
  );
};

export default HeaderSection;
