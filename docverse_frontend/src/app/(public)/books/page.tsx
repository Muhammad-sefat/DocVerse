"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X, Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BookCard } from "@/components/cards/BookCard";
import { mockBooks, mockCategories } from "@/data/mock-data";

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Highest Rated", value: "rating" },
];

export default function BooksPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const filteredBooks = useMemo(() => {
    let books = [...mockBooks];

    if (search) {
      const q = search.toLowerCase();
      books = books.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.name.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q),
      );
    }

    if (selectedCategory) {
      books = books.filter((b) => b.categoryId === selectedCategory);
    }

    switch (sortBy) {
      case "price_asc":
        books.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        books.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        books.sort((a, b) => b.rating - a.rating);
        break;
      default:
        books.sort(
          (a, b) =>
            new Date(b.publishedDate).getTime() -
            new Date(a.publishedDate).getTime(),
        );
    }

    return books;
  }, [search, selectedCategory, sortBy]);

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <section className="border-b bg-white">
        <div className="page-container py-8">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold text-secondary-900">
                Browse Books
              </h1>
              <p className="mt-1 text-secondary-500">
                Discover your next great read from our extensive collection
              </p>
            </div>

            {/* Search & Filters Bar */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative flex-1 max-w-xl">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
                <Input
                  placeholder="Search by title, author, or keyword..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Select
                  options={SORT_OPTIONS}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-40"
                />
                <div className="hidden sm:flex items-center rounded-lg border bg-white p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`rounded-md p-1.5 ${viewMode === "grid" ? "bg-primary-50 text-primary-700" : "text-secondary-400 hover:text-secondary-600"}`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`rounded-md p-1.5 ${viewMode === "list" ? "bg-primary-50 text-primary-700" : "text-secondary-400 hover:text-secondary-600"}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-secondary-500">
                Active filters:
              </span>
              {selectedCategory && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory("")}
                >
                  {mockCategories.find((c) => c.id === selectedCategory)?.name}
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              )}
              <span className="text-sm text-secondary-400">
                {filteredBooks.length} books found
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="page-container py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside
            className={`${showFilters ? "fixed inset-0 z-40 flex" : "hidden"} lg:relative lg:flex lg:w-64 lg:shrink-0`}
          >
            {showFilters && (
              <div
                className="fixed inset-0 bg-black/50 lg:hidden"
                onClick={() => setShowFilters(false)}
              />
            )}
            <div
              className={`relative z-50 h-full w-72 overflow-y-auto rounded-xl border bg-white p-6 lg:h-auto lg:w-full lg:shadow-sm`}
            >
              <div className="flex items-center justify-between lg:hidden mb-4">
                <h3 className="font-semibold text-secondary-900">Filters</h3>
                <button onClick={() => setShowFilters(false)}>
                  <X className="h-5 w-5 text-secondary-400" />
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="mb-3 text-sm font-semibold text-secondary-900">
                  Categories
                </h4>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setSelectedCategory("");
                      setCurrentPage(1);
                    }}
                    className={`block w-full text-left rounded-lg px-3 py-2 text-sm transition-colors ${
                      !selectedCategory
                        ? "bg-primary-50 text-primary-700 font-medium"
                        : "text-secondary-600 hover:bg-secondary-50"
                    }`}
                  >
                    All Categories
                  </button>
                  {mockCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setCurrentPage(1);
                        setShowFilters(false);
                      }}
                      className={`block w-full text-left rounded-lg px-3 py-2 text-sm transition-colors ${
                        selectedCategory === cat.id
                          ? "bg-primary-50 text-primary-700 font-medium"
                          : "text-secondary-600 hover:bg-secondary-50"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="ml-2 text-xs text-secondary-400">
                        ({cat.bookCount})
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="mb-3 text-sm font-semibold text-secondary-900">
                  Price Range
                </h4>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full rounded-lg border border-secondary-300 px-3 py-2 text-sm"
                  />
                  <span className="text-secondary-400">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full rounded-lg border border-secondary-300 px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Book Grid */}
          <div className="flex-1">
            {paginatedBooks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Search className="h-12 w-12 text-secondary-300" />
                <h3 className="mt-4 text-lg font-semibold text-secondary-900">
                  No books found
                </h3>
                <p className="mt-1 text-sm text-secondary-500">
                  Try adjusting your search or filter criteria
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory("");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div
                  className={
                    viewMode === "grid"
                      ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                      : "flex flex-col gap-4"
                  }
                >
                  {paginatedBooks.map((book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      variant={viewMode === "list" ? "horizontal" : "default"}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-10 flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className="min-w-9"
                        >
                          {page}
                        </Button>
                      ),
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
