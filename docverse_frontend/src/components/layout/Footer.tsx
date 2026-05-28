"use client";

import Link from "next/link";
import { BookOpen, Globe, MessageCircle, Camera, Link2 } from "lucide-react";
import { APP_NAME, FOOTER_LINKS } from "@/constants";
import { NewsletterForm } from "@/components/shared/NewsletterForm";

const socialIcons = [Globe, MessageCircle, Camera, Link2];

export function Footer() {
  return (
    <footer className="border-t bg-secondary-950 text-white">
      <div className="page-container py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">{APP_NAME}</span>
            </Link>
            <p className="mt-4 text-sm text-white/60 leading-relaxed">
              Your premier digital library platform. Browse, borrow, and buy books from renowned authors worldwide.
            </p>
            <div className="mt-6 flex gap-3">
              {socialIcons.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white/60 hover:bg-primary-600 hover:text-white transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white">Platform</h3>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.platform.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-white">Support</h3>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-white">Stay Updated</h3>
            <p className="mt-2 text-sm text-white/60">
              Get the latest books and offers delivered to your inbox.
            </p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="page-container flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-white/40 hover:text-white/60 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-white/40 hover:text-white/60 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
