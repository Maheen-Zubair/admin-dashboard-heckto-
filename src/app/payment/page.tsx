"use client";

import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";

type Payment = {
    id: string;
    user: string;
    amount: number;
    status: "succeeded" | "pending" | "failed";
    date: string;
  };
  
  const samplePayments: Payment[] = [
    { id: "1", user: "Alice", amount: 250, status: "succeeded", date: "2025-01-01" },
    { id: "2", user: "Bob", amount: 150, status: "succeeded", date: "2025-01-02" },
    { id: "3", user: "Charlie", amount: 300, status: "succeeded", date: "2025-01-03" },
    { id: "4", user: "Dave", amount: 100, status: "pending", date: "2025-01-04" },
    { id: "5", user: "Eve", amount: 200, status: "succeeded", date: "2025-01-05" },
    { id: "6", user: "Frank", amount: 350, status: "pending", date: "2025-01-06" },
    { id: "7", user: "Grace", amount: 180, status: "succeeded", date: "2025-01-07" },
    { id: "8", user: "Hank", amount: 220, status: "succeeded", date: "2025-01-08" },
    { id: "9", user: "Ivy", amount: 400, status: "failed", date: "2025-01-09" },
    { id: "10", user: "Jack", amount: 120, status: "failed", date: "2025-01-10" },
    { id: "11", user: "Kate", amount: 270, status: "succeeded", date: "2025-01-11" },
    { id: "12", user: "Leo", amount: 160, status: "succeeded", date: "2025-01-12" },
  ];
  
export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    setPayments(samplePayments);
  }, []);

  return (
    <div className="min-h-screen w-screen ">
      <div className="max-w-7xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Payments</h1>
        <div className="mb-6 flex flex-wrap gap-4">
              <Input
                placeholder="Search by product name"
                className="w-full bg-gray-100 placeholder:text-gray-900 sm:w-1/2 md:w-1/3"
              />
              <Input
                placeholder="Filter by Status"
                className="w-full bg-gray-100 placeholder:text-gray-900 sm:w-1/2 md:w-1/3"
              />
            </div>
        <div className="overflow-x-auto">
          <table className="min-w-full  divide-gray-200">
            <thead className="bg-gray-200 ">
              <tr>
                <th className="px-6 py-2 text-left  font-bold text-gray-700  tracking-wider">
                  ID
                </th>
                <th className="px-6 py-2 text-left  font-bold text-gray-700  tracking-wider">
                  User
                </th>
                <th className="ppx-6 py-2 text-left  font-bold text-gray-700  tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-2 text-left  font-bold text-gray-700  tracking-wider">
                  Status
                </th>
                <th className="px-6 py-2 text-left  font-bold text-gray-700  tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-50  divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${payment.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        payment.status === "succeeded"
                          ? "bg-green-100 text-green-800"
                          : payment.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.date}
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
