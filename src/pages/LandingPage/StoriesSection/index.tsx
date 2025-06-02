import React from "react";

const StoriesSection = () => {
  return (
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-xl font-bold mb-6">
            Chia sẻ dễ thấu hiểu
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Chặng đường vượt qua kỳ thị HIV",
                desc: "“Tôi từng bị kỳ thị suốt 10 năm. Tôi đã vượt qua điều đó, và tôi biết rằng có rất nhiều người như tôi đã vượt qua.”",
              },
              {
                title: "Từ bệnh viện: Góc nhìn bác sĩ",
                desc: "“Không từ bỏ” đó là chìa khóa của tôi. Chăm sóc bản thân, giữ tinh thần lạc quan và sống cuộc sống trọn vẹn.",
              },
              {
                title: "Sống khỏe mạnh với HIV",
                desc: "“Không từ bỏ” Đó là chìa khóa của tôi. Chăm sóc bản thân, giữ tinh thần lạc quan và sống cuộc sống trọn vẹn.",
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
            <button className="bg-blue-600 text-white border-2 px-6 py-2 rounded text-sm hover:bg-gray-100 hover:text-black transition-colors">
              Xem thêm
            </button>
          </div>
        </div>
      </section>
  );
};

export default StoriesSection;
