import type { LoginFormData, RegisterFormData, User } from "@/types";
import { mockUsers } from "@/data/mock-data";

// TODO: Replace with actual API calls
const authService = {
  async login(data: LoginFormData): Promise<User> {
    // Simulate API call
    const user = mockUsers.find((u) => u.email === data.email);
    if (!user) throw new Error("Invalid email or password");
    return user;
  },

  async register(data: RegisterFormData): Promise<User> {
    // Simulate API call
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      password: "hashed",
      role: data.role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`,
      bio: "",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return newUser;
  },

  async logout(): Promise<void> {
    // Simulate API call
    return;
  },

  async getProfile(): Promise<User> {
    const user = mockUsers[0];
    if (!user) throw new Error("Not authenticated");
    return user;
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    return { ...mockUsers[0], ...data };
  },
};

export default authService;
