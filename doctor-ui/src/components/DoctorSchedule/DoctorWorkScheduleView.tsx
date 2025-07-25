import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  CheckCircle,
  UserX,
  User,
} from "lucide-react";
import { fetchMyDoctorSchedule } from "@/api/doctorSchedule";
import type { DoctorWorkScheduleList } from "@/types/schedule/doctorWorkSchedule";

const DoctorWorkScheduleView: React.FC = () => {
  const [schedules, setSchedules] = useState<DoctorWorkScheduleList>([]);
  const [loading, setLoading] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(new Date());

  // Fetch dữ liệu lịch làm việc
  const fetchScheduleData = async () => {
    setLoading(true);
    try {
      const data = await fetchMyDoctorSchedule();
      setSchedules(data);
      // console.log("Doctor work schedules:", data);
    } catch (error) {
      console.error("Error fetching work schedule:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScheduleData();
  }, []);

  // Navigation
  const goToPreviousWeek = () => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeek(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeek(newDate);
  };

  const goToCurrentWeek = () => {
    setCurrentWeek(new Date());
  };

  // Tính toán các ngày trong tuần
  const getWeekDays = () => {
    const week = [];
    const startOfWeek = new Date(currentWeek);

    // Tìm thứ 2 của tuần
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startOfWeek);
      currentDay.setDate(startOfWeek.getDate() + i);
      week.push(currentDay.toISOString().split("T")[0]);
    }

    return week;
  };

  const weekDays = getWeekDays();

  // Lấy lịch làm việc cho một ngày cụ thể
  const getScheduleForDate = (date: string) => {
    return schedules.find((schedule) => schedule.workDate === date);
  };

  // Hiển thị status slot
  const getStatusColor = (
    status:
      | "AVAILABLE"
      | "UNAVAILABLE"
      | "BLOCKED"
      | "EXPIRED"
      | "CHECKED_IN"
      | "EXPIRED_NO_CHECKED_IN"
  ) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-100 text-green-800 border-green-300";
      case "UNAVAILABLE":
        return "bg-red-100 text-red-800 border-red-300";
      case "BLOCKED":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "EXPIRED":
        return "bg-gray-100 text-gray-800 border-gray-300";
      case "CHECKED_IN":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "EXPIRED_NO_CHECKED_IN":
        return "bg-orange-100 text-orange-800 border-orange-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusText = (
    status:
      | "AVAILABLE"
      | "UNAVAILABLE"
      | "BLOCKED"
      | "EXPIRED"
      | "CHECKED_IN"
      | "EXPIRED_NO_CHECKED_IN"
  ) => {
    switch (status) {
      case "AVAILABLE":
        return "Có thể đặt lịch";
      case "UNAVAILABLE":
        return "Đã có lịch hẹn";
      case "BLOCKED":
        return "Đã bị khóa";
      case "EXPIRED":
        return "Đã hết hạn";
      case "CHECKED_IN":
        return "Bệnh nhân đã đến";
      case "EXPIRED_NO_CHECKED_IN":
        return "Bệnh nhân vắng mặt";
      default:
        return "Không xác định";
    }
  };

  // Time slots cố định
  const timeSlots = [
    { slotNumber: 1, startTime: "07:00", endTime: "08:00" },
    { slotNumber: 2, startTime: "08:00", endTime: "09:00" },
    { slotNumber: 3, startTime: "09:00", endTime: "10:00" },
    { slotNumber: 4, startTime: "10:00", endTime: "11:00" },
    { slotNumber: 5, startTime: "13:00", endTime: "14:00" },
    { slotNumber: 6, startTime: "14:00", endTime: "15:00" },
    { slotNumber: 7, startTime: "15:00", endTime: "16:00" },
    { slotNumber: 8, startTime: "16:00", endTime: "17:00" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Đang tải lịch làm việc...</div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-lg shadow">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold">Lịch làm việc của bác sĩ</h2>
          <div className="text-sm text-gray-600">
            Tuần từ {weekDays[0]} đến {weekDays[6]}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={goToPreviousWeek}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={goToCurrentWeek}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
          >
            <Calendar size={16} />
            Tuần hiện tại
          </button>

          <button
            onClick={goToNextWeek}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          {/* Header với các ngày */}
          <thead>
            <tr>
              <th className="w-20 p-2 border-b border-r bg-gray-50 text-sm font-medium">
                Slot
              </th>
              {weekDays.map((date, index) => {
                const dayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
                const dayObj = new Date(date);
                return (
                  <th key={date} className="p-2 border-b bg-gray-50 min-w-32">
                    <div className="text-sm font-medium">
                      {dayNames[index === 0 ? 0 : index]}
                    </div>
                    <div className="text-lg font-bold">{dayObj.getDate()}</div>
                    <div className="text-xs text-gray-600">{date}</div>
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* Body với các slot thời gian */}
          <tbody>
            {timeSlots.map((slot) => (
              <tr key={slot.slotNumber} className="h-16">
                <td className="p-2 border-r border-b bg-gray-50 text-center">
                  <div className="text-sm font-medium">
                    Slot {slot.slotNumber}
                  </div>
                  <div className="text-xs text-gray-600 flex items-center justify-center gap-1">
                    <Clock size={12} />
                    {slot.startTime}-{slot.endTime}
                  </div>
                </td>

                {weekDays.map((date) => {
                  const daySchedule = getScheduleForDate(date);
                  const scheduleSlot = daySchedule?.scheduleSlots.find(
                    (s) => s.slot.slotNumber === slot.slotNumber
                  );

                  return (
                    <td
                      key={`${date}-${slot.slotNumber}`}
                      className="p-2 border-b align-top"
                    >
                      <div className="min-h-12 !w-[150px] flex items-center justify-center">
                        {scheduleSlot ? (
                          <div
                            className={`p-2 rounded border text-xs text-center w-full ${getStatusColor(
                              scheduleSlot.status
                            )}`}
                          >
                            <div className="font-medium flex items-center justify-center gap-1">
                              {scheduleSlot.status === "CHECKED_IN" && (
                                <CheckCircle size={14} />
                              )}
                              {scheduleSlot.status ===
                                "EXPIRED_NO_CHECKED_IN" && <UserX size={14} />}
                              {scheduleSlot.status === "UNAVAILABLE" && (
                                <User size={14} />
                              )}
                              {scheduleSlot.status === "AVAILABLE" && (
                                <Calendar size={14} />
                              )}
                              <span>{getStatusText(scheduleSlot.status)}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="text-xs text-gray-400">
                            Chưa có lịch
                          </div>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="p-4 border-t bg-gray-50">
        <div className="text-sm font-medium mb-2">Chú thích:</div>
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 border border-green-300 rounded flex items-center justify-center">
              <Calendar size={10} />
            </div>
            <span>Có thể đặt lịch</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-100 border border-red-300 rounded flex items-center justify-center">
              <User size={10} />
            </div>
            <span>Đã có lịch hẹn</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded flex items-center justify-center">
              <CheckCircle size={10} />
            </div>
            <span>Bệnh nhân đã đến</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-100 border border-orange-300 rounded flex items-center justify-center">
              <UserX size={10} />
            </div>
            <span>Bệnh nhân vắng mặt</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
            <span>Đã bị khóa</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
            <span>Đã hết hạn</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 border border-gray-400 rounded"></div>
            <span>Chưa có lịch</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorWorkScheduleView;
