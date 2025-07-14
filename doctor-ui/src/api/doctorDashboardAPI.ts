import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { BASE_URL } from "./BaseURL";
import type { Appointment } from "@/types/appointment";

// ✅ Get thông tin bác sĩ với error handling
export const getMyDoctorInfo = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("Không tìm thấy access token");
    }

    // Thử endpoint /doctors/myInfo trước
    try {
      const res = await axios.get(`${BASE_URL}doctors/myInfo`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data?.data) {
        return res.data.data;
      }
    } catch {
      console.warn("❌ /doctors/myInfo failed, trying alternative...");
    }

    // Fallback: decode JWT và thử endpoint khác
    const decoded = jwtDecode(token) as { sub: string };
    const doctorEmail = decoded.sub;

    try {
      const res = await axios.get(
        `${BASE_URL}doctors/doctorProfile/${doctorEmail}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data?.data) {
        return res.data.data;
      }
    } catch {
      console.warn(
        "❌ /doctors/doctorProfile failed, trying /doctors/{email}..."
      );
    }

    // Thử endpoint /doctors/{email}
    try {
      const res = await axios.get(`${BASE_URL}doctors/${doctorEmail}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data?.data) {
        return res.data.data;
      }
    } catch {
      console.warn("❌ All doctor endpoints failed");
    }

    return null;
  } catch (error) {
    console.error("Error getting doctor info:", error);
    return null;
  }
};

// ✅ Get lịch làm hôm nay với error handling
export const getTodaySchedule = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.warn("No access token found");
      return [];
    }

    const today = new Date().toISOString().split("T")[0];
    const res = await axios.get(
      `${BASE_URL}doctors/me/schedules?startDate=${today}&endDate=${today}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = res.data?.data;
    if (!Array.isArray(data)) {
      console.error("Lỗi dữ liệu: schedule không phải mảng", res.data);
      return [];
    }

    return data;
  } catch (error) {
    console.error("Error getting today's schedule:", error);
    return [];
  }
};

// ✅ Get toàn bộ cuộc hẹn với error handling
export const getAllAppointments = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const res = await axios.get(`${BASE_URL}appointments`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    const data = res.data?.data;
    if (!Array.isArray(data)) {
      console.error("Lỗi dữ liệu: appointments không phải mảng", res.data);
      return [];
    }

    return data;
  } catch (error) {
    console.error("Error getting all appointments:", error);
    return [];
  }
};
export const getAllAppointmentsByDoctor = async (): Promise<Appointment[]> => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("Không tìm thấy access token");

    // // Thử lấy appointments theo doctor trực tiếp trước
    // try {
    //   const res = await axios.get(`${BASE_URL}doctors/me/appointments`, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   });
    //   if (res.data?.data && Array.isArray(res.data.data)) {
    //     return res.data.data;
    //   }
    // } catch {
    //   console.warn(
    //     "❌ /appointments/doctor/me failed, trying alternative method..."
    //   );
    // }

    // Fallback: lấy doctor info và filter appointments
    const decoded = jwtDecode(token) as { sub: string };
    const doctorEmail = decoded.sub;

    // Thử lấy doctor info
    let doctorFullName = "";
    try {
      const doctorInfo = await getMyDoctorInfo();
      if (doctorInfo?.fullName) {
        doctorFullName = doctorInfo.fullName;
      }
    } catch {
      console.warn("Could not get doctor info for filtering");
    }

    // Lấy tất cả appointments và filter
    const appointmentsRes = await axios.get(`${BASE_URL}appointments`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const allAppointments = appointmentsRes.data?.data || [];
    if (!Array.isArray(allAppointments)) {
      console.error("Invalid appointments data format");
      return [];
    }

    // Filter theo doctorName hoặc doctorEmail
    const filtered = allAppointments.filter((a: Appointment) => {
      return (
        (doctorFullName && a.doctorName === doctorFullName) ||
        (a.doctorName && a.doctorName.includes(doctorEmail))
      );
    });

    return filtered;
  } catch (error) {
    console.error("Error getting appointments by doctor:", error);
    return [];
  }
};
