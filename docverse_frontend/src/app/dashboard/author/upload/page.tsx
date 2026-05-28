"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, BookOpen, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { mockCategories } from "@/data/mock-data";

const bookSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  price: z.string().min(1, "Price is required"),
  borrowPrice: z.string().min(1, "Borrow price is required"),
  category: z.string().min(1, "Category is required"),
  totalPages: z.string().min(1, "Total pages is required"),
});

type BookFormData = z.infer<typeof bookSchema>;

const categoryOptions = mockCategories.map((c) => ({
  label: c.name,
  value: c.id,
}));

export default function UploadBookPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
  });

  const onSubmit = async (data: BookFormData) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border bg-white p-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-secondary-900">Book Published!</h2>
        <p className="mt-2 text-secondary-500">Your book has been submitted for review.</p>
        <Button variant="gradient" className="mt-6" onClick={() => setIsSubmitted(false)}>
          <Upload className="mr-2 h-4 w-4" />
          Upload Another Book
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Upload New Book</h1>
        <p className="text-secondary-500">Fill in the details to publish your book</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="rounded-xl border bg-white p-6 space-y-6">
          {/* Cover Image */}
          <div>
            <Label>Book Cover</Label>
            <div className="mt-1.5 flex items-center justify-center rounded-lg border-2 border-dashed border-secondary-300 p-8 hover:border-primary-400 transition-colors cursor-pointer">
              <div className="text-center">
                <Upload className="mx-auto h-8 w-8 text-secondary-400" />
                <p className="mt-2 text-sm text-secondary-500">Upload cover image</p>
                <p className="text-xs text-secondary-400">PNG, JPG up to 5MB</p>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="title">Book Title</Label>
            <Input id="title" {...register("title")} placeholder="Enter book title" className="mt-1.5" />
            {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              {...register("description")}
              placeholder="Write a compelling description of your book..."
              rows={5}
              className="mt-1.5 w-full rounded-lg border border-secondary-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
            {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="price">Price ($)</Label>
              <Input id="price" type="number" step="0.01" {...register("price")} placeholder="24.99" className="mt-1.5" />
              {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price.message}</p>}
            </div>
            <div>
              <Label htmlFor="borrowPrice">Borrow Price ($)</Label>
              <Input id="borrowPrice" type="number" step="0.01" {...register("borrowPrice")} placeholder="4.99" className="mt-1.5" />
              {errors.borrowPrice && <p className="mt-1 text-xs text-red-500">{errors.borrowPrice.message}</p>}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                id="category"
                options={categoryOptions}
                placeholder="Select category"
                {...register("category")}
                className="mt-1.5"
              />
              {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category.message}</p>}
            </div>
            <div>
              <Label htmlFor="totalPages">Total Pages</Label>
              <Input id="totalPages" type="number" {...register("totalPages")} placeholder="300" className="mt-1.5" />
              {errors.totalPages && <p className="mt-1 text-xs text-red-500">{errors.totalPages.message}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="pdfUrl">PDF URL</Label>
            <Input id="pdfUrl" placeholder="https://..." className="mt-1.5" />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline">Save as Draft</Button>
          <Button type="submit" variant="gradient" size="lg" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Publishing...
              </div>
            ) : (
              <>
                <BookOpen className="mr-2 h-4 w-4" />
                Publish Book
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
