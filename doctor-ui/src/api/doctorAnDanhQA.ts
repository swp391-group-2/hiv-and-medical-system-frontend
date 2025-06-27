import { BASE_URL } from "./BaseURL";
import type { AnonymousPost, CreateCommentResponse } from "@/types/qaType";

export const getAnonymousPosts = async (): Promise<AnonymousPost[]> => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${BASE_URL}anonymous-posts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data || [];
};

export const replyToAnonymousPost = async (
  anonymousPostId: string,
  content: string
): Promise<CreateCommentResponse> => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${BASE_URL}anonymous-posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      anonymousPostId,
      content,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();

  return data.data;
};
