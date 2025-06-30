import type { AnonymousPostResponse } from "@/types/anonymousPost.type";
import http from "./http";

interface CreateAnonymousPostRequest {
  nickName: string;
  gender: string;
  age: number;
  title: string;
  content: string;
}

export const URL_ANONYMOUS_POST = "anonymous-posts";

export const anonymousPostApi = {
  getAnonymousPosts: () => {
    return http.get<AnonymousPostResponse>(URL_ANONYMOUS_POST);
  },

  postAnonymousPost: (body: CreateAnonymousPostRequest) => {
    return http.post(URL_ANONYMOUS_POST, body);
  },
};
