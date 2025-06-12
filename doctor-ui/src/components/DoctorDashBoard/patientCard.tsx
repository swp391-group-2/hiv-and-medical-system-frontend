import type { Patient } from "@/pages/Dashboard/patientType";
import { FC } from "react";


interface Props {
  patient: Patient;
}

const statusColors = {
  "Hoàn thành": "bg-green-600 text-white",
  "Đang khám": "bg-gray-200 text-gray-700",
  "Chờ khám": "bg-gray-100 text-gray-600",
};

const PatientCard: FC<Props> = ({ patient }) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-xl">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold">
          {patient.initials}
        </div>
        <div>
          <div className="font-semibold">{patient.name}</div>
          <div className="text-sm text-gray-500">
            {patient.time} - {patient.type}
          </div>
        </div>
      </div>
      <div className={`px-3 py-1 text-sm rounded-full ${statusColors[patient.status]}`}>
        {patient.status}
      </div>
    </div>
  );
};

export default PatientCard;
