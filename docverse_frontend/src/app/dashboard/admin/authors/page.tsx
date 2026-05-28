"use client";

import { useState } from "react";
import { Search, MoreHorizontal, BookOpen, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { mockUsers, mockBooks } from "@/data/mock-data";
import { UserRole } from "@/types";

export default function AdminAuthorsPage() {
  const [search, setSearch] = useState("");

  const authors = mockUsers
    .filter((u) => u.role === UserRole.AUTHOR)
    .map((author) => ({
      ...author,
      bookCount: mockBooks.filter((b) => b.authorId === author.id).length,
      totalEarnings: 12500 + Math.floor(Math.random() * 5000),
    }));

  const filteredAuthors = authors.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Manage Authors</h1>
        <p className="text-secondary-500">View and manage platform authors</p>
      </div>

      <div className="mt-6 relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
        <Input placeholder="Search authors..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      <div className="mt-6 rounded-xl border bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-secondary-50">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-secondary-500">Author</th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase text-secondary-500">Books</th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase text-secondary-500">Earnings</th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase text-secondary-500">Status</th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase text-secondary-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredAuthors.map((author) => (
                <tr key={author.id} className="hover:bg-secondary-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar src={author.avatar} alt={author.name} size="sm" />
                      <div>
                        <p className="text-sm font-medium text-secondary-900">{author.name}</p>
                        <p className="text-xs text-secondary-500">{author.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm font-medium text-secondary-900">{author.bookCount}</span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium text-green-600">
                    ${author.totalEarnings.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge variant="success">Active</Badge>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4 text-secondary-500" />
                    </Button>
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
