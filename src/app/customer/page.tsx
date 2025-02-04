"use client";

import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  joined: string;
};

const sampleCustomers: Customer[] = [
  { id: "1", name: "Alice", email: "alice@example.com", phone: "123-456-7890", status: "active", joined: "2025-01-01" },
  { id: "2", name: "Bob", email: "bob@example.com", phone: "234-567-8901", status: "active", joined: "2025-01-02" },
  { id: "3", name: "Charlie", email: "charlie@example.com", phone: "345-678-9012", status: "inactive", joined: "2025-01-03" },
  { id: "4", name: "Dave", email: "dave@example.com", phone: "456-789-0123", status: "active", joined: "2025-01-04" },
  { id: "5", name: "Eve", email: "eve@example.com", phone: "567-890-1234", status: "inactive", joined: "2025-01-05" },
  { id: "6", name: "Frank", email: "frank@example.com", phone: "678-901-2345", status: "active", joined: "2025-01-06" },
  { id: "7", name: "Grace", email: "grace@example.com", phone: "789-012-3456", status: "active", joined: "2025-01-07" },
  { id: "8", name: "Hank", email: "hank@example.com", phone: "890-123-4567", status: "inactive", joined: "2025-01-08" },
  { id: "9", name: "Ivy", email: "ivy@example.com", phone: "901-234-5678", status: "active", joined: "2025-01-09" },
  { id: "10", name: "Jack", email: "jack@example.com", phone: "012-345-6789", status: "active", joined: "2025-01-10" },
  { id: "11", name: "Kate", email: "kate@example.com", phone: "123-456-7800", status: "inactive", joined: "2025-01-11" },
  { id: "12", name: "Leo", email: "leo@example.com", phone: "234-567-8900", status: "active", joined: "2025-01-12" },
];

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    setCustomers(sampleCustomers);
  }, []);

  return (
    <div className="min-h-screen w-screen bg-white dark:bg-gray-900 p-6">
      <div className="container ">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">
          Customers
        </h1>
        <div className="mb-6 flex flex-wrap gap-4">
              <Input
                placeholder="Search by product name"
                className="w-full bg-gray-100 placeholder:text-gray-900 sm:w-1/2 md:w-1/3"
              />
              <Input
                placeholder="Filter by email"
                className="w-full bg-gray-100 placeholder:text-gray-900 sm:w-1/2 md:w-1/3"
              />
            </div>
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-2 text-left  font-bold text-gray-700  tracking-wider dark:text-gray-300">
                    ID
                  </th>
                  <th className="px-6 py-2 text-left  font-bold text-gray-700  tracking-wider dark:text-gray-300">
                    Name
                  </th>
                  <th className="px-6 py-2 text-left  font-bold text-gray-700  tracking-wider dark:text-gray-300">
                    Email
                  </th>
                  <th className="px-6 py-2 text-left  font-bold text-gray-700  tracking-wider dark:text-gray-300">
                    Phone
                  </th>
                  <th className="px-6 py-2 text-left  font-bold text-gray-700  tracking-wider dark:text-gray-300">
                    Status
                  </th>
                  <th className="px-6 py-2 text-left  font-bold text-gray-700  tracking-wider dark:text-gray-300">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-50 dark:bg-gray-800 divide-y divide-gray-200">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {customer.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {customer.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {customer.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {customer.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          customer.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {customer.joined}
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
