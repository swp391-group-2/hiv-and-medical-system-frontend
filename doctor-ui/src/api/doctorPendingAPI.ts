import axios from "axios";
import { BASE_URL } from "./BaseURL";

export const fetchPendingAppointments = async () => {
  const res = await axios.get(`${BASE_URL}appointments/status/lab_completed`);

  const data = res.data?.data; // ⚠️ Đổi từ result -> data
  if (!Array.isArray(data)) {
    console.error("Lỗi dữ liệu: data không phải mảng", res.data);
    return [];
  }

  return data.filter(
    (item: any) =>
      item.serviceType === "CONSULTATION" &&
      item.status === "LAB_COMPLETED"
  );
};
