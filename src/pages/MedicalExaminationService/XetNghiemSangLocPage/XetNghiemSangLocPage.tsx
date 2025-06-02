import { AlarmClockCheck, CalendarCheck, CircleDollarSign, Clock3, ShieldCheck, ShieldUser, Zap } from "lucide-react";
import React from "react";

const XetNghiemSangLocPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-8 bg-blue-100 rounded-2xl p-8 mb-6 ">
        <div className="flex flex-col items-center md:w-1/3">
          <img
            src="https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.88931xw:1xh;center,top&resize=1200:*"
            alt="Bác sĩ"
            className="w-100 h-60 object-cover rounded-xl mb-6 bg-white"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-8 py-3 text-base">
            Đặt Lịch Xét Nghiệm Ngay
          </button>
        </div>
        <div className="flex-1 flex flex-col justify-start items-start space-y-4"> 
          <h1 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4">
            XÉT NGHIỆM SÀNG LỌC HIV
          </h1>
          <ul className="space-y-3 text-base">
            <li className="flex items-center gap-2">
              <span className="text-lg"> <ShieldUser /></span> Thông tin bảo mật riêng tư
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lg"><Clock3 /></span> Có kết quả từ 1-3 ngày
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lg"> <AlarmClockCheck /></span> Nhận kết quả trong hồ sơ điện
              tử của hệ thống
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lg"><CircleDollarSign /></span>
              Giá Chỉ: <span className="text-blue-600 font-bold">160.000đ</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="flex items-center gap-2 bg-white rounded-xl shadow p-4">
          <span className="text-xl"><Zap /></span>
          <span>Độ chính xác cao, xét nghiệm HIV nhanh và bảo mật</span>
        </div>
        <div className="flex items-center gap-2 bg-white rounded-xl shadow p-4">
          <span className="text-xl"> <CalendarCheck /></span>
          <span>
            Trả kết quả cực nhanh trong vòng 30 phút, nhận kết quả qua điện
            thoại
          </span>
        </div>
        <div className="flex items-center gap-2 bg-white rounded-xl shadow p-4">
          <span className="text-xl"><ShieldCheck /></span>
          <span>
            Tư vấn kết quả sau xét nghiệm, mọi thông tin được bảo mật tuyệt đối
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8 border rounded-xl bg-gray-50 p-6">
        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-green-600 mb-2">
              Mục đích xét nghiệm
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>
                Sàng lọc HIV từ giai đoạn sớm (giai đoạn phơi nhiễm sau 18 ngày)
              </li>
              <li>Phát hiện dấu hiệu virus HIV giai đoạn đầu</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-green-600 mb-2">
              Dành cho đối tượng nào
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Người chưa biết tình trạng HIV</li>
              <li>Chưa từng hoặc đã có hành vi nguy cơ</li>
              <li>Chưa từng hoặc đã có tiêm chích ma túy</li>
              <li>Chưa từng hoặc đã có quan hệ đồng giới nam (MSM)</li>
              <li>Trẻ em sinh ra từ mẹ nhiễm HIV</li>
              <li>Người có nhiều bạn tình</li>
              <li>Phụ nữ mang thai</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow p-6 space-y-3">
            <h3 className="text-lg font-semibold text-green-600">Loại mẫu</h3>
            <ul className="list-disc list-inside text-gray-700 mb-2">
              <li>Mẫu máu</li>
            </ul>
            <h3 className="text-lg font-semibold text-green-600">
              Thời gian nhận kết quả
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-2">
              <li>1-3 ngày có kết quả xem trực tiếp tại hệ thống</li>
            </ul>
            <h3 className="text-lg font-semibold text-green-600">
              Có cần nhịn ăn trước khi xét nghiệm
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-2">
              <li>Không cần nhịn ăn trước khi lấy mẫu xét nghiệm</li>
            </ul>
            <h3 className="text-lg font-semibold text-green-600">
              Các phương pháp xét nghiệm HIV
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>
                <b>Xét nghiệm HIV sàng lọc:</b>
                <ul className="list-disc list-inside ml-5">
                  <li>
                    <span className="text-blue-600 font-semibold">
                      Từ 7-14 ngày:
                    </span>{" "}
                    Xét nghiệm HIV PCR (sinh học phân tử)
                  </li>
                  <li>
                    <span className="text-blue-600 font-semibold">
                      Từ 15-90 ngày:
                    </span>{" "}
                    Xét nghiệm HIV Combo Ag/Ab (Test nhanh tìm kháng nguyên Ag
                    và kháng thể Ab)
                  </li>
                  <li>
                    <span className="text-blue-600 font-semibold">
                      Sau 90 ngày:
                    </span>{" "}
                    Xét nghiệm HIV Ab (kháng thể HIV) hoặc HIV Combo Ag/Ab
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="lg:w-1/3 flex flex-col items-center">
          
          <div className="bg-blue-100 rounded-xl w-full flex flex-col items-center py-6">
            <img
            src="https://www.charisma.ro/upload/img/contents/img/modul-laborator-1474443605.jpg"
            alt="Phòng xét nghiệm"
            className="w-full max-w-xs rounded-xl mb-6 object-cover"
          />
            <div className="text-lg font-bold text-blue-700 mb-3">
              Giá Chỉ 160.000đ
            </div>
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg px-8 py-3 text-base">
              Đặt Lịch Xét Nghiệm Ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default XetNghiemSangLocPage;
