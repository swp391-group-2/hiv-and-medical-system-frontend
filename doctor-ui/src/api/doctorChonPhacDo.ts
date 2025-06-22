import axios from "axios";
import { BASE_URL } from "./BaseURL";
import type { patientPrescription, patientPrescriptionItems } from "@/types/prescription";


// ✅ Lấy danh sách phác đồ ARV
export const fetchARVProtocols = async () => {
  try {
    const res = await axios.get(`${BASE_URL}prescriptions`);
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
      `${BASE_URL}appointments/${appointmentId}/prescription/${prescriptionId}`,
      "Chọn phác đồ ARV"
    );
    console.log("✅ Chọn phác đồ thành công:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Lỗi khi chọn phác đồ điều trị:", error);
    throw error;
  }
};

// ✅ Lấy thông tin cảnh báo (dị ứng, bệnh kèm)
export const fetchPatientAlerts = async (patientId: string) => {
  try {
    const res = await axios.get(`${BASE_URL}patients/${patientId}`);
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
    const res = await axios.get(`${BASE_URL}patients/${patientId}`);
    return res.data?.data;
  } catch (error) {
    console.error("❌ Lỗi khi lấy thông tin bệnh nhân:", error);
    throw error;
  }
};
// ✅ Lấy chi tiết appointment
export const fetchAppointmentDetail = async (appointmentId: number) => {
  const res = await axios.get(`${BASE_URL}appointments/${appointmentId}`);
  return res.data?.data;
};

// ✅ Cập nhật phác đồ

// export const updatePrescriptionItem = async (
// )=>{
//   try{
//     const res = await axios.post(
//     `${BASE_URL}prescriptions/patiens`,
//   )
//     console.log("✅ Cập nhật phác đồ thành công:", res.data);
//     return res.data;
//   }catch (error) {
//     console.error("❌ Lỗi khi cập nhật phác đồ:", error);
//     throw error;
//   }
// }
export const updatePrescriptionItem = async (
  appointmentId: number,
  prescriptionId: number,
  items: patientPrescriptionItems[],
  note: string 
) => {
  const patientPrescriptionItems = items.map((item) => ({
    dosage: item.dosage,
    frequency: item.frequency,
    quantity: Number(item.quantity) || 0,
    medicationId: item.medication.medicationId,
  }));

  const body = {
    duration: items[0]?.duration || "1 tháng",
    frequency: items[0]?.frequency || "1 lần/ngày",
    quantity: items[0]?.quantity ? Number(items[0].quantity) : 0,
    prescriptionId,
    appointmentId,
    note, 
    patientPrescriptionItems,
  };

  const res = await axios.post(`${BASE_URL}prescriptions/patients`, body);
  console.log("🔍 Body gửi lên server:", body);
  return res.data;
};


export const fetchPatientPrescription = async (
  appointmentId: number
): Promise<patientPrescription | null> => {
  try {
    const token = localStorage.getItem("accessToken");
    const res = await axios.get(`${BASE_URL}appointments/${appointmentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data?.data || null;
  } catch (err) {
    console.error("Lỗi khi lấy phác đồ bệnh nhân:", err);
    return null;
  }
};
export const getPatientDataByAppointmentId = async (
  appointmentId: number
): Promise<any> => {
  try {
    const token = localStorage.getItem("accessToken");
    const res = await axios.get(`${BASE_URL}appointments/${appointmentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Thông tin bệnh nhân thường nằm trong res.data.data.patient
    return res.data?.data?.patient || null;
  } catch (error) {
    console.error(
      "❌ Lỗi khi lấy thông tin bệnh nhân theo appointmentId:",
      error
    );
    return null;
  }
};
