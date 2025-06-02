import React from "react";
import { Image, Globe, CalendarDays } from "lucide-react";



const ServicesSection = () => {
  return (
        <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-xl font-bold mb-6">Dịch vụ</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Image />,
                title: "Xét nghiệm sàng lọc",
                desc: "Xét nghiệm sàng lọc HIV và các bệnh lý khác. Đây là bước đầu tiên trong quy trình chẩn đoán.",
                btnTitle: "Đăng ký xét nghiệm",
              },
              {
                icon: <Globe />,
                title: "Xét nghiệm khẳng định",
                desc: "Xét nghiệm khẳng định HIV, CD4, tải lượng virus và các xét nghiệm chuyên sâu khác.",
                btnTitle: "Đăng ký xét nghiệm",
              },
              {
                icon: <CalendarDays />,
                title: "Khám bệnh",
                desc: "Dịch vụ khám bệnh, tư vấn, chẩn đoán và điều trị cho bệnh nhân.",
                btnTitle: "Đăng ký khám",
              },
            ].map((item, idx) => (
              <div key={idx} className="border rounded-lg p-4">
                <div className="text-blue-600 text-11xl mb-2 mt-4 flex flex-wrap gap-2 ">
                  {item.icon}
                  <h3 className="font-bold mb-2">{item.title}</h3>
                </div>

                <p className="mb-4">{item.desc}</p>
                <button className="bg-blue-white text-black border-2 px-4 py-2 rounded text-sm hover:bg-blue-600 hover:text-white transition-colors">
                  {item.btnTitle}
                </button>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <button className="bg-blue-600 text-white border-2 px-6 py-2 rounded text-sm hover:bg-gray-100 hover:text-black transition-colors">
              Đăng ký khám ngay!
            </button>
          </div>
        </div>
      </section>
  );
};

export default ServicesSection;
