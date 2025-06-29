import { type AuthResponse } from "@/types/auth.type";
import http from "./http";

export const URL_LOGIN = "auth/login";
export const URL_REGISTER = "auth/signup";
export const URL_LOGOUT = "auth/logout";
export const URL_REFRESH_TOKEN = "auth/refresh";
export const URL_GOOGLE_LOGIN = "auth/outbound/authentication";

const authApi = {
  registerAccount(body: { email: string; password: string; fullName: string }) {
    return http.post(URL_REGISTER, body);
  },
  login(body: { email: string; password: string }) {
    return http.post<AuthResponse>(URL_LOGIN, body);
  },
  logout() {
    return http.post(URL_LOGOUT);
  },
  loginGoogle(body: { code: string }) {
    return http.post<AuthResponse>(URL_GOOGLE_LOGIN, body);
  },
};

export default authApi;
