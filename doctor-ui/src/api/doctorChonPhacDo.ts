import axios from "axios";

const BASE_URL = "http://localhost:8080/hiv";
const getToken = () => localStorage.getItem("accessToken");

// Lấy danh sách phác đồ ARV
export const fetchARVProtocols = async () => {
  const res = await axios.get(`${BASE_URL}/api/prescriptions`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.data.result;
};

// Chọn phác đồ điều trị cho cuộc hẹn
export const selectPrescription = async (
  appointmentId: number,
  prescriptionId: number
) => {
  const res = await axios.post(
    `${BASE_URL}/api/appointments/${appointmentId}/prescription/${prescriptionId}`,
    "Chọn phác đồ ARV",
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};

// Lấy thông tin cảnh báo (dị ứng, bệnh kèm)
export const fetchPatientAlerts = async (patientId: string) => {
  const res = await axios.get(`${BASE_URL}/api/patients/${patientId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  const result = res.data.result;
  return {
    allergy: result.allergy || "Không rõ",
    comorbid: result.comorbid || "Không rõ",
  };
};

// Lấy CD4, VL, cân nặng, tuổi,...
export const fetchPatientInfo = async (patientId: string) => {
  const res = await axios.get(`${BASE_URL}/api/patients/${patientId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.data.result;
};
