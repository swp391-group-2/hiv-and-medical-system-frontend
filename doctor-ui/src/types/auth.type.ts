
import type { User } from "./user.type";
import type { SuccessResponse } from "./utils.type";


export type AuthResponse = SuccessResponse<{
  accessToken: string;
  refreshToken: string;
  user: User;
  
}>;

export type RefreshTokenResponse = SuccessResponse<{ accessToken: string }>;