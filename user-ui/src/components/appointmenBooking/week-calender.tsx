import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WeekCalendarProps {
  currentWeek: Date;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  onPrevWeek: () => void;
  onNextWeek: () => void;
}

const WeekCalendar = ({
  currentWeek,
  selectedDate,
  onDateSelect,
  onPrevWeek,
  onNextWeek,
}: WeekCalendarProps) => {
  const dayNames = ["CN", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy"];

  const getWeekDays = (date: Date) => {
    const days = [];
    const startOfWeek = new Date(date);
    const dayOfWeek = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek);

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const weekDays = getWeekDays(currentWeek);
  const weekStart = weekDays[0];
  const weekEnd = weekDays[6];

  const formatDateRange = () => {
    const startDay = weekStart.getDate();
    const endDay = weekEnd.getDate();
    const startMonth = weekStart.getMonth() + 1;
    const endMonth = weekEnd.getMonth() + 1;
    const year = weekStart.getFullYear();

    if (startMonth === endMonth) {
      return `${startDay} - ${endDay} THÁNG ${startMonth
        .toString()
        .padStart(2, "0")}-${year}`;
    } else {
      return `${startDay} THÁNG ${startMonth
        .toString()
        .padStart(2, "0")} - ${endDay} THÁNG ${endMonth
        .toString()
        .padStart(2, "0")}-${year}`;
    }
  };

  const isDateAvailable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const isSelected = (date: Date) => {
    if (!selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onPrevWeek}
          className="p-2 hover:bg-gray-100"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <div className="mx-6 text-center">
          <span className="text-lg font-semibold text-cyan-600">
            {formatDateRange()}
          </span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onNextWeek}
          className="p-2 hover:bg-gray-100"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((date, index) => (
          <div key={index} className="text-center">
            <div className="text-sm font-medium text-gray-600 mb-2">
              {dayNames[index]}
            </div>
            <button
              onClick={() => isDateAvailable(date) && onDateSelect(date)}
              className={`
                w-16 h-16 cursor-pointer rounded-lg text-sm font-medium transition-colors border-2
                ${
                  isSelected(date)
                    ? "bg-primary text-white border-cyan-500"
                    : isToday(date)
                    ? "border-cyan-300 bg-cyan-50 text-cyan-700"
                    : isDateAvailable(date)
                    ? "border-gray-200 hover:border-cyan-300 hover:bg-cyan-50 text-gray-700"
                    : "border-gray-100 text-gray-300 cursor-not-allowed"
                }
              `}
              disabled={!isDateAvailable(date)}
            >
              <div className="text-lg font-semibold">
                {date.getDate().toString().padStart(2, "0")}
              </div>
              <div className="text-xs">
                {date.getMonth() + 1}/{date.getFullYear()}
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekCalendar;
