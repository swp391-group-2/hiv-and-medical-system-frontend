import type { Patient } from "@/pages/Dashboard/patientType";
import { FC } from "react";
import PatientCard from "./patientCard";



const mockPatients: Patient[] = [
  { name: "Nguyễn Văn A", time: "08:30", type: "Tái khám", initials: "NV", status: "Hoàn thành" },
  { name: "Trần Thị B", time: "09:15", type: "Khẩn cấp", initials: "TT", status: "Đang khám" },
  { name: "Lê Văn C", time: "10:00", type: "Định kỳ", initials: "LV", status: "Chờ khám" },
];

const PatientList: FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-bold mb-4">👥 Bệnh nhân hôm nay</h2>
      <div className="space-y-4">
        {mockPatients.map((patient, index) => (
          <PatientCard key={index} patient={patient} />
        ))}
      </div>
      <button className="mt-4 text-center w-full text-sm text-blue-600 hover:underline">
        Xem tất cả lịch hẹn
      </button>
    </div>
  );
};

export default PatientList;
