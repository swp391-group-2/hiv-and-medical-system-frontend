import axios, { AxiosError, type AxiosInstance } from "axios";
import {
  type AuthResponse,
  type RefreshTokenResponse,
} from "@/types/auth.type";
import {
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS,
} from "./userauth";
import config from "@/constants/config";
import {
  URL_GOOGLE_LOGIN,
  URL_LOGIN,
  URL_LOGOUT,
  URL_REFRESH_TOKEN,
} from "@/apis/auth.api";
import {
  isAxiosExpiredTokenError,
  isAxiosUnauthorizedError,
} from "@/utils/utils";
import { type ErrorResponse } from "@/types/utils.type";
import HttpStatusCode from "@/constants/httpStatusCode.enum";

export class Http {
  instance: AxiosInstance;
  private accessToken: string;
  private refreshToken: string;
  private refreshTokenRequest: Promise<string> | null;
  constructor() {
    this.accessToken = getAccessTokenFromLS();
    this.refreshToken = getRefreshTokenFromLS();
    this.refreshTokenRequest = null;
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = `Bearer ${this.accessToken}`;
          return config;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        if (url === URL_LOGIN || url === URL_GOOGLE_LOGIN) {
          const data = response.data as AuthResponse;
          this.accessToken = data.data.accessToken;
          this.refreshToken = data.data.refreshToken;
          setAccessTokenToLS(this.accessToken);
          setRefreshTokenToLS(this.refreshToken);
          setProfileToLS(data.data.user);
        } else if (url === URL_LOGOUT) {
          this.accessToken = "";
          this.refreshToken = "";
          clearLS();
        }
        return response;
      },
      (error: AxiosError) => {
        if (
          ![
            HttpStatusCode.UnprocessableEntity,
            HttpStatusCode.Unauthorized,
          ].includes(error.response?.status as 401 | 422)
        ) {
          const message = error.message || "Có lỗi xảy ra";

          console.error("Lỗi rồi Phương", message);
        }
        if (
          isAxiosUnauthorizedError<
            ErrorResponse<{ name: string; message: string }>
          >(error)
        ) {
          const config = error.response?.config || { headers: {}, url: "" };
          const { url } = config;

          if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  setTimeout(() => {
                    this.refreshTokenRequest = null;
                  }, 10000);
                });
            return this.refreshTokenRequest.then((access_token) => {
              return this.instance({
                ...config,
                headers: { ...config.headers, authorization: access_token },
              });
            });
          }

          clearLS();
          this.accessToken = "";
          this.refreshToken = "";

          window.location.reload();
        }
        return Promise.reject(error);
      }
    );
  }
  private handleRefreshToken() {
    return this.instance
      .post<RefreshTokenResponse>(URL_REFRESH_TOKEN, {
        refreshToken: this.refreshToken,
      })
      .then((res) => {
        const { accessToken } = res.data.data;
        setAccessTokenToLS(accessToken);
        this.accessToken = accessToken;
        return accessToken;
      })
      .catch((error) => {
        clearLS();
        this.accessToken = "";
        this.refreshToken = "";
        throw error;
      });
  }
}
const http = new Http().instance;
export default http;
