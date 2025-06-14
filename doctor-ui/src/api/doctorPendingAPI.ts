// src/api/doctorPendingAPI.ts
import axios from "axios";

const BASE_URL = "http://localhost:8080/hiv";
const getToken = () => localStorage.getItem("accessToken");

// Gọi API để lấy tất cả các lịch hẹn
export const fetchPendingAppointments = async () => {
  const res = await axios.get(`${BASE_URL}/api/appointments`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  // Chỉ giữ lại những lịch hẹn có serviceType = CONSULTATION và status = LAB_COMPLETED
  return res.data.result.filter(
    (item: any) =>
      item.serviceType === "CONSULTATION" && item.status === "LAB_COMPLETED"
  );
};
