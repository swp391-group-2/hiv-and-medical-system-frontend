import { useCurrentWeekSchedule } from "@/api/schedule";
import { Button } from "@/components/ui/button";
import type { Doctor } from "@/types/doctor";

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

export const CurrentSchedule = ({ doctor }: { doctor: Doctor }) => {
  const { data: weekSchedule = [] } = useCurrentWeekSchedule(
    doctor.doctorId,
    new Date().toString()
  );
  return (
    <div className="flex flex-col gap-3 items-end w-full h-full">
      <div className="w-11/12 grid grid-cols-7 gap-2">
        {daysOfWeek.map((day) => (
          <div className="text-center">
            <span className="text-sm font-semibold">{day}</span>
          </div>
        ))}
      </div>
      <div className="flex w-full h-full border shadow border-gray-100 rounded">
        <div className="w-1/12 flex flex-col justify-evenly border border-gray-300 ">
          {slotsInHour.map((slot) => (
            <div className="text-center">
              <span className="text-sm font-semibold">{slot}</span>
            </div>
          ))}
        </div>
        <div className="w-full grid grid-cols-7 gap-2 border border-gray-300"></div>
      </div>
      <div>
        <Button>Sửa</Button>
        <Button>Thêm lịch mới</Button>
      </div>
    </div>
  );
};
