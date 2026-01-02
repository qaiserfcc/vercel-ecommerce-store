import Link from 'next/link';
import { LayoutDashboard, Package, Percent, Users, BarChart3, LogOut } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-dark text-white">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-primary">Admin Panel</h2>
          <p className="text-sm text-gray-400">Namecheap</p>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/admin"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-dark-light transition"
              >
                <LayoutDashboard size={20} />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin/products"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-dark-light transition"
              >
                <Package size={20} />
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/admin/discounts"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-dark-light transition"
              >
                <Percent size={20} />
                Discounts
              </Link>
            </li>
            <li>
              <Link
                href="/admin/users"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-dark-light transition"
              >
                <Users size={20} />
                Users
              </Link>
            </li>
            <li>
              <Link
                href="/admin/analytics"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-dark-light transition"
              >
                <BarChart3 size={20} />
                Analytics
              </Link>
            </li>
          </ul>
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-700">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-dark-light transition text-gray-300"
          >
            <LogOut size={20} />
            Back to Store
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
