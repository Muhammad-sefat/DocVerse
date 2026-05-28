"use client";

import { BookOpen, Users, DollarSign, TrendingUp, Activity } from "lucide-react";
import { mockDashboardStats, mockRevenueData, mockSalesData } from "@/data/mock-data";
import { formatPrice } from "@/lib/utils";

export default function AdminAnalyticsPage() {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Analytics Overview</h1>
        <p className="text-secondary-500">Platform-wide statistics and metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: BookOpen, label: "Total Books", value: "145", change: "+12%", color: "bg-blue-50 text-blue-600" },
          { icon: Users, label: "Total Users", value: "2,847", change: "+8.2%", color: "bg-green-50 text-green-600" },
          { icon: DollarSign, label: "Total Revenue", value: formatPrice(54300), change: "+23.5%", color: "bg-primary-50 text-primary-600" },
          { icon: Activity, label: "Active Borrows", value: "234", change: "+5.1%", color: "bg-purple-50 text-purple-600" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border bg-white p-6">
            <div className="flex items-center justify-between">
              <div className={`rounded-lg p-3 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium text-green-600">{stat.change}</span>
            </div>
            <p className="mt-4 text-2xl font-bold text-secondary-900">{stat.value}</p>
            <p className="text-sm text-secondary-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <div className="rounded-xl border bg-white p-6">
          <h3 className="font-semibold text-secondary-900">Revenue Overview</h3>
          <div className="mt-6">
            <div className="flex items-end justify-between gap-2" style={{ height: "200px" }}>
              {mockRevenueData.map((item) => {
                const maxVal = Math.max(...mockRevenueData.map((d) => d.revenue));
                const height = (item.revenue / maxVal) * 100;
                return (
                  <div key={item.month} className="relative flex flex-1 flex-col items-center gap-2">
                    <span className="text-xs font-medium text-secondary-600">
                      ${(item.revenue / 1000).toFixed(1)}k
                    </span>
                    <div
                      className="w-full rounded-lg bg-primary-600 transition-all duration-500 hover:opacity-80"
                      style={{ height: `${height}%`, minHeight: "20px" }}
                    />
                    <span className="text-xs text-secondary-500">{item.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sales Chart */}
        <div className="rounded-xl border bg-white p-6">
          <h3 className="font-semibold text-secondary-900">Sales Overview</h3>
          <div className="mt-6">
            <div className="flex items-end justify-between gap-2" style={{ height: "200px" }}>
              {mockSalesData.map((item) => {
                const maxVal = Math.max(...mockSalesData.map((d) => d.orders));
                const height = (item.orders / maxVal) * 100;
                return (
                  <div key={item.date} className="relative flex flex-1 flex-col items-center gap-2">
                    <span className="text-xs font-medium text-secondary-600">{item.orders}</span>
                    <div
                      className="w-full rounded-lg bg-green-500 transition-all duration-500 hover:opacity-80"
                      style={{ height: `${height}%`, minHeight: "20px" }}
                    />
                    <span className="text-xs text-secondary-500">
                      {new Date(item.date).toLocaleDateString("en-US", { month: "short" })}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 rounded-xl border bg-white p-6">
        <h3 className="font-semibold text-secondary-900">Recent Platform Activity</h3>
        <div className="mt-4 space-y-4">
          {[
            { action: "New user registered", detail: "Sarah Johnson joined as Author", time: "10 min ago" },
            { action: "New book published", detail: "Midnight Garden by Lisa Thompson", time: "1 hour ago" },
            { action: "Payment received", detail: "$24.99 - The Shadow Protocol", time: "2 hours ago" },
            { action: "New borrow", detail: "Echoes of Tomorrow - due in 14 days", time: "5 hours ago" },
          ].map((activity, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border bg-secondary-50 p-4">
              <div>
                <p className="font-medium text-secondary-900">{activity.action}</p>
                <p className="text-sm text-secondary-500">{activity.detail}</p>
              </div>
              <span className="text-xs text-secondary-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
