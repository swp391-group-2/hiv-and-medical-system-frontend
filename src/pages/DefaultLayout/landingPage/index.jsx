import React, { useEffect, useState } from 'react'

const LandingPage = () => {


  return (
    <div className="font-sans text-sm text-gray-900">
      {/* Header */}
       
     
      <header className="bg-[#e9f2ff] py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          {/* Left content */}
          <div className="max-w-lg">
            <h1 className="text-2xl font-bold">Hiểu đúng - Sống khỏe</h1>
            <p className="text-blue-600 font-semibold mt-2">
              Cùng nhau đẩy lùi HIV
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded">
                📞 Gọi tổng đài hỗ trợ
              </button>
              <button className="bg-white border border-gray-300 px-4 py-2 rounded">
                🔍 Tìm bác sĩ
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded">
                📅 Đặt lịch khám
              </button>
            </div>
          </div>
          {/* Right image */}
          <div className="mt-6 md:mt-0 w-64 h-64 bg-gray-200 rounded flex items-center justify-center">
            <span className="text-gray-500">[Ảnh minh họa]</span>
          </div>
        </div>
      </header>

      {/* Giới thiệu */}
      <section className="bg-white text-black py-10">
        <div className="max-w-6xl mx-auto px-4 space-y-4">
          <h2 className="text-lg font-semibold">Giới thiệu cơ sở y tế</h2>
          <p>
            Chúng tôi tiên phong trong chăm sóc, điều trị HIV với sự nhiệt tình,
            hành động, cam kết bảo mật tuyệt đối và hỗ trợ bạn sống khỏe mạnh, hạnh phúc.
          </p>
          <p><span className="font-bold">Sứ mệnh:</span> Đẩy lùi kỳ thị, nâng tầm cuộc sống tích cực</p>
          <p><span className="font-bold">Cam kết:</span> Bảo mật - An tâm - Tận tình</p>
        </div>
      </section>

      {/* Dịch vụ */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-xl font-bold mb-6">Dịch vụ</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Xét nghiệm sàng lọc',
                desc: 'Xét nghiệm sàng lọc HIV và các bệnh lý khác. Đây là bước đầu tiên trong quy trình chẩn đoán.',
              },
              {
                title: 'Xét nghiệm khẳng định',
                desc: 'Xét nghiệm khẳng định HIV, CD4, tải lượng virus và các xét nghiệm chuyên sâu khác.',
              },
              {
                title: 'Khám bệnh',
                desc: 'Dịch vụ khám bệnh, tư vấn, chẩn đoán và điều trị cho bệnh nhân.',
              },
            ].map((item, idx) => (
              <div key={idx} className="border rounded-lg p-4">
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="mb-4">{item.desc}</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
                  Đăng ký ngay
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tài liệu giáo dục */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-xl font-bold mb-6">Tài liệu giáo dục HIV</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'HIV là gì?', desc: 'Tổng quan về HIV, con đường lây truyền và cách phòng tránh.' },
              { title: 'Điều trị ARV có đau không?', desc: 'Giải đáp về thuốc ARV, tác dụng phụ và cách điều trị hiệu quả.' },
              { title: 'Tôi có thể kết hôn không?', desc: 'Thông tin về kết hôn, sinh con và sống khỏe mạnh với người sống chung HIV.' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg border">
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p>{item.desc}</p>
                <button className="text-blue-600 mt-2 text-sm">Xem chi tiết</button>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <button className="bg-blue-600 text-white px-6 py-2 rounded">Xem tất cả tài liệu</button>
          </div>
        </div>
      </section>

      {/* Chia sẻ dễ thấu hiểu */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-xl font-bold mb-6">Chia sẻ dễ thấu hiểu</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Chặng đường vượt qua kỳ thị HIV',
                desc: '“Tôi từng bị kỳ thị suốt 10 năm. Tôi đã vượt qua điều đó, và tôi biết rằng có rất nhiều người như tôi đã vượt qua.”',
              },
              {
                title: 'Từ bệnh viện: Góc nhìn bác sĩ',
                desc: '“Không từ bỏ” đó là chìa khóa của tôi. Chăm sóc bản thân, giữ tinh thần lạc quan và sống cuộc sống trọn vẹn.',
              },
              {
                title: 'Sống khỏe mạnh với HIV',
                desc: '“Không từ bỏ” Đó là chìa khóa của tôi. Chăm sóc bản thân, giữ tinh thần lạc quan và sống cuộc sống trọn vẹn.',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-4 border rounded-lg bg-gray-50">
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p>{item.desc}</p>
                <button className="text-blue-600 mt-2 text-sm">Đọc thêm</button>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <button className="text-blue-600 border border-blue-600 px-4 py-2 rounded">
              Xem thêm
            </button>
          </div>
        </div>
      </section>

      {/* Tìm bác sĩ và Đặt lịch */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-xl font-bold mb-6">Tìm bác sĩ & Đặt lịch</h2>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <select className="w-full md:w-1/3 p-2 border rounded">
              <option>TP Hồ Chí Minh</option>
            </select>
            <select className="w-full md:w-1/3 p-2 border rounded">
              <option>HIV/AIDS</option>
            </select>
            <input
              type="text"
              placeholder="Nhập tên bác sĩ..."
              className="w-full md:w-1/3 p-2 border rounded"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Tìm kiếm</button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Bs. Phạm Anh Quân', info: 'BV. Tâm Anh' },
              { name: 'Bs. Võng Thanh Tú', info: 'BV. Chợ Rẫy' },
              { name: 'Bs. Nguyễn Hoài Phương', info: 'BV. Hùng Vương' },
            ].map((doc, idx) => (
              <div key={idx} className="bg-white p-4 border rounded-lg text-center">
                <div className="w-32 h-32 mx-auto bg-gray-200 mb-4 rounded-full"></div>
                <h3 className="font-bold">{doc.name}</h3>
                <p className="text-sm text-gray-500">{doc.info}</p>
                <p className="text-xs mt-1">Giờ khám: 9:00, 14:00, 16:00</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2 text-sm">Đặt lịch</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tổng đài */}
      <section className="bg-white py-12 text-center">
        <h2 className="text-xl font-bold">Gọi tổng đài tư vấn</h2>
        <p className="text-blue-600 text-2xl font-bold mt-2">1800 1234</p>
        <p className="text-sm mt-1">Miễn phí - Bảo mật - 24/7</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4">📞 Gọi ngay</button>
        <p className="text-xs text-gray-500 mt-4 max-w-xl mx-auto">
          Tổng đài tư vấn miễn phí, sẵn sàng hỗ trợ bạn mọi khó khăn, bảo mật tuyệt đối thông tin cá nhân. Thời gian hoạt động 24/7.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white text-xs py-8">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-4">
          <div>
            <p className="font-bold mb-2">HIVCare++</p>
            <p>
              Nền tảng thông tin hỗ trợ dịch vụ HIV tại Việt Nam, giúp bạn hiểu rõ thông
              qua xét nghiệm, điều trị, sống khỏe và hạnh phúc.
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
  )
}

export default LandingPage