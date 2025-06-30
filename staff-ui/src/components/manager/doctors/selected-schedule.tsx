import { useCurrentWeekSchedule, useSlots } from "@/api/schedule";
import { Button } from "@/components/ui/button";
import { cn, formatDMY } from "@/lib/utils";
import type { Doctor, ScheduleSlot, Schedule } from "@/types/doctor";
import { CalendarCheck, Pencil, Plus, Save, Loader2 } from "lucide-react"; // Import Loader2
import { useState, useEffect, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query"; // Import useMutation and useQueryClient
import { toast } from "sonner"; // Import toast
import http from "@/api/http";

interface BackendSchedulePayload {
  workDate: string;
  slotId: number[];
}

export const SelectedSchedule = ({
  dateInWeek,
  doctor,
}: {
  dateInWeek: Date;
  doctor: Doctor;
}) => {
  const queryClient = useQueryClient();
  const { data: initialWeekSchedule = [], isLoading } = useCurrentWeekSchedule(
    doctor.doctorId,
    dateInWeek
  );
  const { data: slotsData = [] } = useSlots();
  const slotsInHour = useMemo(
    () => slotsData.map((slot) => `${slot.startTime}-${slot.endTime}`),
    [slotsData]
  );

  const [editableWeekSchedule, setEditableWeekSchedule] = useState<Schedule[]>(
    []
  );
  const [onEdit, setOnEdit] = useState(false);

  useEffect(() => {
    if (initialWeekSchedule.length > 0) {
      setEditableWeekSchedule(JSON.parse(JSON.stringify(initialWeekSchedule)));
    }
  }, [initialWeekSchedule]);

  const { mutate: updateDoctorSchedule, isPending: isUpdating } = useMutation<
    void,
    Error,
    BackendSchedulePayload[]
  >({
    mutationFn: async (payload) =>
      http.post(`/doctors/${doctor.doctorId}/schedules/generate`, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["weekSchedule", doctor.doctorId],
      });
      toast.success("Cập nhật lịch làm việc thành công!");
      setOnEdit(false);
    },
    onError: (error) => {
      toast.error(`Lỗi cập nhật lịch: ${error.message}`);
    },
  });

  const handleSlotToggle = (workDate: string, slotNumber: number) => {
    if (!onEdit) return;

    setEditableWeekSchedule((prevSchedule) => {
      return prevSchedule.map((day) => {
        if (day.workDate === workDate) {
          const currentSlots = day.scheduleSlots;
          const slotExists = currentSlots.find(
            (sSlot) => sSlot.slot.slotNumber === slotNumber
          );

          if (slotExists) {
            return {
              ...day,
              scheduleSlots: currentSlots.filter(
                (sSlot) => sSlot.slot.slotNumber !== slotNumber
              ),
            };
          } else {
            const newSlotDetail = slotsData.find(
              (s) => s.slotNumber === slotNumber
            );

            if (!newSlotDetail) {
              console.error(
                `SlotDetail for slotNumber ${slotNumber} not found!`
              );
              return day;
            }

            const newScheduleSlot: ScheduleSlot = {
              id: 0,
              scheduleId: 0,
              slot: newSlotDetail,
              status: "AVAILABLE",
            };

            return {
              ...day,
              scheduleSlots: [...currentSlots, newScheduleSlot],
            };
          }
        }
        return day;
      });
    });
  };

  const handleSaveSchedule = () => {
    // Transform the editableWeekSchedule into the backend's expected format
    const payload: BackendSchedulePayload[] = editableWeekSchedule.map(
      (day) => ({
        workDate: day.workDate,
        slotId: day.scheduleSlots.map((sSlot) => sSlot.slot.id), // Extract slot.id from each ScheduleSlot
      })
    );

    console.log("Transformed payload for backend:", payload);
    updateDoctorSchedule(payload);
  };

  const handleCancelEdit = () => {
    if (initialWeekSchedule.length > 0) {
      setEditableWeekSchedule(JSON.parse(JSON.stringify(initialWeekSchedule)));
    } else {
      setEditableWeekSchedule([]);
    }
    setOnEdit(false);
  };

  if (isLoading) {
    return <div className="text-center py-8">Đang tải lịch làm việc...</div>;
  }

  return (
    <div className="flex flex-col gap-3 items-end w-full h-full">
      <div className="w-11/12 grid grid-cols-7 gap-2">
        {initialWeekSchedule.map((day, idx) => (
          <div key={day.workDate} className="text-center flex flex-col">
            <span className=" text-sm font-semibold">
              {idx === 6 ? "Chủ nhật" : `Thứ ${idx + 2}`}
            </span>
            <span className=" text-sm text-gray-500 font-semibold">{`(${formatDMY(
              day.workDate
            )})`}</span>
          </div>
        ))}
      </div>
      <div className="flex w-full h-full border shadow border-gray-100 rounded">
        <div className="w-1/12 flex flex-col justify-evenly border border-gray-300 ">
          {slotsInHour.map((slotTime) => (
            <div key={slotTime} className="text-center">
              <span className="text-sm text-gray-500 font-semibold">
                {slotTime}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full grid grid-cols-7 gap-2 border pl-2 pr-2 border-gray-300">
          {editableWeekSchedule.map((day) => (
            <div
              key={day.workDate}
              className="h-full flex flex-col gap-2 pt-4 pb-4 justify-evenly items-center rounded"
            >
              {slotsData.map((slotDetail) => {
                const slotNumber = slotDetail.slotNumber;
                const foundScheduleSlot = day.scheduleSlots.find(
                  (sSlot: ScheduleSlot) => sSlot.slot.slotNumber === slotNumber
                );
                const isOccupied = !!foundScheduleSlot;

                return (
                  <div
                    key={`${day.workDate}-${slotNumber}`}
                    className={cn(
                      "w-full h-full flex items-center justify-center border border-gray-300 rounded",
                      onEdit && "cursor-pointer hover:bg-gray-100",
                      isOccupied ? "bg-green-400" : ""
                    )}
                    onClick={() => handleSlotToggle(day.workDate, slotNumber)}
                  >
                    {isOccupied ? (
                      <CalendarCheck className="text-white" />
                    ) : (
                      <Plus
                        className={cn(
                          "text-gray-300",
                          onEdit && "text-blue-400"
                        )}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {onEdit ? (
          <Button
            variant="destructive"
            className="cursor-pointer"
            onClick={handleCancelEdit}
          >
            Huỷ
          </Button>
        ) : (
          ""
          //   <Button
          //     variant="outline"
          //     className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white hover:text-white mr-2"
          //   >
          //     <Pencil className="mr-2 h-4 w-4" />
          //     Sửa
          //   </Button>
        )}

        {onEdit ? (
          <Button
            variant="outline"
            className="cursor-pointer bg-green-500 hover:bg-green-600 text-white hover:text-white"
            onClick={handleSaveSchedule}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang lưu...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Lưu
              </>
            )}
          </Button>
        ) : (
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => setOnEdit(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Thêm lịch mới
          </Button>
        )}
      </div>
    </div>
  );
};
