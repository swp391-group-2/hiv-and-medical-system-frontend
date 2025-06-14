import axios from "axios";
import type { Response, Appointment } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export const fetchAppointments = async (): Promise<Appointment[]> => {
  const { data } = await axios.get<Response<Appointment>>(`/api/appointments`);
  return data.data;
};

export function useAppointments() {
  return useQuery<Appointment[]>({
    queryKey: ["appointments"],
    queryFn: fetchAppointments,
    staleTime: Infinity,
  });
}
