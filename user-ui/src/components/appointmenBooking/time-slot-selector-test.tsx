import ScheduleApi from "@/apis/schedule.api";
import type {
  TestScheduleApiResponse,
  TestScheduleSlotEntry,
} from "@/types/schedule.type";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
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
    return <div className="text-center text-lg">Đang loading...</div>;

  if (error)
    return <div className="text-red-500 text-2xl">{error.message}</div>;

  if (schedules && schedules.data.length != 0) {
    allSlots = schedules.data;
  } else {
    return (
      <div className="text-5xl text-center py-5">
        Không có lịch cho ngày này
      </div>
    );
  }

  console.log(allSlots);

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
