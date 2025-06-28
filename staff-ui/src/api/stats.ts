import type {
  ServiceTypeStat,
  StatCardStaticProps,
  FavoriteDoctor,
} from "@/types/stats";
import type { Response } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import http from "./http";

export const getFeaturedStats = async (
  milestone: string
): Promise<StatCardStaticProps[]> => {
  const { data } = await http.get<Response<StatCardStaticProps>>(
    `/dashboards/stats`,
    {
      params: { milestone },
    }
  );
  return data.data;
};

export function useFeaturedStats(milestone: string) {
  return useQuery<StatCardStaticProps[]>({
    queryKey: ["featured-stats", milestone],
    queryFn: ({ queryKey }) => {
      const [, milestone] = queryKey as [string, string];
      return getFeaturedStats(milestone);
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
  page?: number,
  size?: number
): Promise<FavoriteDoctor[]> => {
  const { data } = await http.get<Response<FavoriteDoctor>>(
    `/doctors/top-appointmentCount`,
    {
      params: { page, size },
    }
  );
  return data.data;
};

export const useFavoriteDoctors = (page?: number, size?: number) => {
  return useQuery<FavoriteDoctor[]>({
    queryKey: ["topDoctors", page, size],
    queryFn: () => getFavoriteDoctors(page, size),
    staleTime: Infinity,
  });
};
