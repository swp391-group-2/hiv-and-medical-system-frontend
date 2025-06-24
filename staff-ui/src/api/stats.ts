import type {
  AppointmentStat,
  StatCardStaticProps,
  FavoriteDoctor,
} from "@/types/stats";
import type { Response, ResponseSingleObject } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getFeaturedStats = async (): Promise<StatCardStaticProps[]> => {
  const { data } = await axios.get<Response<StatCardStaticProps>>(
    `/api/dashboards/stats`
  );
  return data.data;
};

export function useFeaturedStats() {
  return useQuery<StatCardStaticProps[]>({
    queryKey: ["featured-stats"],
    queryFn: getFeaturedStats,
    staleTime: Infinity,
  });
}

export const getAppointmentStats = async (): Promise<AppointmentStat> => {
  const { data } = await axios.get<ResponseSingleObject<AppointmentStat>>(``);
  return data.data;
};

export const getFavoriteDoctors = async (): Promise<FavoriteDoctor[]> => {
  const { data } = await axios.get<Response<FavoriteDoctor>>(``);
  return data.data;
};
