"use client";

import Link from "next/link";
import { Book, Heart } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/shared/Rating";
import type { Book as BookType } from "@/types";
import Image from "next/image";

interface BookCardProps {
  book: BookType;
  variant?: "default" | "compact" | "horizontal";
  className?: string;
}

export function BookCard({
  book,
  variant = "default",
  className,
}: BookCardProps) {
  if (variant === "horizontal") {
    return (
      <Link href={`/books/${book.id}`}>
        <div
          className={cn(
            "group flex gap-4 rounded-xl border bg-white p-4 card-shadow card-shadow-hover transition-all duration-300",
            className,
          )}
        >
          <div className="relative h-32 w-24 shrink-0 overflow-hidden rounded-lg">
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-1 flex-col justify-between">
            <div>
              <h3 className="font-semibold text-secondary-900 line-clamp-1 group-hover:text-primary-700 transition-colors">
                {book.title}
              </h3>
              <p className="mt-0.5 text-sm text-secondary-500">
                {book.author.name}
              </p>
              <Rating value={book.rating} showValue className="mt-1" />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-primary-700">
                {formatPrice(book.price)}
              </span>
              <Badge variant="secondary">{book.category.name}</Badge>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/books/${book.id}`}>
        <div
          className={cn(
            "group flex flex-col rounded-xl border bg-white card-shadow card-shadow-hover overflow-hidden transition-all duration-300",
            className,
          )}
        >
          <div className="relative h-56 overflow-hidden">
            <Image
              src={book.coverImage}
              alt={book.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-secondary-900 backdrop-blur-sm">
                <Book className="h-3.5 w-3.5" />
                {book.totalPages} pages
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 p-3">
            <Badge variant="secondary" className="w-fit">
              {book.category.name}
            </Badge>
            <h3 className="font-semibold text-secondary-900 line-clamp-1 group-hover:text-primary-700 transition-colors">
              {book.title}
            </h3>
            <p className="text-xs text-secondary-500">{book.author.name}</p>
            <Rating value={book.rating} showValue size="sm" />
            <span className="font-bold text-primary-700">
              {formatPrice(book.price)}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link href={`/books/${book.id}`}>
      <div
        className={cn(
          "group flex flex-col rounded-xl border bg-white card-shadow card-shadow-hover overflow-hidden transition-all duration-300",
          className,
        )}
      >
        <div className="relative h-56 overflow-hidden bg-secondary-100">
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute right-3 top-3 rounded-full bg-white/80 p-2 text-secondary-600 hover:bg-white hover:text-red-500 transition-all backdrop-blur-sm"
          >
            <Heart className="h-4 w-4" />
          </button>
          {book.isAvailableForBorrow && (
            <Badge className="absolute left-3 top-3 bg-primary-600 text-white">
              Borrow Available
            </Badge>
          )}
        </div>
        <div className="flex flex-col gap-2 p-4">
          <Badge variant="secondary" className="w-fit text-xs">
            {book.category.name}
          </Badge>
          <h3 className="font-semibold text-secondary-900 line-clamp-1 group-hover:text-primary-700 transition-colors">
            {book.title}
          </h3>
          <p className="text-sm text-secondary-500">{book.author.name}</p>
          <Rating value={book.rating} showValue />
          <div className="mt-1 flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-primary-700">
                {formatPrice(book.price)}
              </span>
              <span className="ml-2 text-sm text-secondary-400 line-through">
                {formatPrice(book.price * 1.2)}
              </span>
            </div>
            <span className="text-xs text-secondary-400">
              {book.totalPages} pages
            </span>
          </div>
          <div className="mt-1 flex gap-2">
            <button className="flex-1 rounded-lg bg-primary-700 py-2 text-sm font-medium text-white transition-all hover:bg-primary-600 active:scale-[0.98]">
              Buy Now
            </button>
            <button className="flex-1 rounded-lg border border-secondary-300 py-2 text-sm font-medium text-secondary-700 transition-all hover:bg-secondary-50 active:scale-[0.98]">
              Borrow
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
