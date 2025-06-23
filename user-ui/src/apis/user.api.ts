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

export const getPatientProfileByEmailUrl = (email: string) => {
  return `patients/patientProfile/${email}`;
};

export const getPatientProfileByIdUrl = (patientId: string) => {
  return `patients/${patientId}`;
};

const getPatientAppointmentsUrl = (patientId: string) => {
  return `patients/${patientId}/appointments`;
};

const getPatientPrescriptionsUrl = (patientId: string) => {
  return `patients/${patientId}/prescriptions`;
};

const getPatientAppointmentsCompleteUrl = (patientId: string) => {
  return `patients/${patientId}/appointmentsCompleted`;
};

const userApi = {
  getPatientProfile: (email: string) => {
    return http.get<UserProfileResponse>(getPatientProfileByEmailUrl(email));
  },
  updatePatientProfile: (patientId: string, data: UserProfileUpdateValues) => {
    return http.put<UserProfileResponse>(
      getPatientProfileByIdUrl(patientId),
      data
    );
  },
  getPatientAppointments: (patientId: string) => {
    return http.get<AppointmentApiResponse>(
      getPatientAppointmentsUrl(patientId)
    );
  },
  getPatientPrescriptions: (patientId: string) => {
    return http.get<PrescriptionsResponse>(
      getPatientPrescriptionsUrl(patientId)
    );
  },
  getPatientAppointmentsComplete: (patientId: string) => {
    return http.get<AppointmentCompletedApiResponse>(
      getPatientAppointmentsCompleteUrl(patientId)
    );
  },
};

export default userApi;
