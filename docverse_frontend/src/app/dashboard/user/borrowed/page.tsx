"use client";

import { BookCopy, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { formatDate, formatPrice } from "@/lib/utils";
import { mockBorrows } from "@/data/mock-data";
import { BorrowStatus } from "@/types";

const statusVariants: Record<BorrowStatus, "success" | "warning" | "danger" | "default"> = {
  [BorrowStatus.ACTIVE]: "success",
  [BorrowStatus.RETURNED]: "default",
  [BorrowStatus.OVERDUE]: "danger",
};

export default function BorrowedBooksPage() {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Borrowed Books</h1>
        <p className="text-secondary-500">Track your currently borrowed and past books</p>
      </div>

      {mockBorrows.length === 0 ? (
        <div className="mt-12 flex flex-col items-center justify-center text-center">
          <BookCopy className="h-16 w-16 text-secondary-300" />
          <h3 className="mt-4 text-lg font-semibold text-secondary-900">No borrowed books</h3>
          <p className="mt-1 text-sm text-secondary-500">Browse books and borrow your first one today</p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {mockBorrows.map((borrow) => (
            <div key={borrow.id} className="flex flex-col gap-4 rounded-xl border bg-white p-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4 flex-1">
                <div className="h-20 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={borrow.book.coverImage}
                    alt={borrow.book.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900">{borrow.book.title}</h3>
                  <p className="text-sm text-secondary-500">{borrow.book.author.name}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant={statusVariants[borrow.status]}>{borrow.status}</Badge>
                    {borrow.fine > 0 && (
                      <span className="text-sm font-medium text-red-600">
                        Fine: {formatPrice(borrow.fine)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-secondary-500 sm:flex-col sm:items-end">
                <div>
                  <span className="block text-xs">Borrowed</span>
                  {formatDate(borrow.borrowDate)}
                </div>
                <div>
                  <span className="block text-xs">Due</span>
                  {formatDate(borrow.dueDate)}
                </div>
                {borrow.status === BorrowStatus.ACTIVE && (
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="mr-1 h-3 w-3" />
                    Return
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
