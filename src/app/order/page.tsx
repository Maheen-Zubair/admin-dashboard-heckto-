"use client";

import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";

type Order = {
  id: string;
  customer: string;
  items: string; 
  total: number;
  status: "completed" | "pending" | "cancelled";
  date: string;
};

const sampleOrders: Order[] = [
  { id: "1001", customer: "Alice", items: "Chair, Sofa", total: 500, status: "completed", date: "2025-01-01" },
  { id: "1002", customer: "Bob", items: "Sofa", total: 300, status: "pending", date: "2025-01-02" },
  { id: "1003", customer: "Charlie", items: "Chair", total: 150, status: "cancelled", date: "2025-01-03" },
  { id: "1004", customer: "Dave", items: "Chair, Chair", total: 250, status: "completed", date: "2025-01-04" },
  { id: "1005", customer: "Eve", items: "Sofa, Chair", total: 600, status: "pending", date: "2025-01-05" },
  { id: "1006", customer: "Frank", items: "Chair, Sofa, Chair", total: 700, status: "completed", date: "2025-01-06" },
  { id: "1007", customer: "Grace", items: "Sofa", total: 350, status: "completed", date: "2025-01-07" },
  { id: "1008", customer: "Hank", items: "Chair", total: 120, status: "pending", date: "2025-01-08" },
  { id: "1009", customer: "Ivy", items: "Chair, Chair", total: 200, status: "completed", date: "2025-01-09" },
  { id: "1010", customer: "Jack", items: "Sofa", total: 400, status: "cancelled", date: "2025-01-10" },
  { id: "1011", customer: "Kate", items: "Chair, Sofa", total: 550, status: "completed", date: "2025-01-11" },
  { id: "1012", customer: "Leo", items: "Chair", total: 180, status: "pending", date: "2025-01-12" },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(sampleOrders);
  }, []);

  return (
    <div className="min-h-screen w-screen bg-white dark:bg-gray-900 p-6">
      <div className="container ">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">
          Orders
        </h1>
        <div className="mb-6 flex flex-wrap gap-4">
              <Input
                placeholder="Search by product name"
                className="w-full bg-gray-100 placeholder:text-gray-900 sm:w-1/2 md:w-1/3"
              />
              <Input
                placeholder="Filter by Category"
                className="w-full bg-gray-100 placeholder:text-gray-900 sm:w-1/2 md:w-1/3"
              />
            </div>
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-2 text-left  font-bold text-gray-700  tracking-wider dark:text-gray-300">
                    Order ID
                  </th>
                  <th className="px-6 py-2 text-left  font-bold text-gray-700  tracking-wider dark:text-gray-300 ">
                    Customer
                  </th>
                  <th className="px-6 py-2 text-left  font-bold text-gray-700  tracking-wider dark:text-gray-300">
                    Items
                  </th>
                  <th className="px-6 py-2 text-left  font-bold text-gray-700  tracking-wider dark:text-gray-300">
                    Total ($)
                  </th>
                  <th className="px-6 py-2 text-left  font-bold text-gray-700  tracking-wider dark:text-gray-300">
                    Status
                  </th>
                  <th className="px-6 py-2 text-left  font-bold text-gray-700  tracking-wider dark:text-gray-300">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-50 dark:bg-gray-800 divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {order.items}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {order.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
