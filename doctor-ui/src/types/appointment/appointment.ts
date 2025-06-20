import type { LabResult } from "./labResult";
import type { LabSample } from "./labSample";

export interface Appointment {
  appointmentId: number;
  serviceType: "CONSULTATION" | "LAB" | "FOLLOW_UP";
  status:
    | "WAITING"
    | "CHECKED_IN"
    | "IN_PROGRESS"
    | "FINISHED"
    | "CANCELLED"
    | "LAB_COMPLETED"
    | "COMPLETED"; // ← thêm nếu cần

  date: string;
  time?: string;
  startTime?: string; // ← nếu bạn cần dùng
  endTime?: string;   // ← nếu bạn cần dùng

  scheduleSlotId?: number; // ✅ Thêm dòng này

  doctorName?: string;
  patient: {
    patientId: string;
    fullName: string;
    patientCode: string;
    gender?: string;
    dob: string;
  };

  labSample?: LabSample;
  labResult?: LabResult;
}
