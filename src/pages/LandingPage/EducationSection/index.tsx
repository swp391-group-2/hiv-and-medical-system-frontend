import React from "react";

const EducationSection = () => {
  return (
     <section className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-xl font-bold mb-6">
            Tài liệu giáo dục HIV
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "HIV là gì?",
                desc: "Tổng quan về HIV, con đường lây truyền và cách phòng tránh.",
              },
              {
                title: "Điều trị ARV có đau không?",
                desc: "Giải đáp về thuốc ARV, tác dụng phụ và cách điều trị hiệu quả.",
              },
              {
                title: "Tôi có thể kết hôn không?",
                desc: "Thông tin về kết hôn, sinh con và sống khỏe mạnh với người sống chung HIV.",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg border">
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p>{item.desc}</p>
                <button className="text-blue-600 mt-2 text-sm">
                  Xem chi tiết
                </button>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <button className="bg-blue-600 text-white border-2 px-6 py-2 rounded text-sm hover:bg-gray-100 hover:text-black transition-colors">
              Xem tất cả tài liệu
            </button>
          </div>
        </div>
      </section>
  );
};

export default EducationSection;
