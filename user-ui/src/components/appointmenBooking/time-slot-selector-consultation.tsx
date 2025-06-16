import ScheduleApi from "@/apis/schedule.api";
import { cn } from "@/lib/utils";
import type { ScheduleApiResponse, ScheduleSlot } from "@/types/schedule.type";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useParams } from "react-router-dom";

interface TimeSlotSelectorProps {
  selectedTime: string;
  selectedDate: Date;
  onTimeSelect: (time: string, slot: ScheduleSlot) => void;
}

const TimeSlotSelectorConsultation = ({
  selectedTime,
  selectedDate,
  onTimeSelect,
}: TimeSlotSelectorProps) => {
  const { doctorId } = useParams<{ doctorId?: string }>();

  const dateQuery = format(selectedDate, "yyyy-MM-dd");

  let allSlots: ScheduleSlot[] = [];

  const {
    data: schedules,
    isLoading,
    error,
  } = useQuery<ScheduleApiResponse, Error>({
    queryKey: ["dailySchedule", doctorId, dateQuery],
    queryFn: ({ signal }) => {
      if (!doctorId) throw Error(error?.message);
      return ScheduleApi.getScheduleDoctorByDate(
        doctorId,
        { date: dateQuery },
        signal
      );
    },
  });

  if (isLoading)
    return <div className="text-center text-lg">Đang loading...</div>;

  if (error)
    return <div className="text-red-500 text-2xl">{error.message}</div>;

  if (schedules && schedules.data.length != 0) {
    allSlots = schedules.data[0].scheduleSlots;
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
                disabled={slot.status !== "AVAILABLE"}
                key={slot.id}
                onClick={() => onTimeSelect(slot.slot.startTime, slot)}
                className={cn(
                  "px-4 py-3 rounded-lg border text-sm font-medium transition-colors cursor-pointer",

                  selectedTime === slot.slot.startTime
                    ? "bg-primary text-white border-cyan-500"
                    : "bg-white text-gray-700 border-gray-200 hover:border-cyan-300 hover:bg-cyan-50",
                  slot.status !== "AVAILABLE" &&
                    "bg-gray-300 cursor-not-allowed border-0 hover:bg-gray-300 hover:border-0 "
                )}
              >
                {slot.slot.startTime} - {slot.slot.endTime}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimeSlotSelectorConsultation;
