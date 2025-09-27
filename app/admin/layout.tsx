import { ReactNode } from 'react';

export const metadata = {
  title: 'Admin Dashboard - Hỗ Trợ Dịch Vụ Công',
  description: 'Quản lý dịch vụ hỗ trợ dịch vụ công',
};

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Sidebar */}
      <div className="flex">
        <aside className="w-64 bg-red-800 text-white min-h-screen">
          <div className="p-4">
            <h1 className="text-xl font-bold mb-8">Admin Dashboard</h1>
            <nav className="space-y-2">
              <a href="/admin/dashboard" className="flex items-center space-x-2 p-2 rounded hover:bg-red-700 transition-colors">
                <span>📊</span>
                <span>Dashboard</span>
              </a>
              <a href="/admin/customers" className="flex items-center space-x-2 p-2 rounded hover:bg-red-700 transition-colors">
                <span>👥</span>
                <span>Khách hàng</span>
              </a>
              <a href="/admin/orders" className="flex items-center space-x-2 p-2 rounded hover:bg-red-700 transition-colors">
                <span>📋</span>
                <span>Hồ sơ</span>
              </a>
              <a href="/admin/services" className="flex items-center space-x-2 p-2 rounded hover:bg-red-700 transition-colors">
                <span>⚙️</span>
                <span>Dịch vụ</span>
              </a>
              <a href="/admin/finance" className="flex items-center space-x-2 p-2 rounded hover:bg-red-700 transition-colors">
                <span>💰</span>
                <span>Tài chính</span>
              </a>
              <a href="/admin/schedule" className="flex items-center space-x-2 p-2 rounded hover:bg-red-700 transition-colors">
                <span>📅</span>
                <span>Lịch làm việc</span>
              </a>
              <a href="/admin/reports" className="flex items-center space-x-2 p-2 rounded hover:bg-red-700 transition-colors">
                <span>📈</span>
                <span>Báo cáo</span>
              </a>
              <a href="/" className="flex items-center space-x-2 p-2 rounded hover:bg-red-700 transition-colors mt-8 border-t border-red-600 pt-4">
                <span>🏠</span>
                <span>Về trang chủ</span>
              </a>
            </nav>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}