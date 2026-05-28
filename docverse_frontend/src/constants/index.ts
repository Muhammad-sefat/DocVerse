export const APP_NAME = "DocVerse";
export const APP_DESCRIPTION =
  "Your premier digital library platform. Browse, borrow, and buy books from renowned authors worldwide.";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export const BOOK_FORMATS = ["PDF", "EPUB", "HARDCOVER", "PAPERBACK"] as const;

export const SORT_OPTIONS = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Highest Rated", value: "rating" },
  { label: "Title A-Z", value: "title_asc" },
  { label: "Title Z-A", value: "title_desc" },
] as const;

export const ITEMS_PER_PAGE = 12;

export const RATING_OPTIONS = [
  { label: "5 Stars", value: 5 },
  { label: "4 Stars & Up", value: 4 },
  { label: "3 Stars & Up", value: 3 },
  { label: "2 Stars & Up", value: 2 },
  { label: "1 Star & Up", value: 1 },
] as const;

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Books", href: "/books" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const DASHBOARD_USER_NAV = [
  { label: "My Library", href: "/dashboard/user/library" },
  { label: "Borrowed Books", href: "/dashboard/user/borrowed" },
  { label: "Wishlist", href: "/dashboard/user/wishlist" },
  { label: "Reading History", href: "/dashboard/user/history" },
  { label: "Profile Settings", href: "/dashboard/user/profile" },
] as const;

export const DASHBOARD_AUTHOR_NAV = [
  { label: "Overview", href: "/dashboard/author" },
  { label: "Upload Book", href: "/dashboard/author/upload" },
  { label: "My Books", href: "/dashboard/author/my-books" },
  { label: "Earnings", href: "/dashboard/author/earnings" },
  { label: "Sales History", href: "/dashboard/author/sales" },
  { label: "Profile Settings", href: "/dashboard/author/profile" },
] as const;

export const DASHBOARD_ADMIN_NAV = [
  { label: "Analytics", href: "/dashboard/admin" },
  { label: "Manage Users", href: "/dashboard/admin/users" },
  { label: "Manage Authors", href: "/dashboard/admin/authors" },
  { label: "Manage Books", href: "/dashboard/admin/books" },
  { label: "Manage Categories", href: "/dashboard/admin/categories" },
  { label: "Revenue", href: "/dashboard/admin/revenue" },
] as const;

export const FOOTER_LINKS = {
  platform: [
    { label: "Home", href: "/" },
    { label: "Browse Books", href: "/books" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  support: [
    { label: "Help Center", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "FAQ", href: "#" },
  ],
  social: [
    { label: "Twitter", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
} as const;
