import type {
  AppointmentStat,
  StatCardStaticProps,
  FavoriteDoctor,
} from "@/types/stats";
import type { Response, ResponseSingleObject } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import http from "./http";

export const getFeaturedStats = async (
  startDate: string,
  endDate: string
): Promise<StatCardStaticProps[]> => {
  const { data } = await http.get<Response<StatCardStaticProps>>(
    `/dashboards/stats`,
    {
      params: { startDate, endDate },
    }
  );
  return data.data;
};

export function useFeaturedStats(startDate: string, endDate: string) {
  return useQuery<StatCardStaticProps[]>({
    queryKey: ["featured-stats", startDate, endDate],
    queryFn: ({ queryKey }) => {
      const [, start, end] = queryKey as [string, string, string];
      return getFeaturedStats(start, end);
    },
    staleTime: Infinity,
  });
}

export const getAppointmentStats = async (): Promise<AppointmentStat> => {
  const { data } = await http.get<ResponseSingleObject<AppointmentStat>>(``);
  return data.data;
};

export const getFavoriteDoctors = async (): Promise<FavoriteDoctor[]> => {
  const { data } = await http.get<Response<FavoriteDoctor>>(``);
  return data.data;
};
