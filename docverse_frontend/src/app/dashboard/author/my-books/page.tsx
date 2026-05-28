"use client";

import { BookOpen, Edit, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { mockBooks } from "@/data/mock-data";

export default function MyBooksPage() {
  const authorBooks = mockBooks.slice(0, 4);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">My Books</h1>
          <p className="text-secondary-500">Manage your published books</p>
        </div>
      </div>

      {authorBooks.length === 0 ? (
        <div className="mt-12 flex flex-col items-center justify-center text-center">
          <BookOpen className="h-16 w-16 text-secondary-300" />
          <h3 className="mt-4 text-lg font-semibold text-secondary-900">No books yet</h3>
          <p className="mt-1 text-sm text-secondary-500">Upload your first book to get started</p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {authorBooks.map((book) => (
            <div key={book.id} className="flex flex-col gap-4 rounded-xl border bg-white p-4 sm:flex-row sm:items-center">
              <div className="h-20 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                <img src={book.coverImage} alt={book.title} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-secondary-900 truncate">{book.title}</h3>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge variant="secondary">{book.category.name}</Badge>
                      <span className="text-sm text-secondary-500">{book.totalPages} pages</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary-700">{formatPrice(book.price)}</p>
                    <p className="text-xs text-secondary-400">Borrow: {formatPrice(book.borrowPrice)}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Badge variant="success">Published</Badge>
                  <span className="text-sm text-secondary-400">{book.reviewCount} reviews</span>
                  <span className="text-sm text-secondary-400">•</span>
                  <span className="text-sm text-secondary-400">{book.rating} rating</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
