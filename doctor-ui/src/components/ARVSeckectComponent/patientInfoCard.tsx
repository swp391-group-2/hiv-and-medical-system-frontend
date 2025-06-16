import type { Patient } from "@/types/patientType";


const PatientInfoCard = ({ patientInfo }: { patientInfo: Patient }) => {
  return (
    <div className="bg-blue-50 p-4 rounded shadow text-blue-900">
      <p className="font-bold">Họ tên: {patientInfo.fullName}</p>
      <p>ID: {patientInfo.patientId}</p>
      <div className="bg-white text-blue-800 p-3 rounded border-2 border-blue-200 mb-2">
        <p className="font-bold ">Ngày sinh: {patientInfo.dob}</p>
      </div>
      <div className="bg-white text-blue-800 p-3 rounded border-2 border-blue-200 mb-2">
        <p className="font-bold ">Cân nặng: {patientInfo.weight}</p>
      </div>
      <div className="bg-white text-blue-800 p-3 rounded border-2 border-blue-200 mb-2">
        <p className="font-bold ">Giới tính: {patientInfo.gender}</p>
      </div>
    </div>
  );
};

export default PatientInfoCard;
