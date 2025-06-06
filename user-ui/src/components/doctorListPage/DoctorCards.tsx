import React from "react";

interface Doctor {
  name: string;
  specialty: string;
  rating: number;
}

interface DoctorCardsProps {
  doctors: Doctor[];
}

const DoctorCards: React.FC<DoctorCardsProps> = ({ doctors }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {doctors.map((doctor, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
        >
          <div className="w-full h-40 bg-gray-200 flex items-center justify-center mb-4 rounded">
            <span className="text-gray-400">Ảnh</span>
          </div>
          <h3 className="font-semibold">{doctor.name}</h3>
          <p className="text-gray-600 mb-2">Chuyên khoa {doctor.specialty}</p>
          <div className="flex items-center mb-3">
            <span className="text-yellow-400 mr-2">★★★★★</span>
            <span className="font-medium">{doctor.rating}</span>
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Đặt khám
          </button>
        </div>
      ))}
    </div>
  );
};

export default DoctorCards;
