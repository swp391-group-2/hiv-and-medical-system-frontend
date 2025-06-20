import type { DoctorScheduleAppointment } from "@/types/schedule/doctorScheduleAppointment";
import React from "react";
import { CalendarDays, Clock, Timer } from "lucide-react"; // optional icons

type Props = {
  data: DoctorScheduleAppointment;
};

const statusColor: Record<DoctorScheduleAppointment["type"], string> = {
  "Định kỳ": "text-blue-600 bg-blue-100",
  "Khẩn cấp": "text-red-600 bg-red-100",
  "Tái khám": "text-gray-600 bg-gray-100",
};

const AppointmentCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-100 hover:shadow-lg transition duration-300">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xl font-semibold text-gray-700">
              Mã:{" "}
              <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-lg text-base">
                {data.code}
              </span>
            </span>
            <span
              className={`text-sm font-medium px-3 py-1 rounded-full ${statusColor[data.type]}`}
            >
              {data.type}
            </span>
          </div>

          {/* Info */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-gray-600 text-base">
            <div className="flex items-center gap-2">
              <CalendarDays size={18} className="text-gray-500" />
              <span>Ngày: {data.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-gray-500" />
              <span>Giờ: {data.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <Timer size={18} className="text-gray-500" />
              <span>Slot: {data.slot}</span>
            </div>
            <div className="col-span-2">
              <strong>Ghi chú:</strong> {data.note || "Không có"}
            </div>
          </div>
        </div>

        {/* Status + Action */}
        <div className="flex flex-col items-end gap-2">
          <div className="text-sm text-gray-500 italic">{data.status}</div>
          {data.status === "Chờ khám" && (
            <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg shadow">
              Chờ khám
            </button>
          )}
          {data.status === "Đang khám" && (
            <button className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm px-4 py-2 rounded-lg shadow">
              Tiếp tục khám
            </button>
          )}
          {data.status === "Hoàn thành" && (
            <span className="text-green-600 font-semibold">✔ Hoàn thành</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
