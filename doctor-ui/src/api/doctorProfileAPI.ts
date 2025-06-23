import axios from "axios";
import { BASE_URL } from "./BaseURL";

// 1. Lấy thông tin bác sĩ theo ID
export const fetchDoctorById = async (email: string) => {
  const response = await axios.get(`${BASE_URL}doctors/${email}`);
  return response.data?.data || null;
};

// 2. Cập nhật thông tin bác sĩ theo email (sử dụng email làm định danh URL)
export const updateDoctorProfile = async (
  doctorId: string,
  profileData: any
) => {
  const response = await axios.put(
    `${BASE_URL}doctors/${doctorId}`,
    profileData
  );
  return response.data?.data || null;
};

// 3. Lấy thông tin của bác sĩ đã đăng nhập
export const fetchMyDoctorInfo = async () => {
  const res = await axios.get(`${BASE_URL}doctors/myInfo`);
  return res.data?.data || null;
};

// 4. Upload ảnh đại diện của bác sĩ theo email
export const uploadDoctorAvatar = async (doctorId:string, file: File) => {
  const formData = new FormData();
  // const encodedEmail = encodeURIComponent(email);
  formData.append("file", file);

  const response = await axios.post(
    `${BASE_URL}doctors/${doctorId}/upload`,
    formData
  );

  return response.data?.data || null;
};

// 5. Lấy thông tin hồ sơ bác sĩ theo email
export const getDoctorByEmail = async (email: string) => {
  const response = await axios.get(`${BASE_URL}doctors/doctorProfile/${email}`);
  return response.data?.data || null;
};

// 6. Lấy ảnh đại diện bác sĩ theo email (nếu dùng riêng)
export const getDoctorImgByEmail = async (email: string) => {
  const response = await axios.get(`${BASE_URL}doctors/doctorImg/${email}`);
  return response.data?.data || null;
};
