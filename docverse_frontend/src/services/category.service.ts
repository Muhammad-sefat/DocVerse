import type { Category } from "@/types";
import { mockCategories } from "@/data/mock-data";

// TODO: Replace with actual API calls
const categoryService = {
  async getAll(): Promise<Category[]> {
    return mockCategories;
  },

  async getById(id: string): Promise<Category | undefined> {
    return mockCategories.find((c) => c.id === id);
  },
};

export default categoryService;
