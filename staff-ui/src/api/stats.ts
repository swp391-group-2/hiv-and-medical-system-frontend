import type {
  ServiceTypeStat,
  StatCardStaticProps,
  WeeklyStatsData,
} from "@/types/stats";
import type { Response } from "@/types/types";
import type { Doctor } from "@/types/doctor";
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
      const [, startDate, endDate] = queryKey as [string, string, string];
      return getFeaturedStats(startDate, endDate);
    },
    staleTime: Infinity,
  });
}

export const getServiceTypeStats = async (): Promise<ServiceTypeStat[]> => {
  const { data } = await http.get<Response<ServiceTypeStat>>(
    `/dashboards/service-type-stats`
  );
  return data.data;
};

export const useServiceTypeStats = () => {
  return useQuery<ServiceTypeStat[]>({
    queryKey: ["service-type-stats"],
    queryFn: getServiceTypeStats,
    staleTime: Infinity,
  });
};

export const getFavoriteDoctors = async (
  size?: number
): Promise<Doctor[]> => {
  const { data } = await http.get<Response<Doctor>>(
    `/doctors`,
    {
      params: { size },
    }
  );
  return data.data;
};

export const useFavoriteDoctors = (size?: number) => {
  return useQuery<Doctor[]>({
    queryKey: ["topDoctors", size],
    queryFn: () => getFavoriteDoctors(size),
    staleTime: Infinity,
  });
};

export const getWeeklyStats = async (
  startDate: string,
  endDate: string
): Promise<WeeklyStatsData[]> => {
  const { data } = await http.get<Response<WeeklyStatsData>>(
    `/dashboards/stats/weekly`,
    {
      params: { startDate, endDate },
    }
  );
  return data.data;
};

export const useWeeklyStats = (startDate: string, endDate: string) => {
  return useQuery<WeeklyStatsData[]>({
    queryKey: ["weekly-stats", startDate, endDate],
    queryFn: ({ queryKey }) => {
      const [, startDate, endDate] = queryKey as [string, string, string];
      return getWeeklyStats(startDate, endDate);
    },
    staleTime: Infinity,
  });
};
