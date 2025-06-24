import http from "./http";
import type { Doctor, Schedule } from "@/types/doctor";
import { type Response } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

const getAllDoctors = async (): Promise<Doctor[]> => {
  const { data } = await http.get<Response<Doctor>>(`/doctors`);
  return data.data;
};

export const useDoctors = () => {
  return useQuery<Doctor[]>({
    queryKey: ["doctors"],
    queryFn: getAllDoctors,
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
