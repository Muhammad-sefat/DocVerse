"use client";

import { DollarSign, TrendingUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { mockEarnings } from "@/data/mock-data";

export default function EarningsPage() {
  const totalEarnings = mockEarnings.reduce((sum, e) => sum + e.amount, 0);
  const totalBooks = mockEarnings.reduce((sum, e) => sum + e.books, 0);

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Earnings</h1>
        <p className="text-secondary-500">Track your revenue and royalties</p>
      </div>

      {/* Summary Cards */}
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {[
          { icon: DollarSign, label: "Total Earnings", value: formatPrice(totalEarnings), color: "bg-green-50 text-green-600" },
          { icon: TrendingUp, label: "This Month", value: formatPrice(mockEarnings[mockEarnings.length - 1].amount), color: "bg-primary-50 text-primary-600" },
          { icon: Calendar, label: "Total Sold", value: `${totalBooks} books`, color: "bg-blue-50 text-blue-600" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border bg-white p-6">
            <div className={`rounded-lg p-3 w-fit ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <p className="mt-4 text-2xl font-bold text-secondary-900">{stat.value}</p>
            <p className="text-sm text-secondary-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Earnings Table */}
      <div className="mt-8 rounded-xl border bg-white">
        <div className="border-b px-6 py-4">
          <h3 className="font-semibold text-secondary-900">Monthly Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-secondary-50">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-secondary-500">Month</th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase text-secondary-500">Books Sold</th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase text-secondary-500">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {mockEarnings.map((item) => (
                <tr key={item.month} className="hover:bg-secondary-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-secondary-900">{item.month}</td>
                  <td className="px-6 py-4 text-right text-sm text-secondary-600">{item.books}</td>
                  <td className="px-6 py-4 text-right text-sm font-medium text-green-600">
                    +{formatPrice(item.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Withdraw */}
      <div className="mt-8 rounded-xl border bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-secondary-900">Available for Withdrawal</h3>
            <p className="mt-1 text-3xl font-bold text-primary-700">{formatPrice(2840)}</p>
          </div>
          <Button variant="gradient" size="lg">
            <DollarSign className="mr-2 h-4 w-4" />
            Withdraw Funds
          </Button>
        </div>
      </div>
    </div>
  );
}
