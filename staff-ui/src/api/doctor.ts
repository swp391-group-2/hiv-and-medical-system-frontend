import http from "./http";
import type { Doctor, Schedule } from "@/types/doctor";
import { type Response } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

const getAllDoctors = async (page: number, size: number): Promise<Doctor[]> => {
  const { data } = await http.get<Response<Doctor>>(`/doctors`, {
    params: { page, size },
  });
  return data.data;
};

export const useDoctors = (page: number, size: number) => {
  return useQuery<Doctor[]>({
    queryKey: ["doctors"],
    queryFn: () => getAllDoctors(page, size),
    staleTime: Infinity,
  });
};

const getDoctorWorkSchedule = async (doctorId: string): Promise<Schedule[]> => {
  const { data } = await http.get<Response<Schedule>>(
    `/doctors/${doctorId}/schedules`
  );
  return data.data;
};

export const useDoctorSchedule = (doctorId: string) => {
  return useQuery<Schedule[]>({
    queryKey: ["schedules", doctorId],
    queryFn: () => getDoctorWorkSchedule(doctorId),
    staleTime: Infinity,
  });
};
