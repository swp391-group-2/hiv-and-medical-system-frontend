import type { Appointment } from "@/types/appointment/appointment";
import { type FC } from "react";

interface Props {
  appointment: Appointment;
}

const statusColors = {
  FINISHED: "bg-green-600 text-white",
  IN_PROGRESS: "bg-gray-200 text-gray-700",
  WAITING: "bg-gray-100 text-gray-600",
  LAB_COMPLETED: "bg-blue-100 text-blue-700",
  CANCELLED: "bg-red-100 text-red-600",
  COMPLETED: "bg-green-700 text-white",
  CHECKED_IN: "bg-yellow-100 text-yellow-700", // Added missing status
};

const PatientCard: FC<Props> = ({ appointment }) => {
  const { patient, time, startTime,  serviceType, status } =
    appointment;
  // Tạo initials từ tên bệnh nhân
  const initials = patient.fullName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center justify-between p-4 border rounded-xl">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold">
          {initials}
        </div>
        <div>
          <div className="font-semibold">{patient.fullName}</div>
          <div className="text-sm text-gray-500">
            {startTime || time || "?"} - {serviceType}
          </div>
        </div>
      </div>
      <div
        className={`px-3 py-1 text-sm rounded-full ${
          statusColors[status] || "bg-gray-100 text-gray-600"
        }`}
      >
        {status}
      </div>
    </div>
  );
};

export default PatientCard;
