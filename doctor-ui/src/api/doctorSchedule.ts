// src/api/doctorSchedule.ts

import axios from "axios";
import { BASE_URL } from "./BaseURL";
import type { DoctorScheduleAppointment } from "@/types/schedule/doctorScheduleAppointment";

export const fetchDoctorAppointments = async (
  date: string,
  status: string
): Promise<DoctorScheduleAppointment[]> => {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("Không có token");

  const response = await axios.get(
    `${BASE_URL}doctors/me/appointments/${status}`,
    {
      params: { date },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const appointments = response.data?.data;
  console.log("API trả về:", appointments);

  if (!Array.isArray(appointments)) return [];

  // Nếu API đã filter theo status và date, có thể bỏ filter dưới
  // Nếu không, hãy kiểm tra lại trường date trong từng appointment
  const filteredAppointments = appointments.filter(
    (appt: any) => appt.date === date
  );

  // Map về đúng DoctorScheduleAppointment
  return filteredAppointments.map((appt: any) => ({
    name: appt.doctorName || "Chưa có tên bác sĩ",
    code: appt.appointmentId ? `APPT${appt.appointmentId}` : "Không rõ",
    time: appt.startTime || appt.time || "Không rõ",
    slot: appt.slotDescription || "Không rõ slot",
    date: appt.date || "Không rõ ngày",
    phone: appt.patient?.phone || "Không có",
    address: appt.patient?.address || "Không có",
    note: appt.note || "Không có ghi chú",
    type: appt.serviceType || "Không rõ loại",
    status:
      appt.status === "LAB_COMPLETED"
        ? "Hoàn thành"
        : appt.status === "IN_PROGRESS"
        ? "Đang khám"
        : appt.status === "WAITING"
        ? "Chờ khám"
        : "Không rõ",
  }));
};
