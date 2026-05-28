"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@docverse.com" },
  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
  { icon: MapPin, label: "Address", value: "123 Library St, Book City, BC 10001" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-hero py-24 md:py-32">
        <div className="page-container text-center">
          <h1 className="text-4xl font-bold text-white md:text-6xl">Contact Us</h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Have a question, suggestion, or just want to say hello? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="page-container">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-secondary-900">Send Us a Message</h2>
              <p className="mt-2 text-secondary-500">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              {submitted ? (
                <div className="mt-8 flex flex-col items-center rounded-xl border bg-green-50 p-8 text-center">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                  <h3 className="mt-4 text-lg font-semibold text-green-800">Message Sent!</h3>
                  <p className="mt-2 text-sm text-green-600">
                    Thank you for reaching out. We'll respond within 24 hours.
                  </p>
                  <Button variant="outline" className="mt-4" onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", message: "" }); }}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      required
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      required
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us how we can help..."
                      required
                      rows={5}
                      className="mt-1.5 w-full rounded-lg border border-secondary-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    />
                  </div>
                  <Button type="submit" variant="gradient" size="lg" className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-secondary-900">Get in Touch</h2>
              <p className="mt-2 text-secondary-500">
                Here are other ways to reach us.
              </p>
              <div className="mt-8 space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
                      <info.icon className="h-6 w-6 text-primary-700" />
                    </div>
                    <div>
                      <p className="font-semibold text-secondary-900">{info.label}</p>
                      <p className="text-secondary-500">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-xl border bg-secondary-50 p-6">
                <h3 className="font-semibold text-secondary-900">Office Hours</h3>
                <div className="mt-4 space-y-2 text-sm text-secondary-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
