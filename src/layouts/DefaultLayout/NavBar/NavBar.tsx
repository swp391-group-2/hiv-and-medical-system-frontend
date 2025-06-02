import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>(getFormattedTime());

  function getFormattedTime(): string {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getFormattedTime());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-sans">
      <header className="bg-white shadow-sm">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-3">
          {/* Logo + Name */}
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
              M
            </div>
            <span className="text-blue-600 font-semibold">MedCare HIV</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex space-x-5 text-sm text-gray-600 font-medium relative">
            <Link to="/" className="text-blue-600">
              Trang chủ
            </Link>

            {/* Dropdown Dịch vụ */}
            <div className="relative group">
              <button className="hover:text-blue-600">Dịch vụ</button>
              <div className="absolute left-0 top-full mt-2 z-50 bg-white border border-gray-200 rounded shadow-md w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link
                  to="/xet-nghiem-sang-loc"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Xét nghiệm sàng lọc
                </Link>
                <Link
                  to="/xet-nghiem-khang-dinh"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Xét nghiệm khẳng định
                </Link>
                <Link
                  to="/kham-benh"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Khám bệnh
                </Link>
              </div>
            </div>

            <Link to="#">Giáo dục HIV</Link>
            <Link to="#">Hỏi đáp</Link>
            <Link to="#">Hồ sơ</Link>
            <Link to="#">Liên hệ</Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-gray-500">Bây giờ là: {currentTime}</span>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">
              Đăng nhập
            </button>
            <button className="px-3 py-1 bg-teal-500 text-white rounded hover:bg-teal-600">
              Đăng ký
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default NavBar;
