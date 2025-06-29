import { useCurrentWeekSchedule, useSlots } from "@/api/schedule";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Doctor, ScheduleSlot } from "@/types/doctor";
import { CalendarCheck, Pencil, Plus, Save } from "lucide-react";
import { useState } from "react";

const daysOfWeek = [
  "Thứ Hai",
  "Thứ Ba",
  "Thứ Tư",
  "Thứ Năm",
  "Thứ Sáu",
  "Thứ Bảy",
  "Chủ Nhật",
];
const slotsInHour = [
  "7:00-8:00",
  "8:00-9:00",
  "9:00-10:00",
  "10:00-11:00",

  "13:00-14:00",
  "14:00-15:00",
  "15:00-16:00",
  "16:00-17:00",
];

export const SelectedSchedule = ({
  dateInWeek,
  doctor,
}: {
  dateInWeek: Date;
  doctor: Doctor;
}) => {
  const { data: weekSchedule = [] } = useCurrentWeekSchedule(
    doctor.doctorId,
    dateInWeek
  );
  const { data: slots = [] } = useSlots();
  const slotsNumber = slots.map((slot) => slot.slotNumber);
  // const slotsNumber = useMemo(() => slots.map((slot) => slot.slotNumber), []);
  const [onEdit, setOnEdit] = useState(false);
  console.log(slots);
  console.log(slotsNumber);
  return (
    <div className="flex flex-col gap-3 items-end w-full h-full">
      <div className="w-11/12 grid grid-cols-7 gap-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center">
            <span className=" text-sm font-semibold">{day}</span>
          </div>
        ))}
      </div>
      <div className="flex w-full h-full border shadow border-gray-100 rounded">
        <div className="w-1/12 flex flex-col justify-evenly border border-gray-300 ">
          {slotsInHour.map((slot) => (
            <div key={slot} className="text-center">
              <span className="text-sm text-gray-500 font-semibold">
                {slot}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full grid grid-cols-7 gap-2 border pl-2 pr-2 border-gray-300">
          {weekSchedule.map((day) => (
            <div
              key={day.workDate}
              className="h-full flex flex-col gap-2 pt-4 pb-4 justify-evenly items-center rounded"
            >
              {slotsNumber.map((slotNumber, idx) => {
                const slotIndex = idx;
                const foundScheduleSlot = day.scheduleSlots.find(
                  (sSlot: ScheduleSlot) => sSlot.slot.slotNumber === slotNumber
                );
                const isOccupied = !!foundScheduleSlot;

                return (
                  <div
                    key={`${day.workDate}-${slotIndex}`}
                    className={cn(
                      "w-full h-full flex items-center justify-center border border-gray-300 rounded"
                    )}
                  >
                    {isOccupied ? (
                      <CalendarCheck className="text-green-400" />
                    ) : (
                      ""
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
            onClick={() => setOnEdit(false)}
          >
            Huỷ
          </Button>
        ) : (
          <Button
            variant="outline"
            className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white hover:text-white mr-2"
            onClick={() => setOnEdit(true)}
          >
            <Pencil />
            Sửa
          </Button>
        )}

        {onEdit ? (
          <Button
            variant="outline"
            className="cursor-pointer bg-green-500 hover:bg-green-600 text-white hover:text-white"
          >
            <Save /> Lưu
          </Button>
        ) : (
          <Button variant="outline" className="cursor-pointer">
            <Plus /> Thêm lịch mới
          </Button>
        )}
      </div>
    </div>
  );
};
