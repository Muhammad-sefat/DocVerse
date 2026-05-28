"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, User, BookOpen, LayoutDashboard, LogOut, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Sheet } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { APP_NAME, NAV_ITEMS } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getProfile, logoutUser } from "@/redux/features/authSlice";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isDashboard = pathname?.startsWith("/dashboard");
  const isAuth = pathname?.startsWith("/login") || pathname?.startsWith("/register");

  // Fetch user profile on mount if authenticated
  useEffect(() => {
    if (!isAuthenticated && !isAuth && !isDashboard) {
      dispatch(getProfile());
    }
  }, [dispatch, isAuthenticated, isAuth, isDashboard]);

  if (isDashboard || isAuth) return null;

  const getDashboardLink = () => {
    if (!user) return "/dashboard";
    const role = user.role;
    if (role === "ADMIN") return "/dashboard/admin";
    if (role === "AUTHOR") return "/dashboard/author";
    return "/dashboard/user/library";
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const result = await dispatch(logoutUser()).unwrap();
      toast.success(result.message || "Logged out successfully");
      setPopoverOpen(false);
      router.push("/");
    } catch (error: any) {
      toast.error(error || "Failed to logout");
    } finally {
      setIsLoggingOut(false);
    }
  };

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
            {isAuthenticated && user ? (
              <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-secondary-50 transition-colors">
                    <Avatar
                      src={user.avatar || ""}
                      alt={user.name}
                      size="sm"
                      fallback={user.name?.charAt(0)?.toUpperCase() || "U"}
                    />
                    <span className="hidden lg:block text-sm font-medium text-secondary-700">
                      {user.name}
                    </span>
                    <ChevronDown className="hidden lg:block h-4 w-4 text-secondary-400" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-2" align="end">
                  <div className="border-b px-3 py-2">
                    <p className="text-sm font-medium text-secondary-900">{user.name}</p>
                    <p className="text-xs text-secondary-500">{user.email}</p>
                  </div>
                  <div className="mt-2 space-y-1">
                    <Link
                      href={getDashboardLink()}
                      onClick={() => setPopoverOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900 transition-colors"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                    >
                      <LogOut className="h-4 w-4" />
                      {isLoggingOut ? "Logging out..." : "Sign Out"}
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
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
            {isAuthenticated && user ? (
              <div className="space-y-2">
                <Link
                  href={getDashboardLink()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-secondary-600 hover:bg-secondary-50 transition-colors"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
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
