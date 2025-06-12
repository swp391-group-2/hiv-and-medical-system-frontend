export type AppointmentStatus =
  | "SCHEDULED"
  | "CHECKED_IN"
  | "LAB_COMPLETED"
  | "COMPLETED";

export interface Appointment {
  id: number;
  patientName: string;
  patientPhone: string;
  type: string;
  date: string;
  time: string;
  doctor: string;
  status: AppointmentStatus;
}
