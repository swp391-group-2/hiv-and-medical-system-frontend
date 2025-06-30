import axios, { AxiosError } from "axios";
import HttpStatusCode from "@/constants/httpStatusCode.enum";
import { type ErrorResponse } from "@/types/utils.type";

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error);
}

export function isAxiosUnauthorizedError<UnauthorizedError>(
  error: unknown
): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosError(error) &&
    error.response?.status === HttpStatusCode.Unauthorized
  );
}

export function isAxiosExpiredTokenError<UnauthorizedError>(
  error: unknown
): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(
      error
    ) && error.response?.data?.data?.name === "EXPIRED_TOKEN"
  );
}

export const getTimeAgo = (createdAt: Date) => {
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60)
  );

  const diffInMinutes = Math.floor(
    (now.getTime() - createdAt.getTime()) / (1000 * 60)
  );

  if (diffInMinutes < 1) return "Vừa xong";
  if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;

  if (diffInHours === 1) return "1 giờ trước";
  if (diffInHours < 24) return `${diffInHours} giờ trước`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return "1 ngày trước";
  return `${diffInDays} ngày trước`;
};
