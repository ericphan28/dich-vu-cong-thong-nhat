'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { ThemeSwitcher } from '@/components/theme-switcher-enhanced';

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { href: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
    { href: '/admin/customers', icon: '👥', label: 'Khách hàng' },
    { href: '/admin/orders', icon: '📋', label: 'Hồ sơ' },
    { href: '/admin/services', icon: '⚙️', label: 'Dịch vụ' },
    { href: '/admin/finance', icon: '💰', label: 'Tài chính' },
    { href: '/admin/schedule', icon: '📅', label: 'Lịch làm việc' },
    { href: '/admin/reports', icon: '📈', label: 'Báo cáo' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Mobile Header */}
      <div className="lg:hidden bg-red-800 dark:bg-red-900 text-white p-4 flex items-center justify-between">
        <h1 className="text-lg font-bold">Admin Dashboard</h1>
        <div className="flex items-center space-x-3">
          <ThemeSwitcher />
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md hover:bg-red-700 dark:hover:bg-red-800 focus:outline-none transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-red-800 dark:bg-red-900">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                onClick={() => setSidebarOpen(false)}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <svg className="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="px-4">
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
                </div>
                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-3 p-3 rounded hover:bg-red-700 dark:hover:bg-red-800 transition-colors text-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  ))}
                  <Link
                    href="/"
                    className="flex items-center space-x-3 p-3 rounded hover:bg-red-700 dark:hover:bg-red-800 transition-colors mt-8 border-t border-red-600 dark:border-red-700 pt-4 text-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="text-lg">🏠</span>
                    <span className="text-sm font-medium">Về trang chủ</span>
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="lg:flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex flex-col h-0 flex-1 bg-red-800 dark:bg-red-900">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div className="px-4">
                  <div className="flex items-center justify-between mb-8">
                    <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
                    <div className="ml-2">
                      <ThemeSwitcher />
                    </div>
                  </div>
                  <nav className="space-y-2">
                    {menuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center space-x-3 p-3 rounded hover:bg-red-700 dark:hover:bg-red-800 transition-colors text-white group"
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-sm font-medium">{item.label}</span>
                      </Link>
                    ))}
                    <Link
                      href="/"
                      className="flex items-center space-x-3 p-3 rounded hover:bg-red-700 dark:hover:bg-red-800 transition-colors mt-8 border-t border-red-600 dark:border-red-700 pt-4 text-white"
                    >
                      <span className="text-lg">🏠</span>
                      <span className="text-sm font-medium">Về trang chủ</span>
                    </Link>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}