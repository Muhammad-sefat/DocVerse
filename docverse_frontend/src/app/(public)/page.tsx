"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Search, Smartphone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookCard } from "@/components/cards/BookCard";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { AuthorCard } from "@/components/cards/AuthorCard";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { NewsletterForm } from "@/components/shared/NewsletterForm";
import {
  mockBooks,
  mockCategories,
  mockUsers,
  testimonials,
} from "@/data/mock-data";
import { UserRole } from "@/types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const authors = mockUsers
  .filter((u) => u.role === UserRole.AUTHOR)
  .map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    bio: u.bio || "",
    avatar: u.avatar || "",
    bookCount: mockBooks.filter((b) => b.authorId === u.id).length,
    rating: 4.5 + Math.random() * 0.4,
    joinedDate: u.createdAt,
  }));

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const authorsRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-content > *", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      const sections = [
        featuredRef.current,
        categoriesRef.current,
        authorsRef.current,
        stepsRef.current,
        testimonialsRef.current,
      ];

      sections.forEach((section) => {
        if (!section) return;
        const items = section.querySelectorAll(".reveal-item");
        gsap.from(items, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const featuredBooks = mockBooks.slice(0, 6);
  const popularCategories = mockCategories.slice(0, 6);
  const topAuthors = authors.slice(0, 4);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden gradient-hero">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="page-container relative py-16 lg:py-24">
          <div className="hero-content mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/80 backdrop-blur-sm mb-8">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>Welcome to the future of digital reading</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Discover, Borrow & Buy
              <span className="block mt-2 bg-linear-to-r from-primary-200 to-white bg-clip-text text-transparent">
                Books You Love
              </span>
            </h1>
            <p className="mt-6 text-lg text-white/70 md:text-xl max-w-2xl mx-auto">
              Your premier digital library platform. Explore thousands of books,
              borrow instantly, and build your personal digital library with
              DocVerse.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/books">
                <Button
                  size="lg"
                  className="bg-white text-primary-800 hover:bg-white/90 shadow-xl transition-colors cursor-pointer"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Browse Books
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-primary-800 hover:bg-white/90 shadow-xl transition-colors cursor-pointer"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-10">
              {[
                { value: "10K+", label: "Books" },
                { value: "500+", label: "Authors" },
                { value: "50K+", label: "Readers" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold text-white md:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-white/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section ref={featuredRef} className="section-padding">
        <div className="page-container">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="section-title">Featured Books</h2>
              <p className="section-subtitle">
                Discover our most popular and highly rated books
              </p>
            </div>
            <Link
              href="/books"
              className="hidden items-center gap-1 text-sm font-medium text-primary-700 hover:text-primary-600 transition-colors sm:flex"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {featuredBooks.map((book) => (
              <div key={book.id} className="reveal-item">
                <BookCard book={book} />
              </div>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/books">
              <Button variant="outline">
                View All Books
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section ref={categoriesRef} className="section-padding bg-secondary-50">
        <div className="page-container">
          <div className="text-center">
            <h2 className="section-title">Popular Categories</h2>
            <p className="section-subtitle">
              Explore books across various genres and topics
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {popularCategories.map((category) => (
              <div key={category.id} className="reveal-item">
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Authors */}
      <section ref={authorsRef} className="section-padding">
        <div className="page-container">
          <div className="text-center">
            <h2 className="section-title">Top Authors</h2>
            <p className="section-subtitle">
              Meet our renowned authors and their amazing works
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topAuthors.map((author) => (
              <div key={author.id} className="reveal-item">
                <AuthorCard author={author} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section ref={stepsRef} className="section-padding bg-secondary-50">
        <div className="page-container">
          <div className="text-center">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
              Get started in three simple steps
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Search,
                title: "Browse",
                description:
                  "Explore our vast collection of books across multiple categories and genres.",
                color: "bg-blue-100 text-blue-600",
              },
              {
                icon: BookOpen,
                title: "Buy or Borrow",
                description:
                  "Purchase your favorite books or borrow them at affordable prices.",
                color: "bg-primary-100 text-primary-600",
              },
              {
                icon: Smartphone,
                title: "Read Anywhere",
                description:
                  "Access your library anytime, anywhere on any device.",
                color: "bg-green-100 text-green-600",
              },
            ].map((step) => (
              <div
                key={step.title}
                className="reveal-item text-center hover:border hover:border-secondary-200 rounded-lg p-6 transition-shadow hover:shadow-lg"
              >
                <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg">
                  <div className={`rounded-xl p-4 ${step.color}`}>
                    <step.icon className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-secondary-900">
                  {step.title}
                </h3>
                <p className="mt-3 text-secondary-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} className="section-padding">
        <div className="page-container">
          <div className="text-center">
            <h2 className="section-title">What Our Readers Say</h2>
            <p className="section-subtitle">
              Join thousands of satisfied readers worldwide
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="reveal-item">
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding gradient-hero">
        <div className="page-container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Stay Updated
            </h2>
            <p className="mt-3 text-lg text-white/70">
              Get the latest book releases, exclusive offers, and reading tips
              delivered to your inbox.
            </p>
            <div className="mt-8 max-w-md mx-auto">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
