import type { AnonymousPostResponse } from "@/types/anonymousPost.type";
import http from "./http";

interface CreateAnonymousPostRequest {
  title: string;
  content: string;
}

export const URL_ANONYMOUS_POST = "anonymous-posts";

export const anonymousPostApi = {
  getAnonymousPosts: (
    page: number = 0,
    size: number = 10,
    title: string = "",
    isPatient: boolean = false
  ) => {
    return http.get<AnonymousPostResponse>(URL_ANONYMOUS_POST, {
      params: {
        page,
        size,
        title,
        isPatient,
      },
    });
  },

  postAnonymousPost: (body: CreateAnonymousPostRequest) => {
    return http.post(URL_ANONYMOUS_POST, body);
  },
};
