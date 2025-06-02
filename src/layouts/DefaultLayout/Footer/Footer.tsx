import React from "react";

const Footer = () => {
  return (
    <div>
      {/* Footer */}
      <footer className="bg-black text-white text-xs py-8">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-4">
          <div>
            <p className="font-bold mb-2">HIVCare++</p>
            <p>
              Nền tảng thông tin hỗ trợ dịch vụ HIV tại Việt Nam, giúp bạn hiểu
              rõ thông qua xét nghiệm, điều trị, sống khỏe và hạnh phúc.
            </p>
          </div>
          <div>
            <p className="font-bold mb-2">Thông tin</p>
            <ul>
              <li>Về chúng tôi</li>
              <li>Đội ngũ bác sĩ</li>
              <li>Liên hệ</li>
              <li>Tin tức & Sự kiện</li>
            </ul>
          </div>
          <div>
            <p className="font-bold mb-2">Điều khoản sử dụng</p>
            <ul>
              <li>Chính sách quyền riêng tư</li>
              <li>Điều khoản dịch vụ</li>
              <li>Câu hỏi thường gặp</li>
            </ul>
          </div>
          <div>
            <p className="font-bold mb-2">Tiêu chuẩn cộng đồng</p>
            <ul>
              <li>Quy tắc ứng xử</li>
              <li>Chống phân biệt đối xử</li>
              <li>Bảo vệ dữ liệu</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8 text-gray-500">
          © 2025 HIVCare++. Tất cả quyền được bảo lưu.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
