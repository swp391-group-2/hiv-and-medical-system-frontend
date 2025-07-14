import type { DoctorProfile } from "@/types/doctor.type";
import apiGuest from "./apiGuest";

export const URL_DOCTORS = "doctors";

export interface DoctorsApiResponse {
  status: string;
  message: string;
  data: DoctorProfile[];
}

export interface DoctorApiResponseWithId {
  status: string;
  message: string;
  data: DoctorProfile;
}

const doctorApi = {
  getDoctors: async (page: number, size: number, name: string = "") => {
    return apiGuest
      .get<DoctorsApiResponse>(URL_DOCTORS, {
        params: {
          page,
          size,
          name,
        },
      })
      .then((data) => {
        return data.data;
      });
  },
  getDoctorById: async (doctorId: string) => {
    return apiGuest
      .get<DoctorApiResponseWithId>(`${URL_DOCTORS}/${doctorId}`)
      .then((response) => {
        return response.data;
      });
  },
  getTopDoctors: async () => {
    return apiGuest
      .get<DoctorsApiResponse>(`${URL_DOCTORS}/top`)
      .then((data) => {
        return data.data;
      });
  },
  getTopAppointmentDoctors: async () => {
    return apiGuest
      .get<DoctorsApiResponse>(`${URL_DOCTORS}/top-appointmentCount`, {
        params: {
          size: 4,
          page: 0,
          name: "",
        },
      })
      .then((data) => {
        return data.data;
      });
  },
};

export default doctorApi;
