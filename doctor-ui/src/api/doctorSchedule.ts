// src/api/doctorSchedule.ts

import type { Appointment } from "@/types/appointment/appointment";

// import type { Appointment } from "@/types/appointment";

// export async function fetchDoctorSchedule(
//   doctorId: string,
//   date: string
// ): Promise<Appointment[]> {
//   // Đổi endpoint về /result cho đúng với db.json
//   const response = await fetch("http://localhost:8080/result", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Lỗi khi fetch lịch làm việc bác sĩ");
//   }

//   const res = await response.json();

//   // Lấy scheduleSlots từ kết quả
//   const slots = res.scheduleSlots ?? [];

//   // Mapping dữ liệu từ API về Appointment[]
//   const appointments: Appointment[] = slots.map((slot: any, idx: number) => ({
//     name: `Bệnh nhân ${idx + 1}`,
//     code: `BN${slot.id}`,
//     time: slot.slot.startTime,
//     phone: "0123456789",
//     address: "Phòng khám số 1",
//     note: slot.slot.description || "Không có ghi chú",
//     type: "Định kỳ",
//     status: convertSlotStatus(slot.status),
//   }));

//   return appointments;
// }

// // Hàm chuyển đổi trạng thái slot về trạng thái cuộc hẹn
// function convertSlotStatus(status: string): "Chờ khám" | "Hoàn thành" {
//   return status === "AVAILABLE" ? "Chờ khám" : "Hoàn thành";
// }

//file endpoint dung
// src/api/doctorSchedule.ts

import axios from "axios";
import { BASE_URL } from "./BaseURL";
import type { DoctorScheduleAppointment } from "@/types/schedule/doctorScheduleAppointment";

export async function fetchDoctorSchedule(
  doctorId: string,
  date: string
): Promise<DoctorScheduleAppointment[]> {
  try {
    const response = await axios.get(
      `${BASE_URL}/hiv/api/doctors/${doctorId}/schedules/date`,
      { params: { date } }
    );

    const schedules = response.data.data; // danh sách lịch trong ngày

    if (!Array.isArray(schedules)) return [];

    const result: DoctorScheduleAppointment[] = [];

    schedules.forEach((schedule: any) => {
      const { workDate, scheduleSlots } = schedule;

      scheduleSlots.forEach((slot: any) => {
        result.push({
          name: slot.slot.description || "Chưa có mô tả",
          code: `BN${slot.id}`,
          time: slot.slot.startTime,
          slot: `Slot ${slot.slot.slotNumber}`,
          date: workDate,
          phone: "Không có",
          address: "Không có",
          note: "Tự động từ slot",
          type: "Định kỳ",
          status: slot.status === "AVAILABLE" ? "Chờ khám" : "Hoàn thành",
        });
      });
    });

    return result;
  } catch (error) {
    console.error("Lỗi khi fetch lịch khám:", error);
    return [];
  }
}
export const getMyDoctorInfo = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/hiv/api/doctors/myInfo`);
    return response.data?.data || null;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin bác sĩ:", error);
    throw new Error("Không thể lấy thông tin bác sĩ");
  }
};