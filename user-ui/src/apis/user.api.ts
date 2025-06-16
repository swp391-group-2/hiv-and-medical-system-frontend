import type {
  UserProfileResponse,
  UserProfileUpdateValues,
} from "@/types/userProfile.type";
import http from "./http";

export const getPatientProfileByEmailUrl = (email: string) => {
  return `patients/patientProfile/${email}`;
};

export const getPatientProfileByIdUrl = (patientId: string) => {
  return `patients/${patientId}`;
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
};

export default userApi;
