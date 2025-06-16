import type {
  GetScheduleQueryParams,
  ScheduleApiResponse,
  TestScheduleApiResponse,
} from "@/types/schedule.type";
import apiGuest from "./apiGuest";

const URL_DOCTORS_SCHEDULE = "doctors";
const URL_TEST_SCHEDULE = "test/schedules/date";

// Helper function to build the URL with doctorId
const getDoctorScheduleDateUrl = (doctorId: string) => {
  return `${URL_DOCTORS_SCHEDULE}/${doctorId}/schedules/date`;
};

const ScheduleApi = {
  getScheduleDoctorByDate: (
    doctorId: string,
    params: GetScheduleQueryParams,
    signal?: AbortSignal
  ) => {
    return apiGuest
      .get<ScheduleApiResponse>(getDoctorScheduleDateUrl(doctorId), {
        params: params,
        signal: signal,
      })
      .then((res) => res.data); // <-- Quan trọng: Trả về res.data (là ScheduleApiResponse)
  },
  getTestScheduleByDate: (
    params: GetScheduleQueryParams,
    signal?: AbortSignal
  ) => {
    return apiGuest
      .get<TestScheduleApiResponse>(URL_TEST_SCHEDULE, {
        params: params,
        signal: signal,
      })
      .then((res) => res.data);
  },
};

export default ScheduleApi;
