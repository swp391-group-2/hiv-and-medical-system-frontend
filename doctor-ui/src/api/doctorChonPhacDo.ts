import axios from "axios";
import { BASE_URL } from "./BaseURL";

// ✅ Lấy danh sách phác đồ ARV
export const fetchARVProtocols = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/hiv/api/prescriptions`);
    const data = res.data?.data;

    if (!Array.isArray(data)) {
      console.error("❌ Kết quả prescriptions không hợp lệ:", res.data);
      return [];
    }

    console.log("✅ prescriptions data:", data);
    return data; // mỗi item đã là Prescription
  } catch (error) {
    console.error("❌ Lỗi khi fetch phác đồ:", error);
    return [];
  }
};




// ✅ Chọn phác đồ điều trị cho cuộc hẹn
export const selectPrescription = async (
  appointmentId: number,
  prescriptionId: number
) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/hiv/api/appointments/${appointmentId}/prescription/${prescriptionId}`,
      "Chọn phác đồ ARV",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("❌ Lỗi khi chọn phác đồ điều trị:", error);
    throw error;
  }
};

// ✅ Lấy thông tin cảnh báo (dị ứng, bệnh kèm)
export const fetchPatientAlerts = async (patientId: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/hiv/api/patients/${patientId}`);
    const result = res.data?.data;

    return {
      allergy: result?.allergy || "Không rõ",
      comorbid: result?.comorbid || "Không rõ",
    };
  } catch (error) {
    console.error("❌ Lỗi khi lấy thông tin cảnh báo:", error);
    return {
      allergy: "Không rõ",
      comorbid: "Không rõ",
    };
  }
};

// ✅ Lấy CD4, VL, cân nặng, tuổi,...
export const fetchPatientInfo = async (patientId: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/hiv/api/patients/${patientId}`);
    return res.data?.data;
  } catch (error) {
    console.error("❌ Lỗi khi lấy thông tin bệnh nhân:", error);
    throw error;
  }
};
