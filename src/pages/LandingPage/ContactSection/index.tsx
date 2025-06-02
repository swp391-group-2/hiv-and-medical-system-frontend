import { PhoneOutgoing } from "lucide-react";
import React from "react";

const ContactSection = () => {
  return (
    <div>
      <section className="bg-white py-12 text-center">
        <h2 className="text-xl font-bold">Gọi tổng đài tư vấn</h2>
        <p className="text-blue-600 text-2xl font-bold mt-2">1800 1234</p>
        <p className="text-sm mt-1">Miễn phí - Bảo mật - 24/7</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4 w-30 flex items-center justify-center mx-auto hover:bg-blue-700 transition-colors ">
          <PhoneOutgoing /> Gọi ngay
        </button>

        <p className="text-xs text-gray-500 mt-4 max-w-xl mx-auto">
          Tổng đài tư vấn miễn phí, sẵn sàng hỗ trợ bạn mọi khó khăn, bảo mật
          tuyệt đối thông tin cá nhân. Thời gian hoạt động 24/7.
        </p>
      </section>
    </div>
  );
};

export default ContactSection;
