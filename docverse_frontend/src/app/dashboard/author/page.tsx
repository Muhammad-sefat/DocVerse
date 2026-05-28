"use client";

import { BookOpen, DollarSign, TrendingUp, Users } from "lucide-react";
import { mockDashboardStats, mockEarnings } from "@/data/mock-data";
import { formatPrice } from "@/lib/utils";

export default function AuthorOverviewPage() {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Author Dashboard</h1>
        <p className="text-secondary-500">Overview of your books and earnings</p>
      </div>

      {/* Stats Cards */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: BookOpen, label: "Total Books", value: "12", color: "bg-blue-50 text-blue-600" },
          { icon: DollarSign, label: "Total Earnings", value: formatPrice(15340), color: "bg-green-50 text-green-600" },
          { icon: TrendingUp, label: "Monthly Growth", value: "+23.5%", color: "bg-primary-50 text-primary-600" },
          { icon: Users, label: "Total Readers", value: "1,234", color: "bg-purple-50 text-purple-600" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border bg-white p-6">
            <div className="flex items-center justify-between">
              <div className={`rounded-lg p-3 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
            <p className="mt-4 text-2xl font-bold text-secondary-900">{stat.value}</p>
            <p className="text-sm text-secondary-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Earnings Chart */}
      <div className="mt-8 rounded-xl border bg-white p-6">
        <h3 className="font-semibold text-secondary-900">Monthly Earnings</h3>
        <div className="mt-6">
          <div className="flex items-end justify-between gap-2" style={{ height: "200px" }}>
            {mockEarnings.map((item) => {
              const maxAmount = Math.max(...mockEarnings.map((e) => e.amount));
              const height = (item.amount / maxAmount) * 100;
              return (
                <div key={item.month} className="relative flex flex-1 flex-col items-center gap-2">
                  <span className="text-xs font-medium text-secondary-600">
                    ${(item.amount / 1000).toFixed(1)}k
                  </span>
                  <div
                    className="w-full rounded-lg gradient-primary transition-all duration-500 hover:opacity-80"
                    style={{ height: `${height}%`, minHeight: "20px" }}
                  />
                  <span className="text-xs text-secondary-500">{item.month}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 rounded-xl border bg-white p-6">
        <h3 className="font-semibold text-secondary-900">Recent Activity</h3>
        <div className="mt-4 space-y-4">
          {[
            { action: "New purchase", book: "The Shadow Protocol", amount: "+$24.99", time: "2 hours ago" },
            { action: "New borrow", book: "Echoes of Tomorrow", amount: "+$5.99", time: "5 hours ago" },
            { action: "New review", book: "The Last Detective", amount: "5 stars", time: "1 day ago" },
          ].map((activity, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border bg-secondary-50 p-4">
              <div>
                <p className="font-medium text-secondary-900">{activity.action}</p>
                <p className="text-sm text-secondary-500">{activity.book}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-green-600">{activity.amount}</p>
                <p className="text-xs text-secondary-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
