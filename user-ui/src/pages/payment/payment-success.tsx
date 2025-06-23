import React, { useEffect, useState } from "react";
import { CheckCircle, ArrowLeft, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AppRoutes } from "@/constants/appRoutes";

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Hiệu ứng fade in
    setTimeout(() => setIsVisible(true), 100);
    // Hiệu ứng confetti
    setTimeout(() => setShowConfetti(true), 500);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-5 w-16 h-16 bg-emerald-200 rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div
        className={`max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center transform transition-all duration-1000 ${
          isVisible
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-10 opacity-0 scale-95"
        }`}
      >
        {/* Success Icon with Scale Animation */}
        <div className="mb-6 relative">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-green-200 rounded-full animate-ping opacity-30"></div>
            <CheckCircle
              className={`w-12 h-12 text-green-600 relative z-10 transform transition-all duration-700 ${
                isVisible ? "scale-100 rotate-0" : "scale-0 rotate-180"
              }`}
            />
          </div>

          {/* Sparkle Effects */}
          <Sparkles className="w-4 h-4 text-yellow-400 absolute top-0 right-0 animate-pulse" />
          <Sparkles
            className="w-3 h-3 text-yellow-500 absolute bottom-2 left-2 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          />
        </div>

        {/* Success Message with Slide Animation */}
        <div
          className={`transform transition-all duration-800 delay-300 ${
            isVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          }`}
        >
          <h1 className="text-2xl font-bold  mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Thanh toán thành công!
          </h1>
          <p className="text-gray-600 mb-6">
            Cảm ơn bạn đã tin tướng dịch vụ của chúng tôi
          </p>
        </div>

        {/* Success Animation & Details with Enhanced Effects */}
        <div
          className={`bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border border-green-100 relative overflow-hidden transform transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer"></div>

          <div className="text-center space-y-2 relative z-10">
            <h3 className="text-lg font-semibold text-green-800">
              Đặt lịch thành công!
            </h3>
            <p className="text-green-700 text-sm">
              Bạn đã hoàn tất việc đặt lịch hẹn
            </p>
            <div className="flex items-center justify-center space-x-2 mt-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Action Buttons with Stagger Animation */}
        <div className="space-y-3">
          <Button
            size={"xl"}
            onClick={() => navigate(AppRoutes.USER_APPOINTMENTS)}
            className={`w-full   text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg transform ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }`}
          >
            Xem lịch hẹn của tôi
          </Button>
          <Button
            variant={"outline"}
            onClick={() => navigate(AppRoutes.HOME)}
            className={`w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center transform ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Về trang chủ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
