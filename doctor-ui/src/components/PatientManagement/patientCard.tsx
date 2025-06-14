import React from "react";

import { Eye } from "lucide-react";
import type { Patient } from "@/types/patientType";

const PatientCard: React.FC<{ patient: Patient }> = ({ patient }) => {
  const tagColor =
    patient.hivStatus === "positive"
      ? "bg-red-100 text-red-600"
      : "bg-green-100 text-green-600";

  return (
    <div className="bg-white border rounded-xl p-4 shadow mb-3">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-lg">
            {patient.name}{" "}
            <span className={`text-sm px-2 py-1 rounded-full ${tagColor}`}>
              HIV ({patient.hivStatus === "positive" ? "+" : "-"})
            </span>
          </h2>
          <div className="text-sm text-gray-600">Mã BN: {patient.id}</div>
          <div className="text-sm text-gray-600">
            Giới tính: {patient.gender}
          </div>
          <div className="text-sm text-gray-600">Sinh: {patient.birthDate}</div>
          {patient.screeningResult && (
            <div className="text-sm">Sàng lọc: {patient.screeningResult}</div>
          )}
          {patient.confirmResult && (
            <div className="text-sm">Khẳng định: {patient.confirmResult}</div>
          )}
          {patient.cd4 && <div className="text-sm">CD4: {patient.cd4}</div>}
          {patient.vl && <div className="text-sm">VL: {patient.vl}</div>}
        </div>
        <button className="bg-gray-100 text-gray-800 rounded-full p-2 hover:bg-gray-200">
          <Eye size={18} />
        </button>
      </div>
    </div>
  );
};

export default PatientCard;
