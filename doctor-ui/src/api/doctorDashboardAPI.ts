import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { BASE_URL } from "./BaseURL";
import type { Appointment } from "@/types/appointment";

// ✅ Get thông tin bác sĩ
export const getMyDoctorInfo = async () => {
  const res = await axios.get(`${BASE_URL}doctors/myInfo`);
  return res.data?.data || null; // ⚠️ đổi từ result -> data
};

// ✅ Get lịch làm hôm nay
export const getTodaySchedule = async () => {
  const today = new Date().toISOString().split("T")[0];
  const res = await axios.get(
    `${BASE_URL}doctors/me/schedules?startDate=${today}&endDate=${today}`
  );

  const data = res.data?.data;
  if (!Array.isArray(data)) {
    console.error("Lỗi dữ liệu: schedule không phải mảng", res.data);
    return [];
  }

  return data; // ✅ Trả mảng lịch làm hôm nay
};

// ✅ Get toàn bộ cuộc hẹn
export const getAllAppointments = async () => {
  const res = await axios.get(`${BASE_URL}appointments`);
  const data = res.data?.data;
  if (!Array.isArray(data)) {
    console.error("Lỗi dữ liệu: appointments không phải mảng", res.data);
    return [];
  }

  return data; // ✅ Trả mảng lịch hẹn
};
export const getAllAppointmentsByDoctor = async (): Promise<Appointment[]> => {
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
  const filtered = allAppointments.filter(
    (a: Appointment) =>
      a.doctorName === doctorFullName )
    return filtered;
}
