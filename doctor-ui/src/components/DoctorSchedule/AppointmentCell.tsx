import React from "react";
import type { ScheduleAppointment } from "@/types/schedule/weeklySchedule";

interface AppointmentCellProps {
  appointment: ScheduleAppointment;
  onClick?: () => void;
}

const AppointmentCell: React.FC<AppointmentCellProps> = ({
  appointment,
  onClick,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 border-green-300 text-green-800";
      case "IN_PROGRESS":
        return "bg-blue-100 border-blue-300 text-blue-800";
      case "WAITING":
        return "bg-yellow-100 border-yellow-300 text-yellow-800";
      case "LAB_COMPLETED":
        return "bg-purple-100 border-purple-300 text-purple-800";
      default:
        return "bg-gray-100 border-gray-300 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "Hoàn thành";
      case "IN_PROGRESS":
        return "Đang khám";
      case "WAITING":
        return "Chờ khám";
      case "LAB_COMPLETED":
        return "XN hoàn thành";
      default:
        return status;
    }
  };

  return (
    <div
      className={`p-2 mb-1 rounded border text-xs cursor-pointer hover:shadow-md transition-shadow ${getStatusColor(
        appointment.status
      )}`}
      onClick={onClick}
    >
      <div className="font-semibold">{appointment.appointmentCode}</div>
      <div className="truncate">{appointment.patient.fullName}</div>
      <div className="text-xs opacity-75">
        {appointment.startTime}-{appointment.endTime}
      </div>
      <div className="text-xs mt-1 px-1 py-0.5 rounded bg-white bg-opacity-50">
        {getStatusText(appointment.status)}
      </div>
    </div>
  );
};

export default AppointmentCell;
