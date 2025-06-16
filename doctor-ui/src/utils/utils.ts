import axios, { AxiosError } from "axios";

import { type ErrorResponse } from "@/types/utils.type";
import HttpStatusCode from "@/constants/httpStatusCode.enum";

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