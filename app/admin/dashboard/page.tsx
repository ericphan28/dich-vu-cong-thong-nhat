export default function AdminDashboard() {
  // Mock data - trong thực tế sẽ fetch từ database
  const stats = {
    totalOrders: 45,
    pendingOrders: 12,
    completedToday: 8,
    todayRevenue: 2450000,
    monthlyRevenue: 15600000,
  };

  const recentOrders = [
    { id: 'HS001', customer: 'Nguyễn Văn A', service: 'Đăng ký CCCD', status: 'Đang xử lý', amount: 150000 },
    { id: 'HS002', customer: 'Trần Thị B', service: 'Trích lục khai sinh', status: 'Hoàn thành', amount: 100000 },
    { id: 'HS003', customer: 'Lê Văn C', service: 'Đăng ký kết hôn', status: 'Chờ xử lý', amount: 200000 },
    { id: 'HS004', customer: 'Phạm Thị D', service: 'Bảo hiểm y tế', status: 'Đang xử lý', amount: 300000 },
  ];

  const todayTasks = [
    { time: '09:00', task: 'Nộp hồ sơ CCCD cho khách Nguyễn Văn A', status: 'pending' },
    { time: '10:30', task: 'Lấy kết quả trích lục khai sinh - Trần Thị B', status: 'completed' },
    { time: '14:00', task: 'Hẹn khách Lê Văn C làm hồ sơ kết hôn', status: 'pending' },
    { time: '16:00', task: 'Gọi điện thông báo hoàn thành cho khách Phạm Thị D', status: 'pending' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 lg:p-6 transition-colors">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-800 dark:text-white mb-1 lg:mb-2">Dashboard Tổng quan</h1>
        <p className="text-gray-600 dark:text-gray-300">Xin chào Anh Trí, đây là tình hình hoạt động hôm nay</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 lg:gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 lg:p-6 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm font-medium text-gray-600 dark:text-gray-300">Tổng hồ sơ</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">{stats.totalOrders}</p>
            </div>
            <div className="text-blue-500 text-xl lg:text-2xl">📋</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 lg:p-6 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm font-medium text-gray-600 dark:text-gray-300">Chờ xử lý</p>
              <p className="text-xl lg:text-2xl font-bold text-orange-600">{stats.pendingOrders}</p>
            </div>
            <div className="text-orange-500 text-xl lg:text-2xl">⏳</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 lg:p-6 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm font-medium text-gray-600 dark:text-gray-300">Hoàn thành hôm nay</p>
              <p className="text-xl lg:text-2xl font-bold text-green-600">{stats.completedToday}</p>
            </div>
            <div className="text-green-500 text-xl lg:text-2xl">✅</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 lg:p-6 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm font-medium text-gray-600 dark:text-gray-300">Doanh thu hôm nay</p>
              <p className="text-lg lg:text-2xl font-bold text-red-600">{stats.todayRevenue.toLocaleString('vi-VN')}đ</p>
            </div>
            <div className="text-red-500 text-xl lg:text-2xl">💰</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 lg:p-6 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm font-medium text-gray-600 dark:text-gray-300">Doanh thu tháng</p>
              <p className="text-lg lg:text-2xl font-bold text-purple-600">{stats.monthlyRevenue.toLocaleString('vi-VN')}đ</p>
            </div>
            <div className="text-purple-500 text-xl lg:text-2xl">📈</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow transition-colors">
          <div className="p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Hồ sơ gần đây</h2>
          </div>
          <div className="p-4 lg:p-6">
            <div className="space-y-3 lg:space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2 sm:space-y-0 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 dark:text-white text-sm lg:text-base">{order.customer}</p>
                    <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-300">{order.service}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">#{order.id}</p>
                  </div>
                  <div className="flex justify-between sm:block sm:text-right">
                    <p className="font-medium text-gray-800 dark:text-white text-sm lg:text-base">{order.amount.toLocaleString('vi-VN')}đ</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Hoàn thành' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' :
                      order.status === 'Đang xử lý' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200' :
                      'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <a href="/admin/orders" className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium transition-colors">
                Xem tất cả hồ sơ →
              </a>
            </div>
          </div>
        </div>

        {/* Today's Tasks */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow transition-colors">
          <div className="p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Công việc hôm nay</h2>
          </div>
          <div className="p-4 lg:p-6">
            <div className="space-y-3 lg:space-y-4">
              {todayTasks.map((task, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className={`w-3 h-3 lg:w-4 lg:h-4 rounded-full mt-1 ${
                      task.status === 'completed' ? 'bg-green-500' : 'bg-orange-400'
                    }`}></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0">
                      <p className={`font-medium text-sm lg:text-base ${
                        task.status === 'completed' ? 'text-gray-500 dark:text-gray-400 line-through' : 'text-gray-800 dark:text-white'
                      }`}>
                        {task.task}
                      </p>
                      <span className="text-xs lg:text-sm text-gray-500 dark:text-gray-400 font-medium">{task.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <a href="/admin/schedule" className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium transition-colors">
                Xem lịch đầy đủ →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}