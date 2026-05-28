"use client";

import { TrendingUp, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice, formatDate } from "@/lib/utils";
import { PaymentStatus } from "@/types";

const mockSales = [
  { id: "1", book: "The Shadow Protocol", buyer: "John Doe", amount: 24.99, status: PaymentStatus.COMPLETED, date: "2024-06-01T10:00:00Z" },
  { id: "2", book: "The Shadow Protocol", buyer: "Sarah Johnson", amount: 24.99, status: PaymentStatus.COMPLETED, date: "2024-05-28T10:00:00Z" },
  { id: "3", book: "The Last Detective", buyer: "Mike Brown", amount: 22.99, status: PaymentStatus.COMPLETED, date: "2024-05-25T10:00:00Z" },
  { id: "4", book: "Whispers in the Wind", buyer: "Emily Davis", amount: 21.99, status: PaymentStatus.PENDING, date: "2024-05-23T10:00:00Z" },
  { id: "5", book: "The Shadow Protocol", buyer: "Chris Wilson", amount: 24.99, status: PaymentStatus.COMPLETED, date: "2024-05-20T10:00:00Z" },
];

const statusColors = {
  [PaymentStatus.COMPLETED]: "success" as const,
  [PaymentStatus.PENDING]: "warning" as const,
  [PaymentStatus.FAILED]: "danger" as const,
  [PaymentStatus.REFUNDED]: "default" as const,
};

export default function SalesHistoryPage() {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Sales History</h1>
        <p className="text-secondary-500">View all your book transactions</p>
      </div>

      <div className="mt-8 rounded-xl border bg-white">
        <div className="border-b px-6 py-4 flex items-center justify-between">
          <h3 className="font-semibold text-secondary-900">Recent Sales</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-secondary-500">Total: {formatPrice(mockSales.reduce((sum, s) => sum + s.amount, 0))}</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-secondary-50">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-secondary-500">Book</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-secondary-500">Buyer</th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase text-secondary-500">Amount</th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase text-secondary-500">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase text-secondary-500">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {mockSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-secondary-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-secondary-900">{sale.book}</td>
                  <td className="px-6 py-4 text-sm text-secondary-600">{sale.buyer}</td>
                  <td className="px-6 py-4 text-right text-sm font-medium text-secondary-900">
                    {formatPrice(sale.amount)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge variant={statusColors[sale.status]}>{sale.status}</Badge>
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-secondary-500">
                    {formatDate(sale.date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
