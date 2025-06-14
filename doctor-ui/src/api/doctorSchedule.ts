// src/api/doctorSchedule.ts

import type { Appointment } from "@/types/appointment";

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


export async function fetchDoctorSchedule(doctorId: string, date: string): Promise<Appointment[]> {
  const response = await fetch(
    `http://localhost:8080/hiv/api/doctors/${doctorId}/schedules/date?date=${date}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${yourToken}` nếu cần
      },
    }
  );

  if (!response.ok) {
    throw new Error("Không thể lấy lịch khám");
  }

  const data = await response.json();

  // Định nghĩa kiểu cho slot
  interface ScheduleSlot {
    id: string;
    slot: {
      description?: string;
      startTime: string;
    };
    status: string;
  }

  // Mapping nếu response không khớp trực tiếp với Appointment
  return data.result.scheduleSlots.map((slot: ScheduleSlot) => ({
    name: slot.slot.description || "Bệnh nhân ẩn danh",
    code: `BN${slot.id}`,
    time: slot.slot.startTime,
    phone: "Không có",
    address: "Không có",
    note: "Tự động từ slot",
    type: "Định kỳ", // hoặc bạn có thể map từ slot.status nếu phù hợp
    status: slot.status === "AVAILABLE" ? "Chờ khám" : "Hoàn thành",
  }));
}
// src/api/doctorAPI.ts
export const getMyDoctorInfo = async () => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch("http://localhost:8080/hiv/api/doctors/myInfo", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Lỗi lấy thông tin bác sĩ");
  return response.json();
};
