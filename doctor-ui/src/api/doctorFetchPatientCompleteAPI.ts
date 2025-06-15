import axios from "axios";
import { BASE_URL } from "./BaseURL";
import type { Appointment } from "@/types/appointment";

// Gọi API không cần token
export const fetchCompletedPatients = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/hiv/api/patients`);

    const data = res.data?.data;
    if (!Array.isArray(data)) {
      console.error("Dữ liệu không hợp lệ:", res.data);
      return [];
    }

    // In ra danh sách bệnh nhân
    console.log("Danh sách bệnh nhân:", data);

    // Nếu cần lọc thêm thì làm ở đây, VD:
    return data;
  } catch (err) {
    console.error("Lỗi khi gọi API:", err);
    return [];
  }
};
export const fetchAppointments = async (): Promise<Appointment[]> => {
  try {
    const res = await axios.get(`${BASE_URL}/hiv/api/appointments`);

    const data = res.data?.data;
    if (!Array.isArray(data)) {
      console.error("Dữ liệu appointments không hợp lệ:", res.data);
      return [];
    }

    console.log("Danh sách appointments:", data);

    return data;
  } catch (err) {
    console.error("Lỗi khi gọi API appointments:", err);
    return [];
  }
};