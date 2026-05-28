"use client";

import { Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookCard } from "@/components/cards/BookCard";
import { mockWishlist } from "@/data/mock-data";

export default function WishlistPage() {
  const wishlistBooks = mockWishlist.map((w) => w.book);

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">My Wishlist</h1>
        <p className="text-secondary-500">Books you've saved for later</p>
      </div>

      {wishlistBooks.length === 0 ? (
        <div className="mt-12 flex flex-col items-center justify-center text-center">
          <Heart className="h-16 w-16 text-secondary-300" />
          <h3 className="mt-4 text-lg font-semibold text-secondary-900">Your wishlist is empty</h3>
          <p className="mt-1 text-sm text-secondary-500">Save books you're interested in to your wishlist</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {wishlistBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
