/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import type { LoginFormData, RegisterFormData, User } from "@/types";
import { API_BASE_URL } from "@/constants";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

interface AuthResponse {
  success: boolean;
  message: string;
  data: User;
}

const authService = {
  async login(data: LoginFormData): Promise<{ user: User; message: string }> {
    const response = await api.post<AuthResponse>("/auth/login", {
      email: data.email,
      password: data.password,
    });
    return {
      user: response.data.data,
      message: response.data.message,
    };
  },

  async register(
    data: RegisterFormData,
  ): Promise<{ user: User; message: string }> {
    const response = await api.post<AuthResponse>("/auth/register", {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    });
    return {
      user: response.data.data,
      message: response.data.message,
    };
  },

  async logout(): Promise<{ message: string }> {
    const response = await api.post<{ success: boolean; message: string }>(
      "/auth/logout",
    );
    return { message: response.data.message };
  },

  async getProfile(): Promise<User> {
    const response = await api.get<{ success: boolean; data: any }>("/auth/me");
    // Map backend response (profileImage) to frontend type (avatar)
    const data = response.data.data;
    return {
      ...data,
      avatar: data.avatar || data.profileImage || "",
    };
  },
};

export default authService;
