import type { DoctorProfile } from "./doctor.type";
import type { LabResult } from "./LabResult.type";

import type { Prescription } from "./prescriptions.type";

export type AppointmentStatus =
  | "SCHEDULED"
  | "COMPLETED"
  | "CANCELLED"
  | "LAB_COMPLETED"
  | "CHECKED_IN";

export interface AppointmentEntry {
  appointmentId: number;
  appointmentCode: string;
  patientId: string;
  serviceName: string;
  serviceType: string;
  date: string;
  startTime: string;
  endTime: string;
  doctorName: string;
  labSampleId: number;
  status: AppointmentStatus;
}

export interface AppointmentApiResponse {
  code: number;
  success: boolean;
  message: string;
  data: AppointmentEntry[];
}

export type ResultStatus = "PENDING" | "COMPLETED" | "CANCELLED";

export type ParameterType = "NUMERIC" | "STRING";

export interface AppointmentCompletedEntry {
  appointmentId: number;
  appointmentCode: string;
  patientId: string;
  serviceName: string;
  serviceType: string;
  date: string;
  startTime: string;
  endTime: string;
  doctor: DoctorProfile;
  labResult: LabResult;
  patientPrescription: Prescription;
  status: AppointmentStatus;
}

export interface AppointmentCompletedApiResponse {
  code: number;
  success: boolean;
  message: string;
  data: AppointmentCompletedEntry[];
}
