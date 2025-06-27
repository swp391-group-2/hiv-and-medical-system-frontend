import type { Response, Prescription } from "@/types/types";
import http from "./http";
import { useQuery } from "@tanstack/react-query";

const getArvList = async (): Promise<Prescription[]> => {
  const { data } = await http.get<Response<Prescription>>(`/prescriptions`);
  return data.data;
};

export const useArvs = () => {
  return useQuery({
    queryKey: ["arvs"],
    queryFn: getArvList,
    staleTime: Infinity,
  });
};
