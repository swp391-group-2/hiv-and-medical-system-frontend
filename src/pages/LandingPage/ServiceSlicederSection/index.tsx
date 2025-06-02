import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Service {
  title: string;
  description: string;
  icon: string;
}

const services: Service[] = [
  {
    title: "Xét nghiệm sàng lọc",
    description:
      "Dịch vụ giúp phát hiện sớm nguy cơ nhiễm HIV trước khi có triệu chứng. Việc xét nghiệm định kỳ giúp kiểm soát sức khỏe hiệu quả hơn. Kết quả nhanh chóng, bảo mật và chính xác.",
    icon: "🧪",
  },
  {
    title: "Xét nghiệm khẳng định",
    description:
      "Áp dụng quy trình xét nghiệm hiện đại để xác định chính xác tình trạng HIV. Kết quả được kiểm tra kỹ lưỡng qua nhiều bước. Giúp bạn có thông tin rõ ràng để đưa ra quyết định điều trị.",
    icon: "🔬",
  },
  {
    title: "Khám bệnh",
    description:
      "Gặp gỡ bác sĩ chuyên khoa để tư vấn, thăm khám và theo dõi sức khỏe. Chúng tôi hỗ trợ xây dựng phác đồ điều trị cá nhân hóa. Đảm bảo chăm sóc toàn diện và liên tục.",
    icon: "🩺",
  },
];

const ServiceSlider: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % services.length);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-white py-12">
      <div className="max-w-screen-xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          Dịch vụ nổi bật của chúng tôi
        </h2>

        <div className="relative h-48 md:h-52 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute w-full h-full flex items-center justify-center"
            >
              <div className="bg-blue-50 rounded-xl p-6 w-full md:w-2/3 lg:w-1/2 shadow-md">
                <div className="text-4xl mb-3">{services[index].icon}</div>
                <h3 className="text-xl font-semibold text-blue-700 mb-1">
                  {services[index].title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {services[index].description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ServiceSlider;
