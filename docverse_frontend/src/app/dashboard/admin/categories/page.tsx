"use client";

import { useState } from "react";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockCategories } from "@/data/mock-data";

export default function AdminCategoriesPage() {
  const [search, setSearch] = useState("");

  const filteredCategories = mockCategories.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Manage Categories</h1>
          <p className="text-secondary-500">Organize and manage book categories</p>
        </div>
        <Button variant="gradient">
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <div className="mt-6 relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
        <Input placeholder="Search categories..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.map((category) => (
          <div key={category.id} className="group relative overflow-hidden rounded-xl border bg-white card-shadow-hover">
            <div className="relative h-32 overflow-hidden">
              <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-4">
                <h3 className="font-semibold text-white">{category.name}</h3>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-secondary-600 line-clamp-2">{category.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <Badge variant="secondary">{category.bookCount} books</Badge>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" className="text-red-500"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
