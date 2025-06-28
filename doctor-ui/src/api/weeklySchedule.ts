// src/api/weeklySchedule.ts

import axios from "axios";
import { BASE_URL } from "./BaseURL";
import type {
  ScheduleAppointment,
  WeeklyScheduleData,
} from "@/types/schedule/weeklySchedule";

export const fetchWeeklySchedule = async (
  startDate: string,
  endDate: string
): Promise<WeeklyScheduleData> => {
  const token = localStorage.getItem("accessToken");

  if (!token) throw new Error("Không có token");

  try {
    // Thử gọi với nhiều status khác nhau để lấy hết dữ liệu
    const statuses = ["COMPLETED", "LAB_COMPLETED", "IN_PROGRESS", "WAITING"];
    const allAppointments: ScheduleAppointment[] = [];

    for (const status of statuses) {
      try {
        const response = await axios.get(
          `${BASE_URL}doctors/me/appointments/${status}`,
          {
            params: {
              startDate,
              endDate,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const appointments = response.data?.data;
        if (Array.isArray(appointments)) {
          // Filter theo khoảng thời gian
          const filteredAppointments = appointments.filter(
            (appt: ScheduleAppointment) => {
              return appt.date >= startDate && appt.date <= endDate;
            }
          );
          allAppointments.push(...filteredAppointments);
        }
      } catch (statusError) {
        console.warn(`Error fetching status ${status}:`, statusError);
      }
    }

    console.log("Weekly schedule API response:", allAppointments);

    // Nhóm appointments theo ngày và slot
    const weeklyData: WeeklyScheduleData = {};

    allAppointments.forEach((appt: ScheduleAppointment) => {
      const date = appt.date;
      const slotNumber = getSlotNumber(appt.startTime);

      if (!weeklyData[date]) {
        weeklyData[date] = {};
      }

      if (!weeklyData[date][slotNumber]) {
        weeklyData[date][slotNumber] = [];
      }

      weeklyData[date][slotNumber].push({
        appointmentId: appt.appointmentId,
        appointmentCode: appt.appointmentCode,
        date: appt.date,
        startTime: appt.startTime,
        endTime: appt.endTime,
        doctorName: appt.doctorName,
        patient: {
          patientId: appt.patient?.patientId || "",
          fullName: appt.patient?.fullName || "Không rõ",
          email: appt.patient?.email || "",
          phone: appt.patient?.phone,
          address: appt.patient?.address,
        },
        serviceName: appt.serviceName,
        serviceType: appt.serviceType,
        status: appt.status,
        slotDescription: appt.slotDescription,
        note: appt.note,
        labResult: appt.labResult,
        labSample: appt.labSample,
        patientPrescription: appt.patientPrescription,
        price: appt.price || 0,
        scheduleSlotId: appt.scheduleSlotId,
      });
    });

    return weeklyData;
  } catch (error) {
    console.error("Error fetching weekly schedule:", error);
    throw error;
  }
};

// Hàm chuyển đổi thời gian thành slot number
const getSlotNumber = (startTime: string): number => {
  const hour = parseInt(startTime.split(":")[0]);

  // Slot 1: 7:00-8:00, Slot 2: 8:00-9:00, etc.
  if (hour >= 7 && hour < 8) return 1;
  if (hour >= 8 && hour < 9) return 2;
  if (hour >= 9 && hour < 10) return 3;
  if (hour >= 10 && hour < 11) return 4;
  if (hour >= 13 && hour < 14) return 5;
  if (hour >= 14 && hour < 15) return 6;
  if (hour >= 15 && hour < 16) return 7;
  if (hour >= 16 && hour < 17) return 8;

  return 1; // Default slot
};

export const getTimeSlots = () => [
  { id: "slot1", startTime: "07:00", endTime: "08:00", slotNumber: 1 },
  { id: "slot2", startTime: "08:00", endTime: "09:00", slotNumber: 2 },
  { id: "slot3", startTime: "09:00", endTime: "10:00", slotNumber: 3 },
  { id: "slot4", startTime: "10:00", endTime: "11:00", slotNumber: 4 },
  { id: "slot5", startTime: "13:00", endTime: "14:00", slotNumber: 5 },
  { id: "slot6", startTime: "14:00", endTime: "15:00", slotNumber: 6 },
  { id: "slot7", startTime: "15:00", endTime: "16:00", slotNumber: 7 },
  { id: "slot8", startTime: "16:00", endTime: "17:00", slotNumber: 8 },
];
