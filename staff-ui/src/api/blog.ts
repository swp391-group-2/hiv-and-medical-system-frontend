import type { Blog } from "@/types/blog";
import type { Response } from "@/types/types";
import http from "./http";
import { useQuery } from "@tanstack/react-query";

const getBlogList = async (page: number, size: number): Promise<Blog[]> => {
  const { data } = await http.get<Response<Blog>>(`/blogs`, {
    params: { page, size },
  });
  return data.data;
};

export const useBlogList = (page: number, size: number) => {
  return useQuery<Blog[]>({
    queryKey: ["blogs", page, size],
    queryFn: () => getBlogList(page, size),
    staleTime: Infinity,
  });
};
