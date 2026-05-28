"use client";

import Link from "next/link";
import { Bell, ChevronDown, LogOut } from "lucide-react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Avatar } from "@/components/ui/avatar";
import { UserRole } from "@/types";
import { useState } from "react";

// Mock user for demo
const mockUser = {
  name: "John Doe",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  role: UserRole.USER,
  email: "john@example.com",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-secondary-50">
      <DashboardSidebar role={mockUser.role} />

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
                <Avatar src={mockUser.avatar} alt={mockUser.name} size="sm" />
                <div className="hidden text-left md:block">
                  <p className="text-sm font-medium text-secondary-900">{mockUser.name}</p>
                  <p className="text-xs text-secondary-500">{mockUser.role}</p>
                </div>
                <ChevronDown className="hidden h-4 w-4 text-secondary-400 md:block" />
              </button>

              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 top-full z-20 mt-2 w-56 rounded-xl border bg-white p-2 shadow-lg">
                    <div className="border-b px-3 py-2">
                      <p className="text-sm font-medium text-secondary-900">{mockUser.name}</p>
                      <p className="text-xs text-secondary-500">{mockUser.email}</p>
                    </div>
                    <div className="mt-2 space-y-1">
                      <Link
                        href="/dashboard/user/profile"
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Profile Settings
                      </Link>
                      <button
                        onClick={() => setUserMenuOpen(false)}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
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
