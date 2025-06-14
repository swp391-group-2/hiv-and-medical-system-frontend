// src/api/doctorFetchPatientCompleteAPI.ts
import axios from "axios";

const BASE_URL = "http://localhost:8080/hiv";
const getToken = () => localStorage.getItem("accessToken");

// Gọi API để lấy toàn bộ danh sách bệnh nhân
export const fetchCompletedPatients = async () => {
  const res = await axios.get(`${BASE_URL}/api/patients`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  // Filter nếu cần, ví dụ chỉ bệnh nhân có VL, CD4 hoặc đã sàng lọc
  return res.data.result.filter((p: any) => 
    p.cd4 || p.vl || p.screeningResult || p.confirmResult
  );
};
