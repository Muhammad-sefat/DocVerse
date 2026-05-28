"use client";

import { BookOpen, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import type { Author } from "@/types";

interface AuthorCardProps {
  author: Author;
  className?: string;
}

export function AuthorCard({ author, className }: AuthorCardProps) {
  return (
    <div
      className={cn(
        "group flex flex-col items-center rounded-xl border bg-white p-6 card-shadow card-shadow-hover transition-all duration-300 text-center",
        className
      )}
    >
      <Avatar src={author.avatar} alt={author.name} size="xl" className="ring-4 ring-primary-100" />
      <h3 className="mt-4 font-semibold text-secondary-900 group-hover:text-primary-700 transition-colors">
        {author.name}
      </h3>
      <div className="mt-2 flex items-center gap-4 text-sm text-secondary-500">
        <span className="flex items-center gap-1">
          <BookOpen className="h-3.5 w-3.5" />
          {author.bookCount} books
        </span>
        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          {author.rating}
        </span>
      </div>
      <p className="mt-3 text-sm text-secondary-500 line-clamp-2">{author.bio}</p>
    </div>
  );
}
