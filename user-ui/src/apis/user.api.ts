

import type {
  UserProfileResponse,
  UserProfileUpdateValues,
} from "@/types/userProfile.type";
import http from "./http";
import type {
  AppointmentApiResponse,
  AppointmentCompletedApiResponse,
} from "@/types/appointment.type";
import type { PrescriptionsResponse } from "@/types/prescriptions.type";
import type { LabResultResponse } from "@/types/LabResult.type";

export const URL_PATIENT_PROFILE = "patients/myInfo";
export const URL_PATIENT_APPOINTMENTS = "patients/me/appointments"
export const URL_PATIENT_PRESCRIPTIONS = "patients/me/prescriptions"
export const URL_PATIENT_APPOINTMENTS_COMPLETED = "patients/me/appointmentsCompleted"
export const URL_PATIENT_TEST_RESULTS = "patients/me/test/results"

export const getPatientProfileByEmailUrl = (email: string) => {
  return `patients/patientProfile/${email}`;
};

export const getPatientProfileByIdUrl = (patientId: string) => {
  return `patients/${patientId}`;
};


const userApi = {
  getPatientProfile: () => {
    return http.get<UserProfileResponse>(URL_PATIENT_PROFILE);
  },
  updatePatientProfile: (patientId: string, data: UserProfileUpdateValues) => {
    return http.put<UserProfileResponse>(
      getPatientProfileByIdUrl(patientId),
      data
    );
  },
  getPatientAppointments: () => {
    return http.get<AppointmentApiResponse>(
      URL_PATIENT_APPOINTMENTS
    );
  },
  getPatientPrescriptions: () => {
    return http.get<PrescriptionsResponse>(
      URL_PATIENT_PRESCRIPTIONS
    );
  },
  getPatientAppointmentsComplete: () => {
    return http.get<AppointmentCompletedApiResponse>(
      URL_PATIENT_APPOINTMENTS_COMPLETED
    );
  },
  getPatientLabResults: () => {
    return http.get<LabResultResponse>(URL_PATIENT_TEST_RESULTS);
  },
};

export default userApi;
