import { type AuthResponse } from "@/types/auth.type";
import http from "./http";

export const URL_LOGIN = "auth/login";
export const URL_REGISTER = "auth/register";
export const URL_LOGOUT = "auth/logout";
export const URL_REFRESH_TOKEN = "auth/refresh";

const authApi = {
  registerAccount(body: { email: string; fullname: string; password: string }) {
    return http.post<AuthResponse>(URL_REGISTER, body);
  },
  login(body: { email: string; password: string }) {
    return http.post<AuthResponse>(URL_LOGIN, body);
  },
  logout() {
    return http.post(URL_LOGOUT);
  },
};

export default authApi;
