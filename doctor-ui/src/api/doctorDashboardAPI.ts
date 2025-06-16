
import axios from "axios";
import { BASE_URL } from "./BaseURL";

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
