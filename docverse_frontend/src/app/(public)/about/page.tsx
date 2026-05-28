"use client";

import { useEffect, useRef } from "react";
import { BookOpen, Users, Globe, Award, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { mockUsers } from "@/data/mock-data";
import { UserRole } from "@/types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: BookOpen, value: "10,000+", label: "Books in Library" },
  { icon: Users, value: "50,000+", label: "Active Readers" },
  { icon: Globe, value: "100+", label: "Countries Reached" },
  { icon: Award, value: "500+", label: "Published Authors" },
];

const teamMembers = mockUsers
  .filter((u) => u.role === UserRole.ADMIN || u.role === UserRole.AUTHOR)
  .slice(0, 4);

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-hero > *", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      [statsRef.current, contentRef.current].forEach((section) => {
        if (!section) return;
        gsap.from(section.querySelectorAll(".reveal-item"), {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        ref={heroRef}
        className="about-hero gradient-hero py-16 lg:py-24"
      >
        <div className="page-container text-center">
          <h1 className="text-4xl font-bold text-white md:text-6xl">
            About DocVerse
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Were on a mission to make knowledge and literature accessible to
            everyone, everywhere.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="section-padding bg-white">
        <div className="page-container">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="reveal-item text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50">
                  <stat.icon className="h-8 w-8 text-primary-700" />
                </div>
                <p className="mt-4 text-3xl font-bold text-secondary-900">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-secondary-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section ref={contentRef} className="section-padding bg-secondary-50">
        <div className="page-container">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="reveal-item">
              <h2 className="text-3xl font-bold text-secondary-900">
                Our Story
              </h2>
              <p className="mt-4 text-secondary-600 leading-relaxed">
                Founded in 2024, DocVerse was born from a simple idea: that
                great books should be accessible to everyone. What started as a
                small digital library has grown into a thriving platform
                connecting thousands of readers with authors from around the
                world.
              </p>
              <p className="mt-4 text-secondary-600 leading-relaxed">
                We believe in the power of stories to transform lives, educate
                minds, and bridge cultures. Our platform not only provides
                access to thousands of books but also empowers authors to reach
                new audiences and build sustainable careers.
              </p>
            </div>
            <div className="reveal-item">
              <h2 className="text-3xl font-bold text-secondary-900">
                Our Mission
              </h2>
              <p className="mt-4 text-secondary-600 leading-relaxed">
                To democratize access to knowledge and literature by building
                the worlds most accessible digital library platform. Were
                committed to supporting authors, rewarding creativity, and
                fostering a global community of readers.
              </p>
              <div className="mt-6 space-y-4">
                {[
                  "Make books accessible to readers worldwide",
                  "Support and empower independent authors",
                  "Promote literacy and lifelong learning",
                  "Build a sustainable ecosystem for digital publishing",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-100">
                      <div className="h-2 w-2 rounded-full bg-primary-600" />
                    </div>
                    <span className="text-secondary-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="page-container text-center">
          <h2 className="text-3xl font-bold text-secondary-900">Our Team</h2>
          <p className="mt-2 text-secondary-500">
            Meet the people behind DocVerse
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="rounded-xl border bg-white p-6 card-shadow text-center"
              >
                <Avatar
                  src={member.avatar}
                  alt={member.name}
                  size="xl"
                  className="mx-auto ring-4 ring-primary-100"
                />
                <h3 className="mt-4 font-semibold text-secondary-900">
                  {member.name}
                </h3>
                <p className="text-sm text-secondary-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-hero">
        <div className="page-container text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Join Our Community
          </h2>
          <p className="mt-3 text-lg text-white/70">
            Start your reading journey with DocVerse today.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-white text-primary-800 hover:bg-white/90 cursor-pointer"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-primary-800 hover:bg-white/90 cursor-pointer"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
