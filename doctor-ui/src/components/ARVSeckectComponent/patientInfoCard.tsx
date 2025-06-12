import type { PatientInfo } from "@/pages/ARVSelect/type";



const PatientInfoCard = ({ patientInfo }: { patientInfo: PatientInfo }) => {
  return (
    <div className="bg-blue-50 p-4 rounded shadow text-blue-900">
      <h2 className="text-lg font-semibold mb-2">Thông tin bệnh nhân</h2>
      <p>Họ tên: {patientInfo.name}</p>
      <p>ID: {patientInfo.id}</p>
      <p>Tuổi: {patientInfo.age}</p>
      <p>Cân nặng: {patientInfo.weight}</p>
    </div>
  );
};

export default PatientInfoCard;