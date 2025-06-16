import { type User } from "@/types/user.type";

export const LocalStorageEventTarget = new EventTarget();

export const setAccessTokenToLS = (accessToken: string) => {
  localStorage.setItem("accessToken", accessToken);
};

export const setRefreshTokenToLS = (refreshToken: string) => {
  localStorage.setItem("refreshToken", refreshToken);
};

export const clearLS = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("profile");
  const clearLSEvent = new Event("clearLS");
  LocalStorageEventTarget.dispatchEvent(clearLSEvent);
};

export const getAccessTokenFromLS = () =>
  localStorage.getItem("accessToken") || "";

export const getRefreshTokenFromLS = () =>
  localStorage.getItem("refreshToken") || "";

export const getProfileFromLS = () => {
  const result = localStorage.getItem("user");
  return result ? JSON.parse(result) : null;
};

export const setProfileToLS = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};
