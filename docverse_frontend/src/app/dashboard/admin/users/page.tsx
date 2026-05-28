"use client";

import { useState } from "react";
import { Search, MoreHorizontal, Shield, Ban, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { mockUsers } from "@/data/mock-data";

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");

  const filteredUsers = mockUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Manage Users</h1>
          <p className="text-secondary-500">View and manage all platform users</p>
        </div>
        <Button variant="gradient">
          <Shield className="mr-2 h-4 w-4" />
          Invite User
        </Button>
      </div>

      <div className="mt-6 relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="mt-6 rounded-xl border bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-secondary-50">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-secondary-500">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-secondary-500">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-secondary-500">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase text-secondary-500">Joined</th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase text-secondary-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-secondary-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar src={user.avatar} alt={user.name} size="sm" />
                      <div>
                        <p className="text-sm font-medium text-secondary-900">{user.name}</p>
                        <p className="text-xs text-secondary-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={user.role === "ADMIN" ? "default" : user.role === "AUTHOR" ? "secondary" : "outline"}>
                      {user.role}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={user.isActive ? "success" : "danger"}>
                      {user.isActive ? "Active" : "Banned"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-secondary-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Button variant="ghost" size="sm">
                        <Ban className="h-4 w-4 text-red-500" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4 text-secondary-500" />
                      </Button>
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
