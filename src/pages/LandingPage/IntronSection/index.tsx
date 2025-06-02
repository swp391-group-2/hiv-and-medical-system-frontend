import React from "react";

const IntroSection = () => {
  return (
      <section className="bg-white text-black py-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-6xl mx-auto px-4 space-y-4 ">
            <h2 className="text-2xl font-bold">Giới thiệu cơ sở y tế</h2>
            <p>
              Chúng tôi tiên phong trong chăm sóc, điều trị HIV với sự nhiệt
              tình, hành động, cam kết bảo mật tuyệt đối và hỗ trợ bạn sống khỏe
              mạnh, hạnh phúc.
            </p>
            <p>
              <span className="font-bold">
                Sứ mệnh: <br />
              </span>{" "}
              Đẩy lùi kỳ thị, nâng tầm cuộc sống tích cực
            </p>
            <p>
              <span className="font-bold">
                Cam kết: <br />
              </span>{" "}
              Bảo mật - An tâm - Tận tình
            </p>
            {/* Right image */}
          </div>
          <div className="mt-6 md:mt-0 w-64 h-64 bg-gray-200 rounded flex items-center justify-center">
            <span className="text-gray-500">[Ảnh minh họa]</span>
          </div>
        </div>
      </section>
  );
};

export default IntroSection;
