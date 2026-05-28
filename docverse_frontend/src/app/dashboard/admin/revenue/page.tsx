"use client";

import { DollarSign, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { mockRevenueData } from "@/data/mock-data";

export default function RevenuePage() {
  const totalRevenue = mockRevenueData.reduce((sum, r) => sum + r.revenue, 0);
  const totalProfit = mockRevenueData.reduce((sum, r) => sum + r.profit, 0);
  const totalCost = mockRevenueData.reduce((sum, r) => sum + r.cost, 0);
  const thisMonth = mockRevenueData[mockRevenueData.length - 1];

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Revenue Tracking</h1>
        <p className="text-secondary-500">Platform financial overview and analytics</p>
      </div>

      {/* Summary */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: DollarSign, label: "Total Revenue", value: formatPrice(totalRevenue), change: "+23.5%", color: "bg-green-50 text-green-600", positive: true },
          { icon: TrendingUp, label: "This Month", value: formatPrice(thisMonth.revenue), change: "+12.3%", color: "bg-primary-50 text-primary-600", positive: true },
          { icon: TrendingDown, label: "Total Costs", value: formatPrice(totalCost), change: "-8.1%", color: "bg-red-50 text-red-600", positive: false },
          { icon: Calendar, label: "Net Profit", value: formatPrice(totalProfit), change: "+15.7%", color: "bg-blue-50 text-blue-600", positive: true },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border bg-white p-6">
            <div className="flex items-center justify-between">
              <div className={`rounded-lg p-3 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <span className={`text-sm font-medium ${stat.positive ? "text-green-600" : "text-red-600"}`}>
                {stat.change}
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold text-secondary-900">{stat.value}</p>
            <p className="text-sm text-secondary-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue vs Cost Chart */}
      <div className="mt-8 rounded-xl border bg-white p-6">
        <h3 className="font-semibold text-secondary-900">Revenue vs Cost</h3>
        <div className="mt-6">
          <div className="flex items-end justify-between gap-2" style={{ height: "250px" }}>
            {mockRevenueData.map((item) => {
              const maxVal = Math.max(...mockRevenueData.map((d) => d.revenue));
              const revHeight = (item.revenue / maxVal) * 100;
              const costHeight = (item.cost / maxVal) * 100;
              return (
                <div key={item.month} className="relative flex flex-1 flex-col items-center gap-2">
                  <div className="flex w-full gap-1" style={{ height: `${Math.max(revHeight, costHeight)}%` }}>
                    <div
                      className="flex-1 rounded-t-lg bg-primary-500 transition-all duration-500 hover:opacity-80"
                      style={{ height: `${revHeight}%` }}
                      title={`Revenue: ${formatPrice(item.revenue)}`}
                    />
                    <div
                      className="flex-1 rounded-t-lg bg-secondary-300 transition-all duration-500 hover:opacity-80"
                      style={{ height: `${costHeight}%` }}
                      title={`Cost: ${formatPrice(item.cost)}`}
                    />
                  </div>
                  <span className="text-xs text-secondary-500">{item.month}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-primary-500" />
              <span className="text-sm text-secondary-600">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-secondary-300" />
              <span className="text-sm text-secondary-600">Cost</span>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Breakdown Table */}
      <div className="mt-8 rounded-xl border bg-white">
        <div className="border-b px-6 py-4">
          <h3 className="font-semibold text-secondary-900">Monthly Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-secondary-50">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-secondary-500">Month</th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase text-secondary-500">Revenue</th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase text-secondary-500">Cost</th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase text-secondary-500">Profit</th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase text-secondary-500">Margin</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {mockRevenueData.map((item) => {
                const margin = ((item.profit / item.revenue) * 100).toFixed(1);
                return (
                  <tr key={item.month} className="hover:bg-secondary-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-secondary-900">{item.month}</td>
                    <td className="px-6 py-4 text-right text-sm text-secondary-900">{formatPrice(item.revenue)}</td>
                    <td className="px-6 py-4 text-right text-sm text-secondary-600">{formatPrice(item.cost)}</td>
                    <td className="px-6 py-4 text-right text-sm font-medium text-green-600">{formatPrice(item.profit)}</td>
                    <td className="px-6 py-4 text-center">
                      <Badge variant="success">{margin}%</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
