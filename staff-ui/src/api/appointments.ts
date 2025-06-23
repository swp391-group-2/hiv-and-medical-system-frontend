import axios from "axios";
import type { Response, Appointment, Prescription, ResponseSingleObject } from "@/types/types";
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

export const getPrescriptionById = async (id: number): Promise<Prescription> => {
  const {data} = await axios.get<ResponseSingleObject<Prescription>>(`/api/prescriptions/${id}`);
  return data.data;
}

export const usePrescription = (id: number) => {
  return useQuery<Prescription, Error>({
    queryKey: ["prescription", id],
    queryFn: () => getPrescriptionById(id),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}