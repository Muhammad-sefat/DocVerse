"use client";

import { useState } from "react";
import { Search, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { formatPrice } from "@/lib/utils";
import { mockBooks } from "@/data/mock-data";

export default function AdminBooksPage() {
  const [search, setSearch] = useState("");

  const filteredBooks = mockBooks.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Manage Books</h1>
        <p className="text-secondary-500">View and manage all books on the platform</p>
      </div>

      <div className="mt-6 relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
        <Input placeholder="Search books..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      <div className="mt-6 rounded-xl border bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-secondary-50">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-secondary-500">Book</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-secondary-500">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-secondary-500">Category</th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase text-secondary-500">Price</th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase text-secondary-500">Rating</th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase text-secondary-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredBooks.map((book) => (
                <tr key={book.id} className="hover:bg-secondary-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-10 flex-shrink-0 overflow-hidden rounded-lg">
                        <img src={book.coverImage} alt={book.title} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-secondary-900">{book.title}</p>
                        <p className="text-xs text-secondary-400">{book.totalPages} pages</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-secondary-600">{book.author.name}</td>
                  <td className="px-6 py-4">
                    <Badge variant="secondary">{book.category.name}</Badge>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium text-secondary-900">
                    {formatPrice(book.price)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm text-secondary-600">{book.rating}/5</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="sm" className="text-red-500"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
