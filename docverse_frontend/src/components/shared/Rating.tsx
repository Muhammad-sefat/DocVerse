"use client";

import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

export function Rating({ value, max = 5, size = "sm", showValue, className }: RatingProps) {
  const stars = [];
  const fullStars = Math.floor(value);
  const hasHalf = value - fullStars >= 0.5;

  for (let i = 1; i <= max; i++) {
    if (i <= fullStars) {
      stars.push(
        <Star key={i} className={cn(sizeClasses[size], "fill-yellow-400 text-yellow-400")} />
      );
    } else if (i === fullStars + 1 && hasHalf) {
      stars.push(
        <StarHalf key={i} className={cn(sizeClasses[size], "fill-yellow-400 text-yellow-400")} />
      );
    } else {
      stars.push(
        <Star key={i} className={cn(sizeClasses[size], "text-secondary-300")} />
      );
    }
  }

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      <div className="flex">{stars}</div>
      {showValue && (
        <span className="ml-1.5 text-sm font-medium text-secondary-600">{value.toFixed(1)}</span>
      )}
    </div>
  );
}
