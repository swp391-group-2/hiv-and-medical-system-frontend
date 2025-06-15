// src/api/selectPrescription.ts
import axios from "axios";
import { BASE_URL } from "./BaseURL";

// Gửi phác đồ vào cuộc hẹn
export const selectPrescription = async (
  appointmentId: number,
  prescriptionId: number
) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/hiv/api/appointments/${appointmentId}/prescription/${prescriptionId}`,
      {} // không cần token hoặc body phức tạp
    );
    return res.data;
  } catch (error) {
    console.error("❌ Lỗi khi chọn phác đồ:", error);
    throw error;
  }
};
