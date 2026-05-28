"use client";

import { useState } from "react";
import { Save, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/types";

const mockProfile = {
  name: "James Wilson",
  email: "james@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
  role: UserRole.AUTHOR,
  bio: "Bestselling author of mystery and thriller novels with over 15 years of writing experience.",
  joinedDate: "January 2024",
};

export default function AuthorProfilePage() {
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    name: mockProfile.name,
    email: mockProfile.email,
    bio: mockProfile.bio,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Profile Settings</h1>
        <p className="text-secondary-500">Manage your author profile and public information</p>
      </div>

      <div className="mt-8 rounded-xl border bg-white">
        <div className="border-b p-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar src={mockProfile.avatar} alt={mockProfile.name} size="xl" />
              <button className="absolute -bottom-1 -right-1 rounded-full bg-primary-600 p-1.5 text-white shadow-sm hover:bg-primary-500 transition-colors">
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>
            <div>
              <h3 className="font-semibold text-secondary-900">{mockProfile.name}</h3>
              <p className="text-sm text-secondary-500">{mockProfile.email}</p>
              <div className="mt-1 flex items-center gap-2">
                <Badge variant="default">Author</Badge>
                <span className="text-xs text-secondary-400">Joined {mockProfile.joinedDate}</span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="mt-1.5" />
            </div>
          </div>

          <div>
            <Label htmlFor="bio">Author Bio</Label>
            <textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
              className="mt-1.5 w-full rounded-lg border border-secondary-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="flex items-center justify-between border-t pt-6">
            <p className="text-sm text-secondary-500">
              {saved ? "Changes saved successfully!" : "Update your profile information"}
            </p>
            <Button type="submit" variant="gradient" disabled={saved}>
              <Save className="mr-2 h-4 w-4" />
              {saved ? "Saved!" : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
