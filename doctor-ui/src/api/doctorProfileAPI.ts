import axios from "axios";
import { BASE_URL } from "./BaseURL";

// // ✅ 1. Lấy toàn bộ bác sĩ (không cần thiết nữa nếu bạn chỉ lấy 1 người)
// export const fetchDoctors = async () => {
//   const response = await axios.get(`${BASE_URL}/hiv/api/doctors`);
//   return response.data;
// };

// ✅ 2. Lấy theo ID
// export const fetchDoctorById = async (doctorId: string) => {
//   const response = await axios.get(`${BASE_URL}/hiv/api/doctors/${doctorId}`);
//   return response.data;
// };

// // ✅ 3. Cập nhật
// export const updateDoctorProfile = async (doctorId: string, profileData: any) => {
//   const response = await axios.put(`${BASE_URL}/hiv/api/doctors/${doctorId}`, profileData);
//   return response.data;
// };
// export const fetchMyDoctorInfo = async () => {
//   const token = localStorage.getItem("accessToken"); // hoặc từ nơi bạn lưu token
//   const res = await axios.get(`${BASE_URL}/hiv/api/doctors/myInfo`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return res.data;
// };

// ✅ 1. Lấy thông tin bác sĩ theo ID
export const fetchDoctorById = async (doctorId: string) => {
  const response = await axios.get(`${BASE_URL}/hiv/api/doctors/${doctorId}`);

  return response.data?.data || null; // Đảm bảo an toàn nếu không có data
};

// ✅ 2. Cập nhật thông tin bác sĩ theo ID
export const updateDoctorProfile = async (
  doctorId: string,
  profileData: any
) => {
  const response = await axios.put(
    `${BASE_URL}/hiv/api/doctors/${doctorId}`,
    profileData
  );
  return response.data?.data || null;
};

// ✅ 3. Lấy thông tin của chính bác sĩ đã đăng nhập (KHÔNG cần token nữa)
export const fetchMyDoctorInfo = async () => {
  const res = await axios.get(`${BASE_URL}/hiv/api/doctors/myInfo`);
  return res.data?.data || null;
};
export const uploadDoctorAvatar = async (doctorId: string, file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(
    `${BASE_URL}/hiv/api/doctors/${doctorId}/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data?.data; // => { id, url, doctorId, active }
};