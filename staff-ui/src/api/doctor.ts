import http from "./http";
import type { Doctor, Schedule } from "@/types/doctor";
import { type Response, type ResponseSingleObject } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export const getDoctorsCount = async (): Promise<number> => {
  const { data } = await http.get<ResponseSingleObject<number>>(
    `/doctors/count`
  );
  return data.data;
};

export const useDoctorsCount = () => {
  return useQuery<number>({
    queryKey: ["doctorsCount"],
    queryFn: getDoctorsCount,
    staleTime: Infinity,
  });
};

const getDoctorsByPage = async (
  page?: number,
  size?: number
): Promise<Doctor[]> => {
  const { data } = await http.get<Response<Doctor>>(`/doctors`, {
    params: { page, size },
  });
  return data.data;
};

const getDoctorsByPageV2 = async (
  page?: number,
  size?: number,
  search?: string
): Promise<Doctor[]> => {
  const { data } = await http.get<Response<Doctor>>(`/doctors`, {
    params: { page, size, search },
  });
  return data.data;
};

export const useDoctors = (page?: number, size?: number) => {
  return useQuery<Doctor[]>({
    queryKey: ["doctors", page, size],
    queryFn: () => getDoctorsByPage(page, size),
    staleTime: Infinity,
  });
};

export const useDoctorsV2 = (page?: number, size?: number, search?: string) => {
  return useQuery<Doctor[]>({
    queryKey: ["doctors", page, size, search],
    queryFn: () => getDoctorsByPageV2(page, size, search),
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
