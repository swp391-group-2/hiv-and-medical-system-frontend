import React from "react";

const DoctorBookingSection = () => {
  return (
     <section className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-xl font-bold mb-6">
            Tìm bác sĩ & Đặt lịch
          </h2>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Nhập tên bác sĩ..."
              className="w-full md:w-5/5 p-2 border rounded"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Tìm kiếm
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Bs. Phạm Anh Quân", info: "BV. Tâm Anh" },
              { name: "Bs. Võng Thanh Tú", info: "BV. Chợ Rẫy" },
              { name: "Bs. Nguyễn Hoài Phương", info: "BV. Hùng Vương" },
            ].map((doc, idx) => (
              <div
                key={idx}
                className="bg-white p-4 border rounded-lg text-center"
              >
                <div className="w-32 h-32 mx-auto bg-gray-200 mb-4 rounded-full"></div>
                <h3 className="font-bold">{doc.name}</h3>
                <p className="text-sm text-gray-500">{doc.info}</p>
                <p className="text-xs mt-1">Giờ khám: 9:00, 14:00, 16:00</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2 text-sm">
                  Đặt lịch
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
};

export default DoctorBookingSection;
