"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
);

export default function Dashboard() {
  const pieData = {
    labels: ["Chair", "Sofa", "Others"],
    datasets: [
      {
        label: "Daily Sales",
        data: [12, 8, 5],
        backgroundColor: ["#4CAF50", "#FF5722", "#FFC107"],
        hoverOffset: 4,
      },
    ],
  };
  const pieChartOptions = { cutout: "70%" };
  const lineData = {
    labels: ["2020", "2021", "2022", "2023", "2024", "2025"],
    datasets: [
      {
        label: "Total Revenue",
        data: [100, 120, 150, 170, 190, 200],
        fill: false,
        borderColor: "#4CAF50",
        tension: 0.1,
      },
    ],
  };

  const barData = {
    labels: ["2010", "2013", "2016", "2019"],
    datasets: [
      {
        label: "Statistics",
        data: [50, 100, 150, 200],
        backgroundColor: "#03A9F4",
      },
    ],
  };

  return (
    <div>
      <div className="w-full pl-7 pr-2 overflow-x-hidden h-full bg-white">
        <h1 className="text-2xl text-[#1E1E2F] font-semibold pl-3">
          Dashboard
        </h1>
        <main className="flex-1 p-6 bg-white overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gray-100 text-[#1E1E2F] shadow-md border-gray-600 hover:bg-gray-200 transition-all duration-300 ease-in-out transform hover:scale-105">
              <CardHeader>
                <CardTitle>Users</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold">1,250</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-100 text-[#1E1E2F] shadow-md border-gray-600 hover:bg-gray-200 transition-all duration-300 ease-in-out transform hover:scale-105">
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold">$48,500</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-100 text-[#1E1E2F] shadow-md border-gray-600 hover:bg-gray-200 transition-all duration-300 ease-in-out transform hover:scale-105">
              <CardHeader>
                <CardTitle>Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold">320</p>
              </CardContent>
            </Card>
          </div>

        </main>
      </div>
      <div className="grid grid-cols-1 pr-2 pl-7 md:grid-cols-3 gap-4">
        <div className="bg-gray-100 p-4 shadow-md rounded">
          <h2 className="text-lg font-bold mb-2">Daily Sales</h2>
          <Doughnut data={pieData} options={pieChartOptions} />
          <p className="mt-4 text-center">
            <strong>5,459</strong> Total Sales | <strong>18</strong> Open
            Campaigns
          </p>
        </div>

        <div className="bg-gray-100 flex flex-col justify-center  p-4 shadow-md rounded">
          <h2 className="text-lg font-bold mb-2">Statistics</h2>
          <Bar data={barData} />
          <p className="mt-4 text-center">
            <strong>Revenue:</strong> $1875.54 | <strong>Offers:</strong> 541
          </p>
        </div>

        <div className="bg-gray-100 p-4 shadow-md  flex flex-col justify-center rounded">
          <h2 className="text-lg font-bold mb-2">Total Revenue</h2>
          <Line data={lineData} />
          <p className="mt-4 text-center">
            <strong>$7841.12</strong> Total Revenue | <strong>17</strong> Open
            Campaigns
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-gray-100 p-4 shadow-md rounded">
          <h2 className="text-lg font-bold mb-4">Recent Buyers</h2>
          <table className="table-auto w-full text-left">
            <thead>
              <tr>
                <th>Product</th>
                <th>Customer</th>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Aurora Chair ", "Tiffany W. Yang", "Chair", "$1200.00"],
                ["Heritage Chair", "Dale P. Warman", "Chair", "$1190.00"],
                ["Serenity Sofa", "Garth I. Terry", "Sofa", "$999.00"],
              ].map((row, index) => (
                <tr key={index}>
                  {row.map((col, i) => (
                    <td className="mt-2 text-gray-700" key={i}>
                      {col}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-100 p-4 shadow-md rounded">
          <h2 className="text-lg font-bold mb-4">Account Transactions</h2>
          <table className="table-auto w-full text-left">
            <thead>
              <tr>
                <th>Card</th>
                <th>Amount</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["**7852", "$79.49", "Helen Warren"],
                ["**0025", "$1254.00", "Kayla Lambie"],
                ["**8547", "$784.25", "Hugo Lavarack"],
              ].map((row, index) => (
                <tr key={index}>
                  {row.map((col, i) => (
                    <td className="text-gray-700" key={i}>
                      {col}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
