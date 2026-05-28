"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";
import Image from "next/image";

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  return (
    <Link href={`/books?category=${category.id}`}>
      <div
        className={cn(
          "group relative overflow-hidden rounded-xl border bg-white card-shadow card-shadow-hover transition-all duration-300",
          className,
        )}
      >
        <div className="relative h-40 overflow-hidden">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white">{category.name}</h3>
            <p className="mt-1 text-sm text-white/80">
              {category.bookCount} books
            </p>
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm text-secondary-600 line-clamp-2">
            {category.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
