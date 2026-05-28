import type { Book, BookFilters, PaginatedResponse } from "@/types";
import { mockBooks } from "@/data/mock-data";

// TODO: Replace with actual API calls
const bookService = {
  async getAll(filters?: Partial<BookFilters>): Promise<PaginatedResponse<Book>> {
    let books = [...mockBooks];

    if (filters?.search) {
      const search = filters.search.toLowerCase();
      books = books.filter(
        (b) =>
          b.title.toLowerCase().includes(search) ||
          b.description.toLowerCase().includes(search) ||
          b.author.name.toLowerCase().includes(search)
      );
    }

    if (filters?.category) {
      books = books.filter((b) => b.categoryId === filters.category);
    }

    const page = filters?.page || 1;
    const limit = filters?.limit || 12;
    const total = books.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const paginatedBooks = books.slice(start, start + limit);

    return {
      data: paginatedBooks,
      pagination: { page, limit, total, totalPages },
    };
  },

  async getById(id: string): Promise<Book | undefined> {
    return mockBooks.find((b) => b.id === id);
  },

  async getFeatured(): Promise<Book[]> {
    return mockBooks.slice(0, 6);
  },

  async getByCategory(categoryId: string): Promise<Book[]> {
    return mockBooks.filter((b) => b.categoryId === categoryId);
  },

  async getByAuthor(authorId: string): Promise<Book[]> {
    return mockBooks.filter((b) => b.authorId === authorId);
  },

  async search(query: string): Promise<Book[]> {
    const q = query.toLowerCase();
    return mockBooks.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.name.toLowerCase().includes(q) ||
        b.category.name.toLowerCase().includes(q)
    );
  },
};

export default bookService;
