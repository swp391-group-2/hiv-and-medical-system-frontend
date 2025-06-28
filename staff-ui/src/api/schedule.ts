import type { Schedule, SlotDetail } from "@/types/doctor";
import http from "./http";
import type { Response } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

const getAllSlots = async (): Promise<SlotDetail[]> => {
  const { data } = await http.get<Response<SlotDetail>>(`/slots`);
  return data.data;
};

const getCurrentWeekSchedule = async (
  doctorId: number,
  date: string
): Promise<Schedule[]> => {
  const { data } = await http.get<Response<Schedule>>(
    `/doctors/${doctorId}/schedules/week`,
    { params: { doctorId, date } }
  );
  return data.data;
};

export const useCurrentWeekSchedule = (doctorId: number, date: string) => {
  return useQuery<Schedule[]>({
    queryKey: ["weekSchedule", doctorId, date],
    queryFn: () => getCurrentWeekSchedule(doctorId, date),
    staleTime: Infinity,
  });
};

export const useSlots = () => {
  return useQuery<SlotDetail[]>({
    queryKey: ["slots"],
    queryFn: getAllSlots,
    staleTime: Infinity,
  });
};
