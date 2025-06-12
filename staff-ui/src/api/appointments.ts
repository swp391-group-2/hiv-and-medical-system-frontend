import axios from "axios";
import type { Appointment } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export const fetchAppointments = async (): Promise<Appointment[]> => {
  const { data } = await axios.get<Appointment[]>(`/appointments`);
  return data;
};

export function useAppointments() {
  return useQuery<Appointment[]>({
    queryKey: ["appointments"],
    queryFn: fetchAppointments,
    staleTime: Infinity,
  });
}
