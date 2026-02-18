"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  whatsappMessages: number;
  activeCustomers: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalRevenue: 0,
    whatsappMessages: 0,
    activeCustomers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch stats from backend API
    const mockStats = {
      totalOrders: 42,
      totalRevenue: 5250000,
      whatsappMessages: 128,
      activeCustomers: 23,
    };
    setStats(mockStats);
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </Link>
          <div className="flex gap-4">
            <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Dashboard Overview
        </h1>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Orders</h3>
                <p className="text-4xl font-bold text-gray-900 dark:text-white mt-2">
                  {stats.totalOrders}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Revenue</h3>
                <p className="text-4xl font-bold text-green-600 dark:text-green-400 mt-2">
                  Rp {(stats.totalRevenue / 1000000).toFixed(1)}M
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">WhatsApp Messages</h3>
                <p className="text-4xl font-bold text-green-500 dark:text-green-400 mt-2">
                  {stats.whatsappMessages}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Active Customers</h3>
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                  {stats.activeCustomers}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Orders</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b dark:border-gray-700">
                      <tr>
                        <th className="text-left py-2 text-gray-600 dark:text-gray-400">Order ID</th>
                        <th className="text-left py-2 text-gray-600 dark:text-gray-400">Customer</th>
                        <th className="text-left py-2 text-gray-600 dark:text-gray-400">Amount</th>
                        <th className="text-left py-2 text-gray-600 dark:text-gray-400">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-900 dark:text-gray-200">
                      <tr className="border-b dark:border-gray-700">
                        <td className="py-2">#ORD-001</td>
                        <td className="py-2">Budi Santoso</td>
                        <td className="py-2">Rp 500.000</td>
                        <td className="py-2"><span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Completed</span></td>
                      </tr>
                      <tr className="border-b dark:border-gray-700">
                        <td className="py-2">#ORD-002</td>
                        <td className="py-2">Siti Rahman</td>
                        <td className="py-2">Rp 750.000</td>
                        <td className="py-2"><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">Processing</span></td>
                      </tr>
                      <tr>
                        <td className="py-2">#ORD-003</td>
                        <td className="py-2">Ahmad Wijaya</td>
                        <td className="py-2">Rp 1.200.000</td>
                        <td className="py-2"><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Pending</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Link
                    href="/orders"
                    className="block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center"
                  >
                    View All Orders
                  </Link>
                  <Link
                    href="/whatsapp"
                    className="block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-center"
                  >
                    WhatsApp Messages
                  </Link>
                  <Link
                    href="/products"
                    className="block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-center"
                  >
                    Manage Products
                  </Link>
                  <Link
                    href="/payments"
                    className="block px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-center"
                  >
                    View Payments
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
