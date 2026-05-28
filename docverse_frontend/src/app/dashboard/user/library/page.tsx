"use client";

import { BookOpen, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BookCard } from "@/components/cards/BookCard";
import { mockPurchases } from "@/data/mock-data";

export default function LibraryPage() {
  const purchasedBooks = mockPurchases.map((p) => p.book);

  return (
    <div>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">My Library</h1>
          <p className="text-secondary-500">Books you've purchased</p>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
          <Input placeholder="Search your library..." className="pl-10" />
        </div>
      </div>

      {purchasedBooks.length === 0 ? (
        <div className="mt-12 flex flex-col items-center justify-center text-center">
          <BookOpen className="h-16 w-16 text-secondary-300" />
          <h3 className="mt-4 text-lg font-semibold text-secondary-900">Your library is empty</h3>
          <p className="mt-1 text-sm text-secondary-500">Start building your collection by purchasing books</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {purchasedBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
