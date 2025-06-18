import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "./BaseURL";
import type { Appointment } from "@/types/appointment";

export const fetchPendingAppointments = async (): Promise<Appointment[]> => {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("Không tìm thấy access token");

  const decoded = jwtDecode(token) as { sub: string };
  const doctorEmail = decoded.sub;

  // 1. Lấy profile bác sĩ theo email
  const profileRes = await axios.get(`${BASE_URL}doctors/doctorProfile/${doctorEmail}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const doctorFullName = profileRes.data.data.fullName;

  // 2. Lấy appointments có status = LAB_COMPLETED
  const res = await axios.get(`${BASE_URL}appointments/status/lab_completed`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = res.data?.data;

  if (!Array.isArray(data)) {
    console.error("Lỗi dữ liệu: data không phải mảng", res.data);
    return [];
  }

  // 3. Lọc theo điều kiện
  const filtered = data.filter(
    (item: Appointment) =>
      item.serviceType === "CONSULTATION" &&
      item.status === "LAB_COMPLETED" &&
      item.doctorName === doctorFullName
  );

  return filtered;
};
