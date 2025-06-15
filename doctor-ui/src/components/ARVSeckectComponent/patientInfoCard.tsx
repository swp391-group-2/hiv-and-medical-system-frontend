import type { PatientInfo } from "@/pages/ARVSelect/type";

const PatientInfoCard = ({ patientInfo }: { patientInfo: PatientInfo }) => {
  return (
    <div className="bg-blue-50 p-4 rounded shadow text-blue-900">
      
      <p className="font-bold">Họ tên: {patientInfo.name}</p>
      <p>ID: {patientInfo.id}</p>
      <div className="bg-white text-blue-800 p-3 rounded border-2 border-blue-200 mb-2">
        <p className="font-bold ">Tuổi: {patientInfo.age}</p>
      </div>
      <div className="bg-white text-blue-800 p-3 rounded border-2 border-blue-200 mb-2">
        <p className="font-bold ">Cân nặng: {patientInfo.weight}</p>
      </div>
    </div>
  );
};

export default PatientInfoCard;
