"use client";

import { useState } from "react";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  if (subscribed) {
    return (
      <div className="flex items-center gap-3 rounded-lg bg-green-50 p-4">
        <CheckCircle className="h-5 w-5 text-green-600" />
        <p className="text-sm font-medium text-green-800">
          Thanks for subscribing! Check your inbox for updates.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-10"
          required
        />
      </div>
      <Button type="submit" variant="gradient">
        Subscribe
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
}
