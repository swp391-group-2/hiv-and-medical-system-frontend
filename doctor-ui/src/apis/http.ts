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

import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN } from "@/apis/auth.api";

import { type ErrorResponse } from "@/types/utils.type";

import { BASE_URL } from "@/api/BaseURL";
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from "@/utils/utils";
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
      baseURL: BASE_URL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken;
          return config;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        if (url === URL_LOGIN) {
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
        // Chỉ toast lỗi không phải 422 và 401
        if (
          ![
            HttpStatusCode.UnprocessableEntity,
            HttpStatusCode.Unauthorized,
          ].includes(error.response?.status as 401 | 422)
        ) {
          const message = error.message || "Có lỗi xảy ra";
          // Thông báo lỗi
          console.error("Lỗi rồi Phương", message);
        }
        if (
          isAxiosUnauthorizedError<
            ErrorResponse<{ name: string; message: string }>
          >(error)
        ) {
          const config = error.response?.config || { headers: {}, url: "" };
          const { url } = config;
          // Trường hợp Token hết hạn và request đó không phải là của request refresh token
          // thì chúng ta mới tiến hành gọi refresh token
          if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
            // Hạn chế gọi 2 lần handleRefreshToken
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  // Giữ refreshTokenRequest trong 10s cho những request tiếp theo nếu có 401 thì dùng
                  setTimeout(() => {
                    this.refreshTokenRequest = null;
                  }, 10000);
                });
            return this.refreshTokenRequest.then((access_token) => {
              // Nghĩa là chúng ta tiếp tục gọi lại request cũ vừa bị lỗi
              return this.instance({
                ...config,
                headers: { ...config.headers, authorization: access_token },
              });
            });
          }

          // Còn những trường hợp như token không đúng
          // không truyền token,
          // token hết hạn nhưng gọi refresh token bị fail
          // thì tiến hành xóa local storage và toast message

          clearLS();
          this.accessToken = "";
          this.refreshToken = "";

          // window.location.reload()
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