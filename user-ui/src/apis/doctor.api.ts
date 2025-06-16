import type { Doctor } from "@/types/doctor.type";
import apiGuest from "./apiGuest";

export const URL_DOCTORS = "doctors";

export interface DoctorsApiResponse {
  status: string;
  message: string;
  data: Doctor[];
}

export interface DoctorApiResponseWithId {
  status: string;
  message: string;
  data: Doctor;
}

const doctorApi = {
  getDoctors: () => {
    return apiGuest.get<DoctorsApiResponse>(URL_DOCTORS).then((data) => {
      return data.data;
    });
  },
  getDoctorById: (doctorId: string) => {
    return apiGuest
      .get<DoctorApiResponseWithId>(`${URL_DOCTORS}/${doctorId}`)
      .then((response) => {
        return response.data;
      });
  },
  getTopDoctors: () => {
    return apiGuest
      .get<DoctorsApiResponse>(`${URL_DOCTORS}/top`)
      .then((data) => {
        return data.data;
      });
  },
};

export default doctorApi;
