import React from "react";
import {
  AlarmClockCheck,
  CalendarCheck,
  CircleDollarSign,
  Clock3,
  ShieldCheck,
  ShieldUser,
  Zap,
} from "lucide-react";
const XetNghiemKhangDinhPage = () => {
  return (
    
      <div className="max-w-7xl mx-auto px-4 py-8 font-sans">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-8 bg-blue-100 rounded-2xl p-8 mb-6 ">
          <div className="flex flex-col items-center md:w-1/3">
            <img
              src="https://images.squarespace-cdn.com/content/5dc57f17365d8a7fb9f03010/1573501410841-UKLPX6JFHJ9R27QHQC5L/Microscope-Care-and-Maintenance-1-960x640.jpg?content-type=image%2Fjpeg"
              alt="Bác sĩ"
              className="w-100 h-60 object-cover rounded-xl mb-6 bg-white"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-8 py-3 text-base">
              Đặt Lịch Xét Nghiệm Ngay
            </button>
          </div>
          <div className="flex-1 flex flex-col justify-start items-start space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4">
              XÉT NGHIỆM KHẲNG ĐỊNH HIV
            </h1>
            <ul className="space-y-3 text-base">
              <li className="flex items-center gap-2">
                <span className="text-lg">
                  {" "}
                  <ShieldUser />
                </span>{" "}
                Thông tin bảo mật riêng tư
              </li>
              <li className="flex items-center gap-2">
                <span className="text-lg">
                  <Clock3 />
                </span>{" "}
                Có kết quả từ 3-7 ngày
              </li>
              <li className="flex items-center gap-2">
                <span className="text-lg">
                  {" "}
                  <AlarmClockCheck />
                </span>{" "}
                Nhận kết quả trong hồ sơ điện tử của hệ thống
              </li>
              <li className="flex items-center gap-2">
                <span className="text-lg">
                  <CircleDollarSign />
                </span>
                Giá Chỉ:{" "}
                <span className="text-blue-600 font-bold">400.000đ</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center gap-2 bg-white rounded-xl shadow p-4">
            <span className="text-xl">
              <Zap />
            </span>
            <span>Độ chính xác cao, xét nghiệm HIV nhanh và bảo mật</span>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-xl shadow p-4">
            <span className="text-xl">
              {" "}
              <CalendarCheck />
            </span>
            <span>
              Trả kết quả cực nhanh trong vòng 30 phút, nhận kết quả qua điện
              thoại
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-xl shadow p-4">
            <span className="text-xl">
              <ShieldCheck />
            </span>
            <span>
              Tư vấn kết quả sau xét nghiệm, mọi thông tin được bảo mật tuyệt
              đối
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
                  <span>
                    {" "}
                    Dành cho trường hợp
                    <strong>sau khi test Combo HIV Ag/Ab</strong>, kit test có
                    phản ứng hoặc dương tính sẽ tiến hành{" "}
                    <strong>xét nghiệm khẳng định HIV</strong>
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold text-green-600 mb-2">
                Dành cho đối tượng nào
              </h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Người sau khi test nhanh HIV có phản ứng / Dương tính</li>
                <li>Mắc các bệnh xã hội, bệnh lây nhiễm qua đường tình dục</li>
                <li>Người quan hệ tình dục không an toàn, có nhiều bạn tình</li>
                <li>Người chấn thương hoặc chia sẻ kim tiêm</li>
                <li>Người hoạt động lao động tình dục</li>
                <li>
                  Nhóm quan hệ đồng giới<strong>(MSM)</strong>{" "}
                </li>
                <li>Trẻ em sinh ra từ mẹ nhiễm HIV</li>

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
                <li>
                  <strong>80 phút</strong>có kết quả
                </li>
              </ul>
              <h3 className="text-lg font-semibold text-green-600">
                Có cần nhịn ăn trước khi xét nghiệm
              </h3>
              <ul className="list-disc list-inside text-gray-700 mb-2">
                <li>Không cần nhịn ăn trước khi lấy mẫu xét nghiệm</li>
              </ul>
            </div>
          </div>
          <div className="lg:w-1/3 flex flex-col items-center">
            <div className="bg-blue-100 rounded-xl w-full flex flex-col items-center py-6">
              <img
                src="https://www.smacgigworld.com/assets/blog-img/application-for-lab-water.png"
                alt="Phòng xét nghiệm"
                className="w-full max-w-xs rounded-xl mb-6 object-cover"
              />
              <div className="text-lg font-bold text-blue-700 mb-3">
                Giá Chỉ 400.000đ
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

export default XetNghiemKhangDinhPage;
