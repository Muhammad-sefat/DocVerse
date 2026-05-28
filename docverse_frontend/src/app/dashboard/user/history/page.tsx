"use client";

import { History, BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { formatDate } from "@/lib/utils";
import { mockReadingHistory } from "@/data/mock-data";

export default function ReadingHistoryPage() {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Reading History</h1>
        <p className="text-secondary-500">Track your reading progress</p>
      </div>

      {mockReadingHistory.length === 0 ? (
        <div className="mt-12 flex flex-col items-center justify-center text-center">
          <History className="h-16 w-16 text-secondary-300" />
          <h3 className="mt-4 text-lg font-semibold text-secondary-900">No reading history</h3>
          <p className="mt-1 text-sm text-secondary-500">Start reading books to track your progress</p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {mockReadingHistory.map((item) => (
            <div key={item.id} className="flex flex-col gap-4 rounded-xl border bg-white p-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4 flex-1">
                <div className="h-20 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={item.book.coverImage}
                    alt={item.book.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-secondary-900">{item.book.title}</h3>
                  <p className="text-sm text-secondary-500">{item.book.author.name}</p>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-secondary-500">Progress</span>
                      <span className="font-medium text-secondary-900">{item.progress}%</span>
                    </div>
                    <Progress value={item.progress} className="mt-1 h-2" />
                  </div>
                </div>
              </div>
              <div className="text-sm text-secondary-500">
                Last read: {formatDate(item.lastReadAt)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
