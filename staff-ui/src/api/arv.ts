import type { Response, Prescription, Medication } from "@/types/types";
import http from "./http";
import { useQuery } from "@tanstack/react-query";

const getArvList = async (): Promise<Prescription[]> => {
  const { data } = await http.get<Response<Prescription>>(`/prescriptions`);
  return data.data;
};

const getMedicineList = async (): Promise<Medication[]> => {
  const { data } = await http.get<Response<Medication>>(`/medications`);
  return data.data;
};

export const useMedications = () => {
  return useQuery({
    queryKey: ["medications"],
    queryFn: getMedicineList,
    staleTime: Infinity,
  });
};

export const useArvs = () => {
  return useQuery({
    queryKey: ["arvs"],
    queryFn: getArvList,
    staleTime: Infinity,
  });
};
