import type { SlotDetail } from "@/types/doctor";
import http from "./http";
import type { Response } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

const getAllSlots = async (): Promise<SlotDetail[]> => {
  const { data } = await http.get<Response<SlotDetail>>(`/slots`);
  return data.data;
};

export const useSlots = () => {
  return useQuery<SlotDetail[]>({
    queryKey: ["slots"],
    queryFn: getAllSlots,
    staleTime: Infinity,
  });
};
