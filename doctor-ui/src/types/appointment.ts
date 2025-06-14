import type { LabResult } from "./labResult";
import type { LabSample } from "./labSample";

export interface Appointment {
  appointmentId: number;
  serviceType: "CONSULTATION" | "LAB" | "FOLLOW_UP";
  status: "WAITING" | "CHECKED_IN" | "IN_PROGRESS" | "FINISHED" | "CANCELLED" | "LAB_COMPLETED";

  date: string;
  time?: string;

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
