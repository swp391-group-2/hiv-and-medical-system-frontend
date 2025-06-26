import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { fetchWeeklySchedule, getTimeSlots } from "@/api/weeklySchedule";
import type {
  WeeklyScheduleData,
  DayColumn,
  ScheduleAppointment,
} from "@/types/schedule/weeklySchedule";
import AppointmentCell from "./AppointmentCell";
import AppointmentDetailModal from "./AppointmentDetailModal";

const WeeklyScheduleView: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [scheduleData, setScheduleData] = useState<WeeklyScheduleData>({});
  const [loading, setLoading] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<ScheduleAppointment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const timeSlots = getTimeSlots();

  // Tính toán các ngày trong tuần - memoized để tránh tính toán lại không cần thiết
  const weekDays = React.useMemo(() => {
    const week: DayColumn[] = [];
    const startOfWeek = new Date(currentWeek);

    // Tìm thứ 2 của tuần (Monday = 1)
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startOfWeek);
      currentDay.setDate(startOfWeek.getDate() + i);

      const dayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

      week.push({
        date: currentDay.toISOString().split("T")[0],
        dayName: dayNames[currentDay.getDay()],
        dayNumber: currentDay.getDate().toString(),
      });
    }

    return week;
  }, [currentWeek]);

  // Fetch dữ liệu lịch
  const fetchScheduleData = React.useCallback(async () => {
    if (weekDays.length === 0) return;

    setLoading(true);
    try {
      const startDate = weekDays[0].date;
      const endDate = weekDays[6].date;

      const data = await fetchWeeklySchedule(startDate, endDate);
      setScheduleData(data);
    } catch (error) {
      console.error("Error fetching schedule:", error);
    } finally {
      setLoading(false);
    }
  }, [weekDays]);

  useEffect(() => {
    fetchScheduleData();
  }, [fetchScheduleData]);

  // Xử lý click vào appointment
  const handleAppointmentClick = (appointment: ScheduleAppointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

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

  // Format tháng/năm
  const formatMonthYear = () => {
    const firstDay = new Date(weekDays[0].date);
    const lastDay = new Date(weekDays[6].date);

    if (firstDay.getMonth() === lastDay.getMonth()) {
      return `Tháng ${firstDay.getMonth() + 1}/${firstDay.getFullYear()}`;
    } else {
      return `${firstDay.getMonth() + 1}/${firstDay.getFullYear()} - ${
        lastDay.getMonth() + 1
      }/${lastDay.getFullYear()}`;
    }
  };

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
          <div className="text-xl font-bold text-gray-600 ">
            {formatMonthYear()}
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
              {weekDays.map((day) => (
                <th key={day.date} className="p-2 border-b bg-gray-50 min-w-32">
                  <div className="text-sm font-medium">{day.dayName}</div>
                  <div className="text-lg font-bold">{day.dayNumber}</div>
                  <div className="text-xs text-gray-600">{day.date}</div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body với các slot thời gian */}
          <tbody>
            {timeSlots.map((slot) => (
              <tr key={slot.id} className="h-24">
                <td className="p-2 border-r border-b bg-gray-50 text-center">
                  <div className="text-sm font-medium">
                    Slot {slot.slotNumber}
                  </div>
                  <div className="text-xs text-gray-600">
                    {slot.startTime}-{slot.endTime}
                  </div>
                </td>

                {weekDays.map((day) => (
                  <td
                    key={`${day.date}-${slot.slotNumber}`}
                    className="p-1 border-b align-top"
                  >
                    <div className="min-h-20">
                      {scheduleData[day.date]?.[slot.slotNumber]?.map(
                        (appointment) => (
                          <AppointmentCell
                            key={appointment.appointmentId}
                            appointment={appointment}
                            onClick={() => handleAppointmentClick(appointment)}
                          />
                        )
                      )}
                    </div>
                  </td>
                ))}
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
            <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
            <span>Hoàn thành</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-100 border border-purple-300 rounded"></div>
            <span>XN hoàn thành</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
            <span>Đang khám</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
            <span>Chờ khám</span>
          </div>
        </div>
      </div>

      {/* Modal chi tiết cuộc hẹn */}
      <AppointmentDetailModal
        appointment={selectedAppointment}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default WeeklyScheduleView;
