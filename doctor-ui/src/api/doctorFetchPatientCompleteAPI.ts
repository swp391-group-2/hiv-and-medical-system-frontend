// doctorFetchPatientCompleteAPI.ts
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "./BaseURL";
import type { Appointment } from "@/types/appointment";
import type { Prescription } from "@/types/prescription";

export const fetchCompletedAppointmentsByDoctor = async (): Promise<Appointment[]> => {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("Không tìm thấy access token");

  const decoded = jwtDecode(token) as { sub: string };
  const doctorEmail = decoded.sub;

  // 1. Lấy profile bác sĩ theo email
  const profileRes = await axios.get(`${BASE_URL}doctors/doctorProfile/${doctorEmail}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const doctorFullName = profileRes.data.data.fullName;

  // 2. Lấy tất cả appointments
  const appointmentsRes = await axios.get(`${BASE_URL}appointments`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const allAppointments = appointmentsRes.data.data;

  // 3. Lọc theo doctorName và status === 'COMPLETED'
  const filtered = allAppointments.filter(
    (a: Appointment) =>
      a.doctorName === doctorFullName && a.status === "COMPLETED"
  );

  return filtered;
};
