import type { Staff } from "@/types/staff";
import type { Response } from "@/types/types";
import http from "./http";
import { useQuery } from "@tanstack/react-query";

const getAllStaffs = async (): Promise<Staff[]> => {
  const { data } = await http.get<Response<Staff>>(`/staffs`);
  return data.data;
};

export const useStaffs = () => {
  return useQuery<Staff[]>({
    queryKey: ["staffs"],
    queryFn: getAllStaffs,
    staleTime: Infinity,
  });
};
