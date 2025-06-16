import {
  clearLS,
  getAccessTokenFromLS,
  getProfileFromLS,
} from "@/api/userauth";
import type { User } from "@/types/user.type";
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoadingAuth: boolean;

  initializeAuth: () => void;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoadingAuth: true,
  initializeAuth: () => {
    const token = getAccessTokenFromLS();
    const userData = getProfileFromLS();

    if (token && userData) {
      try {
        set({
          isAuthenticated: true,
          user: userData,
          isLoadingAuth: false, // Đã hoàn tất tải
        });
      } catch (error) {
        console.error(
          "Failed to parse user data from localStorage, clearing data.",
          error
        );
        // Xóa dữ liệu lỗi nếu không parse được hoặc có vấn đề
        clearLS();
        set({ isAuthenticated: false, user: null, isLoadingAuth: false });
      }
    } else {
      set({ isAuthenticated: false, user: null, isLoadingAuth: false });
    }
  },

  // Action: Đăng nhập
  login: (user: User) => {
    // Không còn tham số token
    set({
      isAuthenticated: true,
      user: user,
    });
  },

  // Action: Đăng xuất
  logout: () => {
    set({
      isAuthenticated: false,
      user: null,
    });
  },
}));
