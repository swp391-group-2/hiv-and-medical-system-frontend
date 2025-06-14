import axios from "axios";

export const BASE_URL = "http://localhost:8080";

// ✅ 1. Lấy toàn bộ bác sĩ (không cần thiết nữa nếu bạn chỉ lấy 1 người)
export const fetchDoctors = async () => {
  const response = await axios.get(`${BASE_URL}/doctors`);
  return response.data;
};

// ✅ 2. Lấy theo ID
export const fetchDoctorById = async (doctorId: string) => {
  const response = await axios.get(`${BASE_URL}/doctors/${doctorId}`);
  return response.data;
};

// ✅ 3. Cập nhật
export const updateDoctorProfile = async (doctorId: string, profileData: any) => {
  const response = await axios.put(`${BASE_URL}/doctors/${doctorId}`, profileData);
  return response.data;
};
export const fetchMyDoctorInfo = async () => {
  const token = localStorage.getItem("accessToken"); // hoặc từ nơi bạn lưu token
  const res = await axios.get(`${BASE_URL}/doctors/myInfo`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
