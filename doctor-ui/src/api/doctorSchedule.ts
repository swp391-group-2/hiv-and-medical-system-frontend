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

  const response = await axios.get(`${BASE_URL}doctors/me/appointments/${status}`, {
    params: { date },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const appointments = response.data?.data;
  if (!Array.isArray(appointments)) return [];

  // ⚠️ So sánh trực tiếp dạng chuỗi
  const filteredAppointments = appointments.filter(
    (appt: any) => appt.date === date
  );

  return filteredAppointments.map((appt: any) => ({
    name: appt.doctorName || "Chưa có tên bác sĩ",
    code: `APPT${appt.appointmentId}`,
    time: appt.startTime || "Không rõ",
    slot: appt.slotDescription || "Không rõ slot",
    date: appt.date,
    phone: appt.patient?.phone || "Không có",
    address: appt.patient?.address || "Không có",
    note: appt.note || "Không có ghi chú",
    type: appt.serviceType || "Không rõ loại",
    status: appt.status === "LAB_COMPLETED" ? "Hoàn thành" : "Chờ khám",
  }));
};
