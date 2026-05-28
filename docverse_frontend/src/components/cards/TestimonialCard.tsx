"use client";

import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Rating } from "@/components/shared/Rating";

interface TestimonialCardProps {
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  className?: string;
}

export function TestimonialCard({ name, role, avatar, content, rating, className }: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-white p-6 card-shadow card-shadow-hover transition-all duration-300",
        className
      )}
    >
      <Rating value={rating} size="sm" className="mb-4" />
      <p className="text-secondary-600 leading-relaxed">"{content}"</p>
      <div className="mt-6 flex items-center gap-3">
        <Avatar src={avatar} alt={name} size="md" />
        <div>
          <p className="font-semibold text-secondary-900">{name}</p>
          <p className="text-sm text-secondary-500">{role}</p>
        </div>
      </div>
    </div>
  );
}
