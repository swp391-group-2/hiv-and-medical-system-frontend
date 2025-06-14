
import type { Appointment } from "@/types/appointment";
import React from "react";

type Props = {
  data: Appointment;
};

const statusColor: Record<Appointment["type"], string> = {
  "Định kỳ": "text-blue-600",
  "Khẩn cấp": "text-red-600",
  "Tái khám": "text-gray-600",
  "Hoàn thành": "text-green-600",
};

const AppointmentCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 font-semibold">
            <span>{data.name}</span>
            <span className="text-sm bg-gray-200 px-2 py-1 rounded">
              {data.code}
            </span>
            <span
              className={`text-sm px-2 py-1 rounded ${statusColor[data.type]}`}
            >
              {data.type}
            </span>
          </div>
          <div className="text-sm text-gray-600 mt-1">
            <div>🕒 {data.time}</div>
            <div>📞 {data.phone}</div>
            <div>📍 {data.address}</div>
            <div>
              <strong>Ghi chú:</strong> {data.note}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-sm text-gray-500 mb-2">{data.status}</div>
          {data.status === "Chờ khám" && (
            <button className="bg-blue-500 text-white text-sm px-3 py-1 rounded">
              Bắt đầu khám
            </button>
          )}
          {data.status === "Đang khám" && (
            <button className="bg-gray-200 text-sm px-3 py-1 rounded">
              Tiếp tục khám
            </button>
          )}
          {data.status === "Hoàn thành" && (
            <span className="text-green-600 font-semibold">Hoàn thành</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
