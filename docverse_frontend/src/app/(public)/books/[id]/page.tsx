"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Heart,
  Share2,
  BookOpen,
  FileText,
  ChevronLeft,
  ShoppingCart,
  Calendar,
  User,
  BookMarked,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Rating } from "@/components/shared/Rating";
import { BookCard } from "@/components/cards/BookCard";
import { formatPrice, formatDate } from "@/lib/utils";
import { mockBooks, mockReviews } from "@/data/mock-data";

export default function BookDetailPage() {
  const params = useParams();
  const book = mockBooks.find((b) => b.id === params.id);
  const [inWishlist, setInWishlist] = useState(false);

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <BookOpen className="h-16 w-16 text-secondary-300" />
        <h2 className="mt-4 text-xl font-semibold text-secondary-900">Book not found</h2>
        <Link href="/books">
          <Button variant="outline" className="mt-4">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Books
          </Button>
        </Link>
      </div>
    );
  }

  const bookReviews = mockReviews.filter((r) => r.bookId === book.id);
  const relatedBooks = mockBooks
    .filter((b) => b.categoryId === book.categoryId && b.id !== book.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b bg-secondary-50">
        <div className="page-container py-3">
          <div className="flex items-center gap-2 text-sm text-secondary-500">
            <Link href="/" className="hover:text-secondary-700">Home</Link>
            <span>/</span>
            <Link href="/books" className="hover:text-secondary-700">Books</Link>
            <span>/</span>
            <span className="text-secondary-900">{book.title}</span>
          </div>
        </div>
      </div>

      <div className="page-container py-8">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Book Cover */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full aspect-[3/4] object-cover"
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button
                    onClick={() => setInWishlist(!inWishlist)}
                    className={`rounded-full p-2.5 shadow-lg transition-all ${
                      inWishlist
                        ? "bg-red-500 text-white"
                        : "bg-white/90 text-secondary-600 hover:bg-white"
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${inWishlist ? "fill-white" : ""}`} />
                  </button>
                  <button className="rounded-full bg-white/90 p-2.5 text-secondary-600 shadow-lg hover:bg-white transition-all">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <Button size="lg" variant="gradient" className="w-full">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Buy Now - {formatPrice(book.price)}
                </Button>
                {book.isAvailableForBorrow && (
                  <Button size="lg" variant="outline" className="w-full">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Borrow - {formatPrice(book.borrowPrice)}
                  </Button>
                )}
                <Button size="lg" variant="secondary" className="w-full">
                  <FileText className="mr-2 h-5 w-5" />
                  Read Preview
                </Button>
              </div>

              {/* Book Details */}
              <div className="mt-8 space-y-4 rounded-xl border bg-secondary-50 p-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-500">Format</span>
                  <Badge variant="secondary">{book.format}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-500">Pages</span>
                  <span className="text-sm font-medium text-secondary-900">{book.totalPages}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-500">Language</span>
                  <span className="text-sm font-medium text-secondary-900">{book.language}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-500">Published</span>
                  <span className="text-sm font-medium text-secondary-900">{formatDate(book.publishedDate)}</span>
                </div>
                {book.isbn && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-secondary-500">ISBN</span>
                    <span className="text-sm font-medium text-secondary-900">{book.isbn}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Book Info */}
          <div className="lg:col-span-2">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary" className="text-xs">{book.category.name}</Badge>
                {book.isAvailableForBorrow && (
                  <Badge variant="success">Available for Borrow</Badge>
                )}
              </div>
              <h1 className="mt-4 text-3xl font-bold text-secondary-900 md:text-4xl">
                {book.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <Rating value={book.rating} showValue size="md" />
                <span className="text-sm text-secondary-500">
                  ({book.reviewCount} reviews)
                </span>
                <span className="text-sm text-secondary-300">|</span>
                <span className="text-sm text-secondary-500">
                  {book.pageCount} pages
                </span>
              </div>

              {/* Author Info */}
              <Link
                href={`/books?author=${book.author.id}`}
                className="mt-6 flex items-center gap-4 rounded-xl border bg-white p-4 hover:bg-secondary-50 transition-colors"
              >
                <Avatar src={book.author.avatar} alt={book.author.name} size="lg" />
                <div>
                  <p className="text-sm text-secondary-500">Author</p>
                  <p className="font-semibold text-secondary-900">{book.author.name}</p>
                  <p className="text-sm text-secondary-500">{book.author.bio}</p>
                </div>
              </Link>

              {/* Description */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-secondary-900">About This Book</h2>
                <p className="mt-4 text-secondary-600 leading-relaxed">{book.description}</p>
              </div>

              {/* Preview Pages */}
              {book.previewPages.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-xl font-semibold text-secondary-900">Preview</h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {book.previewPages.map((page, i) => (
                      <div key={i} className="overflow-hidden rounded-xl border shadow-sm">
                        <img
                          src={page}
                          alt={`Preview page ${i + 1}`}
                          className="w-full aspect-[3/4] object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-secondary-900">
                    Reviews ({bookReviews.length})
                  </h2>
                  <Button variant="outline" size="sm">Write a Review</Button>
                </div>
                <div className="mt-6 space-y-4">
                  {bookReviews.map((review) => (
                    <div key={review.id} className="rounded-xl border bg-white p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar src={review.user.avatar} alt={review.user.name} size="md" />
                          <div>
                            <p className="font-semibold text-secondary-900">{review.user.name}</p>
                            <Rating value={review.rating} size="sm" />
                          </div>
                        </div>
                        <span className="text-xs text-secondary-400">
                          {formatDate(review.createdAt)}
                        </span>
                      </div>
                      <p className="mt-3 text-secondary-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <section className="mt-16 border-t pt-10">
            <h2 className="text-2xl font-bold text-secondary-900">Related Books</h2>
            <p className="mt-1 text-secondary-500">More books in {book.category.name}</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedBooks.map((relatedBook) => (
                <BookCard key={relatedBook.id} book={relatedBook} variant="compact" />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
