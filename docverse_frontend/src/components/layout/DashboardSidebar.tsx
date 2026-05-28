"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  BookMarked,
  Heart,
  History,
  Upload,
  DollarSign,
  BarChart3,
  Users,
  UserCog,
  Settings,
  Library,
  BookCopy,
  TrendingUp,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { APP_NAME } from "@/constants";
import { UserRole } from "@/types";
import { useState } from "react";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const userNav: SidebarItem[] = [
  { label: "My Library", href: "/dashboard/user/library", icon: <Library className="h-4 w-4" /> },
  { label: "Borrowed Books", href: "/dashboard/user/borrowed", icon: <BookCopy className="h-4 w-4" /> },
  { label: "Wishlist", href: "/dashboard/user/wishlist", icon: <Heart className="h-4 w-4" /> },
  { label: "Reading History", href: "/dashboard/user/history", icon: <History className="h-4 w-4" /> },
  { label: "Profile", href: "/dashboard/user/profile", icon: <Settings className="h-4 w-4" /> },
];

const authorNav: SidebarItem[] = [
  { label: "Overview", href: "/dashboard/author", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Upload Book", href: "/dashboard/author/upload", icon: <Upload className="h-4 w-4" /> },
  { label: "My Books", href: "/dashboard/author/my-books", icon: <BookOpen className="h-4 w-4" /> },
  { label: "Earnings", href: "/dashboard/author/earnings", icon: <DollarSign className="h-4 w-4" /> },
  { label: "Sales History", href: "/dashboard/author/sales", icon: <TrendingUp className="h-4 w-4" /> },
  { label: "Profile", href: "/dashboard/author/profile", icon: <Settings className="h-4 w-4" /> },
];

const adminNav: SidebarItem[] = [
  { label: "Analytics", href: "/dashboard/admin", icon: <BarChart3 className="h-4 w-4" /> },
  { label: "Users", href: "/dashboard/admin/users", icon: <Users className="h-4 w-4" /> },
  { label: "Authors", href: "/dashboard/admin/authors", icon: <UserCog className="h-4 w-4" /> },
  { label: "Books", href: "/dashboard/admin/books", icon: <BookOpen className="h-4 w-4" /> },
  { label: "Categories", href: "/dashboard/admin/categories", icon: <BookMarked className="h-4 w-4" /> },
  { label: "Revenue", href: "/dashboard/admin/revenue", icon: <DollarSign className="h-4 w-4" /> },
];

interface DashboardSidebarProps {
  role: UserRole;
}

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = role === UserRole.ADMIN ? adminNav : role === UserRole.AUTHOR ? authorNav : userNav;

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
            <BookOpen className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-secondary-900">{APP_NAME}</span>
        </Link>
        <button onClick={() => setMobileOpen(false)} className="lg:hidden rounded-lg p-1 text-secondary-400 hover:bg-secondary-100">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        <p className="px-3 text-xs font-medium uppercase tracking-wider text-secondary-400 mb-2">
          {role === UserRole.ADMIN ? "Admin" : role === UserRole.AUTHOR ? "Author" : "User"} Menu
        </p>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-primary-50 text-primary-700"
                  : "text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900"
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="border-t p-4">
        <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-secondary-500 hover:text-secondary-700 transition-colors">
          <BookOpen className="h-4 w-4" />
          Back to Site
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-30 rounded-lg border bg-white p-2 shadow-sm lg:hidden"
      >
        <Menu className="h-5 w-5 text-secondary-600" />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 -translate-x-full transition-transform duration-300 lg:hidden",
          mobileOpen && "translate-x-0"
        )}
      >
        <div className="h-full overflow-hidden rounded-r-xl border bg-white shadow-xl">
          {sidebarContent}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col border-r bg-white h-full">
          {sidebarContent}
        </div>
      </aside>
    </>
  );
}
