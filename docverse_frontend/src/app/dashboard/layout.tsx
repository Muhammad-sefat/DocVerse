"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, ChevronDown, LogOut, Loader2, User } from "lucide-react";
import { toast } from "sonner";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Avatar } from "@/components/ui/avatar";
import { UserRole } from "@/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getProfile, logoutUser } from "@/redux/features/authSlice";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [profileChecked, setProfileChecked] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && !profileChecked) {
      setProfileChecked(true);
      dispatch(getProfile()).then((result) => {
        if (getProfile.rejected.match(result)) {
          // Profile fetch failed, redirect to login
          router.push("/login");
        }
      });
    }
  }, [dispatch, isAuthenticated, profileChecked, router]);

  // Loading state while checking auth
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
          <p className="text-sm text-secondary-500">
            {isLoading ? "Loading dashboard..." : "Redirecting to login..."}
          </p>
        </div>
      </div>
    );
  }

  const displayUser = user || {
    name: "User",
    email: "",
    role: UserRole.USER as UserRole,
    avatar: undefined,
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const result = await dispatch(logoutUser()).unwrap();
      toast.success(result.message || "Logged out successfully");
      setUserMenuOpen(false);
      router.push("/");
    } catch (error: any) {
      toast.error(error || "Failed to logout");
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Get profile link based on role
  const getProfileLink = () => {
    const role = displayUser.role;
    if (role === UserRole.ADMIN) return "/dashboard/admin";
    if (role === UserRole.AUTHOR) return "/dashboard/author/profile";
    return "/dashboard/user/profile";
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <DashboardSidebar role={displayUser.role} />

      {/* Main content area */}
      <div className="lg:pl-72">
        {/* Top navbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-6">
          <div>
            <h1 className="text-lg font-semibold text-secondary-900">Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative rounded-lg p-2 text-secondary-500 hover:bg-secondary-100 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-3 rounded-lg p-1.5 hover:bg-secondary-50 transition-colors"
              >
                <Avatar
                  src={displayUser.avatar || ""}
                  alt={displayUser.name}
                  size="sm"
                  fallback={displayUser.name?.charAt(0)?.toUpperCase() || "U"}
                />
                <div className="hidden text-left md:block">
                  <p className="text-sm font-medium text-secondary-900">{displayUser.name}</p>
                  <p className="text-xs text-secondary-500">{displayUser.role}</p>
                </div>
                <ChevronDown className="hidden h-4 w-4 text-secondary-400 md:block" />
              </button>

              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 top-full z-20 mt-2 w-56 rounded-xl border bg-white p-2 shadow-lg">
                    <div className="border-b px-3 py-2">
                      <p className="text-sm font-medium text-secondary-900">{displayUser.name}</p>
                      <p className="text-xs text-secondary-500">{displayUser.email}</p>
                    </div>
                    <div className="mt-2 space-y-1">
                      <Link
                        href={getProfileLink()}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        Profile Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                      >
                        <LogOut className="h-4 w-4" />
                        {isLoggingOut ? "Signing out..." : "Sign Out"}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
