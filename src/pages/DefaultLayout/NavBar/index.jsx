import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this import

const NavBar = () => {
  const [currentTime, setCurrentTime] = useState(getFormattedTime());
  const navigate = useNavigate(); // Initialize navigate

  // Hàm lấy giờ hiện tại
  function getFormattedTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  // Cập nhật thời gian mỗi phút
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getFormattedTime());
    }, 60000); // mỗi 60 giây cập nhật
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
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
          <nav className="flex space-x-5 text-sm text-gray-600 font-medium">
            <a href="/" className="text-blue-600">
              Trang chủ
            </a>
            <a href="#">Dịch vụ</a>
            <a href="#">Giáo dục HIV</a>
            <a href="#">Hỏi đáp</a>
            <a href="#">Hồ sơ</a>
            <a href="#">Liên hệ</a>
          </nav>

          {/* Right side - Time and Buttons */}
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-gray-500">Bây giờ là: {currentTime}</span>
            <button
              className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
              onClick={() => navigate("login")} 
            >
              Đăng nhập
            </button>
            <button className="px-3 py-1 bg-teal-500 text-white rounded hover:bg-teal-600"
            onClick={() => navigate("register")} >
              Đăng ký
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default NavBar;
