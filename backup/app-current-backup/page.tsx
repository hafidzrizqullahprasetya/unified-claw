import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <nav className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Unified Agentic OS - Admin Dashboard
          </h1>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Stats Cards */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Orders</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">0</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Revenue</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">Rp 0</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">WhatsApp Messages</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">0</p>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 hover:shadow-lg transition">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              📊 Dashboard
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              View real-time sales, revenue, and customer metrics
            </p>
            <Link
              href="/dashboard"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Go to Dashboard
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 hover:shadow-lg transition">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              💬 WhatsApp
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Monitor WhatsApp conversations and customer support
            </p>
            <Link
              href="/whatsapp"
              className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              View Messages
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 hover:shadow-lg transition">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              🛍️ Products
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Manage inventory, pricing, and product information
            </p>
            <Link
              href="/products"
              className="inline-block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Manage Products
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 hover:shadow-lg transition">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              📦 Orders
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              View and manage customer orders and fulfillment
            </p>
            <Link
              href="/orders"
              className="inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              View Orders
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 hover:shadow-lg transition">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              💰 Payments
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Track payment transactions and settlement status
            </p>
            <Link
              href="/payments"
              className="inline-block px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
            >
              View Payments
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 hover:shadow-lg transition">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              ⚙️ Settings
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Configure store settings and API integrations
            </p>
            <Link
              href="/settings"
              className="inline-block px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Go to Settings
            </Link>
          </div>
        </div>

        <div className="mt-12 bg-blue-50 dark:bg-gray-800 border border-blue-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            🚀 Backend Services
          </h3>
          <ul className="text-gray-700 dark:text-gray-300 space-y-2">
            <li>✅ Backend API: http://localhost:8000</li>
            <li>✅ Frontend: http://localhost:3000</li>
            <li>✅ WhatsApp Integration: Active</li>
            <li>✅ AI Agent: Running</li>
            <li>✅ Midtrans Payment: Configured</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
