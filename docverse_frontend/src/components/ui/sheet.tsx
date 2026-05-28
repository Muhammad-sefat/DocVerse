"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: "left" | "right";
}

export function Sheet({ open, onClose, children, side = "left" }: SheetProps) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div
        className={cn(
          "fixed inset-y-0 z-50 flex h-full w-full max-w-sm flex-col bg-white shadow-xl",
          "animate-in duration-300",
          side === "left" ? "left-0 slide-in-from-left" : "right-0 slide-in-from-right"
        )}
      >
        <div className="flex items-center justify-between border-b px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-secondary-400 hover:bg-secondary-100 hover:text-secondary-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
      </div>
    </div>
  );
}
