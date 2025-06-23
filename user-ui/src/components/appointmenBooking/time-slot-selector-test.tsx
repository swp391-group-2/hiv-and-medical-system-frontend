import ScheduleApi from "@/apis/schedule.api";
import type {
  TestScheduleApiResponse,
  TestScheduleSlotEntry,
} from "@/types/schedule.type";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarX } from "lucide-react";
import { useParams } from "react-router-dom";

interface TimeSlotSelectorProps {
  selectedTime: string;
  selectedDate: Date;
  onTimeSelect: (time: string, slot: TestScheduleSlotEntry) => void;
}

const TimeSlotSelectorTest = ({
  selectedTime,
  selectedDate,
  onTimeSelect,
}: TimeSlotSelectorProps) => {
  const { doctorId } = useParams<{ doctorId?: string }>();

  const dateQuery = format(selectedDate, "yyyy-MM-dd");

  let allSlots: TestScheduleSlotEntry[] = [];

  const {
    data: schedules,
    isLoading,
    error,
  } = useQuery<TestScheduleApiResponse, Error>({
    queryKey: ["dailySchedule", doctorId, dateQuery],
    queryFn: ({ signal }) => {
      return ScheduleApi.getTestScheduleByDate({ date: dateQuery }, signal);
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center text-center text-lg">
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-primary animate-bounce" />
          <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:-.3s]" />
          <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:-.5s]" />
        </div>
      </div>
    );

  if (error)
    return <div className="text-red-500 text-2xl">{error.message}</div>;

  if (schedules && schedules.data.length != 0) {
    allSlots = schedules.data;
  } else {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <CalendarX className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Không có lịch khám
        </h3>
        <p className="text-gray-500 text-center text-sm">
          Bác sĩ chưa có lịch khám cho ngày này. Vui lòng chọn ngày khác.
        </p>
      </div>
    );
  }

  const morningSlots = allSlots.filter((slot) => {
    const hour = parseInt(slot.slot.endTime.split(":")[0]);
    return hour < 12;
  });

  const afternoonSlots = allSlots.filter((slot) => {
    const hour = parseInt(slot.slot.endTime.split(":")[0]);
    return hour >= 12;
  });

  const sessions = [
    { title: "Buổi sáng", slots: morningSlots },
    { title: "Buổi chiều", slots: afternoonSlots },
  ];

  return (
    <div className="border-t pt-6">
      {sessions.map((session, index) => (
        <div key={index} className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {session.title}
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {session.slots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => onTimeSelect(slot.slot.startTime, slot)}
                className={`
                  px-4 cursor-pointer py-3 rounded-lg border text-sm font-medium transition-colors
                  ${
                    selectedTime === slot.slot.startTime
                      ? "bg-primary text-white border-cyan-500"
                      : "bg-white text-gray-700 border-gray-200 hover:border-cyan-300 hover:bg-cyan-50"
                  }
                `}
              >
                {slot.slot.startTime + "-" + slot.slot.endTime}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimeSlotSelectorTest;
