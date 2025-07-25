// src/api/doctorSchedule.ts

import axios from "axios";
import { BASE_URL } from "./BaseURL";
import type { DoctorScheduleAppointment } from "@/types/schedule/doctorScheduleAppointment";
import type { DoctorWorkScheduleList } from "@/types/schedule/doctorWorkSchedule";
import { data } from "react-router-dom";

// Helper function to map service type
const mapServiceType = (
  serviceType?: string
): "Định kỳ" | "Khẩn cấp" | "Tái khám" => {
  switch (serviceType?.toLowerCase()) {
    case "consultation":
    case "regular":
      return "Định kỳ";
    case "emergency":
    case "urgent":
      return "Khẩn cấp";
    case "follow_up":
    case "followup":
      return "Tái khám";
    default:
      return "Định kỳ";
  }
};

export const fetchDoctorAppointments = async (
  date: string,
  status: string
): Promise<DoctorScheduleAppointment[]> => {
  const token = localStorage.getItem("accessToken");
  console.log("Token:", token);
  console.log(data);
  if (!token) throw new Error("Không có token");

  const response = await axios.get(
    `${BASE_URL}doctors/me/appointments/${status}`,
    {
      params: { date },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const appointments = response.data?.data;
  console.log("API trả về:", appointments);

  if (!Array.isArray(appointments)) return [];

  // Nếu API đã filter theo status và date, có thể bỏ filter dưới
  // Nếu không, hãy kiểm tra lại trường date trong từng appointment
  const filteredAppointments = appointments.filter(
    (appt: { date: string }) => appt.date === date
  );

  // Map về đúng DoctorScheduleAppointment
  return filteredAppointments.map(
    (appt: {
      doctorName?: string;
      appointmentId?: number;
      startTime?: string;
      time?: string;
      slotDescription?: string;
      date?: string;
      patient?: { phone?: string; address?: string };
      note?: string;
      serviceType?: string;
      status?: string;
    }) => ({
      name: appt.doctorName || "Chưa có tên bác sĩ",
      code: appt.appointmentId ? `APPT${appt.appointmentId}` : "Không rõ",
      time: appt.startTime || appt.time || "Không rõ",
      slot: appt.slotDescription || "Không rõ slot",
      date: appt.date || "Không rõ ngày",
      phone: appt.patient?.phone || "Không có",
      address: appt.patient?.address || "Không có",
      note: appt.note || "Không có ghi chú",
      type: mapServiceType(appt.serviceType),
      status:
        appt.status === "LAB_COMPLETED"
          ? "Hoàn thành"
          : appt.status === "IN_PROGRESS"
          ? "Đang khám"
          : appt.status === "WAITING"
          ? "Chờ khám"
          : "Chờ khám", // Default to "Chờ khám" instead of "Không rõ"
    })
  );
};

export const fetchDoctorScheduleById = async (
  doctorId: string
): Promise<DoctorWorkScheduleList> => {
  const token = localStorage.getItem("accessToken");

  if (!token) throw new Error("Không có token");

  try {
    const response = await axios.get(
      `${BASE_URL}doctors/${doctorId}/schedules`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const schedules = response.data?.data;
    // console.log("Lịch làm việc của bác sĩ:", schedules);

    if (!Array.isArray(schedules)) return [];

    // Trả về đúng cấu trúc từ API
    return schedules;
  } catch (error) {
    console.error("Lỗi khi lấy lịch làm việc của bác sĩ:", error);
    throw error;
  }
};

// Lấy lịch làm việc của bác sĩ hiện tại đang đăng nhập
export const fetchMyDoctorSchedule =
  async (): Promise<DoctorWorkScheduleList> => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.error("Không có token");
      return [];
    }

    try {
      // Lấy thông tin doctor trước rồi gọi theo doctorId
      // console.log("Lấy thông tin doctor...");
      const doctorInfo = await fetchCurrentDoctorInfo();

      if (!doctorInfo) {
        console.warn("Không lấy được thông tin bác sĩ");
        return [];
      }

      const doctorId = doctorInfo?.doctorId || doctorInfo?.id;

      if (!doctorId) {
        console.warn("Không tìm thấy doctorId từ thông tin bác sĩ");
        return [];
      }

      // console.log("Doctor ID được lấy:", doctorId);

      return await fetchDoctorScheduleById(doctorId);
    } catch (error) {
      console.error("Lỗi khi lấy lịch làm việc của tôi:", error);
      return [];
    }
  };

// Function để lấy thông tin doctor hiện tại
export const fetchCurrentDoctorInfo = async () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    console.error("Không có token");
    return null;
  }

  try {
    const response = await axios.get(`${BASE_URL}doctors/myInfo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log("Thông tin doctor:", response.data?.data);
    return response.data?.data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin doctor:", error);
    return null;
  }
};
