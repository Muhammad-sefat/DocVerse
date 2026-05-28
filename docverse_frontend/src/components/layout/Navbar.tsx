"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, User, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Sheet } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { APP_NAME, NAV_ITEMS } from "@/constants";

// Mock user for UI demo
const mockUser = {
  name: "John Doe",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  role: "USER",
};

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isDashboard = pathname?.startsWith("/dashboard");
  const isAuth = pathname?.startsWith("/login") || pathname?.startsWith("/register");

  if (isDashboard || isAuth) return null;

  return (
    <>
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-xl">
        <div className="page-container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-secondary-900">
              {APP_NAME}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  pathname === item.href
                    ? "bg-primary-50 text-primary-700"
                    : "text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="rounded-lg p-2 text-secondary-500 hover:bg-secondary-100 hover:text-secondary-700 transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Auth / User */}
            {mockUser ? (
              <Link href="/dashboard">
                <div className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-secondary-50 transition-colors">
                  <Avatar src={mockUser.avatar} alt={mockUser.name} size="sm" />
                  <span className="hidden lg:block text-sm font-medium text-secondary-700">
                    {mockUser.name}
                  </span>
                </div>
              </Link>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">Log In</Button>
                </Link>
                <Link href="/register">
                  <Button variant="gradient" size="sm">Sign Up</Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-lg p-2 text-secondary-500 hover:bg-secondary-100 md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="border-t bg-white">
            <div className="page-container py-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
                <input
                  type="text"
                  placeholder="Search books, authors, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-secondary-300 py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  autoFocus
                />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      <Sheet open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
        <div className="flex flex-col gap-6">
          <div className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-primary-50 text-primary-700"
                    : "text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="border-t pt-4">
            {mockUser ? (
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-secondary-600 hover:bg-secondary-50"
              >
                <User className="h-4 w-4" />
                Dashboard
              </Link>
            ) : (
              <div className="flex flex-col gap-2">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Log In</Button>
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="gradient" className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Sheet>
    </>
  );
}
