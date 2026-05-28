// ============ ENUMS ============
export enum UserRole {
  USER = "USER",
  AUTHOR = "AUTHOR",
  ADMIN = "ADMIN",
}

export enum BookFormat {
  PDF = "PDF",
  EPUB = "EPUB",
  HARDCOVER = "HARDCOVER",
  PAPERBACK = "PAPERBACK",
}

export enum BorrowStatus {
  ACTIVE = "ACTIVE",
  RETURNED = "RETURNED",
  OVERDUE = "OVERDUE",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

// ============ USER ============
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// ============ CATEGORY ============
export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  bookCount: number;
  createdAt: string;
}

// ============ BOOK ============
export interface Book {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  pdfUrl: string;
  previewPages: string[];
  price: number;
  borrowPrice: number;
  totalPages: number;
  isbn?: string;
  language: string;
  format: BookFormat;
  authorId: string;
  author: Author;
  categoryId: string;
  category: Category;
  rating: number;
  reviewCount: number;
  pageCount: number;
  publishedDate: string;
  isAvailableForBorrow: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============ AUTHOR ============
export interface Author {
  id: string;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  bookCount: number;
  rating: number;
  joinedDate: string;
}

// ============ REVIEW ============
export interface Review {
  id: string;
  userId: string;
  user: Pick<User, "id" | "name" | "avatar">;
  bookId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// ============ BORROW ============
export interface Borrow {
  id: string;
  userId: string;
  bookId: string;
  book: Book;
  borrowDate: string;
  dueDate: string;
  returnDate: string | null;
  status: BorrowStatus;
  fine: number;
}

// ============ PURCHASE ============
export interface Purchase {
  id: string;
  userId: string;
  bookId: string;
  book: Book;
  amount: number;
  status: PaymentStatus;
  purchasedAt: string;
}

// ============ PAYMENT ============
export interface Payment {
  id: string;
  userId: string;
  amount: number;
  status: PaymentStatus;
  method: string;
  transactionId: string;
  createdAt: string;
}

// ============ WISHLIST ============
export interface WishlistItem {
  id: string;
  userId: string;
  bookId: string;
  book: Book;
  addedAt: string;
}

// ============ READING HISTORY ============
export interface ReadingHistory {
  id: string;
  userId: string;
  bookId: string;
  book: Book;
  lastReadAt: string;
  progress: number; // 0-100 percentage
}

// ============ DASHBOARD ============
export interface DashboardStats {
  totalBooks: number;
  totalUsers: number;
  totalAuthors: number;
  totalRevenue: number;
  activeBorrows: number;
  monthlyGrowth: number;
}

export interface EarningsData {
  month: string;
  amount: number;
  books: number;
}

export interface SalesData {
  date: string;
  revenue: number;
  orders: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  cost: number;
  profit: number;
}

// ============ FORMS ============
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface BookFormData {
  title: string;
  description: string;
  coverImage: string;
  pdfUrl: string;
  price: number;
  borrowPrice: number;
  category: string;
  totalPages: number;
}

// ============ FILTERS ============
export interface BookFilters {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  sortBy: "title" | "price" | "rating" | "newest";
  sortOrder: "asc" | "desc";
  page: number;
  limit: number;
}

// ============ PAGINATION ============
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}

// ============ API RESPONSE ============
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiError {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

// ============ NAVIGATION ============
export interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  children?: NavItem[];
}

export interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}
