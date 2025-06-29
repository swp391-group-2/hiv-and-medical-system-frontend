import type { BlogEduResponse } from "@/types/blogEdu.type";
import apiGuest from "./apiGuest";

export const URL_BLOG = "blogs";

export const eduBlogApi = {
  getBlogs: (page: number, size: number, title: string = "") => {
    return apiGuest.get<BlogEduResponse>(URL_BLOG, {
      params: {
        page: page,
        size: size,
        title: title,
      },
    });
  },
};
