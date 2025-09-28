export default function OrdersPage() {
  // Mock data - trong thực tế sẽ fetch từ database
  const orders = [
    {
      id: 'HS001',
      customer: 'Nguyễn Văn An',
      phone: '0912345678',
      service: 'Đăng ký CCCD',
      status: 'processing',
      priority: 'high',
      fee: 150000,
      createdAt: '2024-09-27',
      deadline: '2024-09-29',
      notes: 'Khách cần gấp vào thứ 2'
    },
    {
      id: 'HS002',
      customer: 'Trần Thị Bình',
      phone: '0987654321',
      service: 'Trích lục khai sinh',
      status: 'completed',
      priority: 'normal',
      fee: 100000,
      createdAt: '2024-09-25',
      deadline: '2024-09-27',
      notes: 'Đã hoàn thành và giao khách'
    },
    {
      id: 'HS003',
      customer: 'Lê Văn Cường',
      phone: '0901234567',
      service: 'Đăng ký kết hôn',
      status: 'pending',
      priority: 'normal',
      fee: 200000,
      createdAt: '2024-09-27',
      deadline: '2024-10-01',
      notes: 'Chờ khách bổ sung giấy tờ'
    },
    {
      id: 'HS004',
      customer: 'Phạm Thị Dung',
      phone: '0976543210',
      service: 'Bảo hiểm y tế',
      status: 'processing',
      priority: 'low',
      fee: 300000,
      createdAt: '2024-09-26',
      deadline: '2024-09-30',
      notes: 'Đã nộp hồ sơ, chờ kết quả'
    },
    {
      id: 'HS005',
      customer: 'Hoàng Văn Em',
      phone: '0934567890',
      service: 'Đăng ký tạm trú',
      status: 'pending',
      priority: 'high',
      fee: 80000,
      createdAt: '2024-09-27',
      deadline: '2024-09-28',
      notes: 'Khách mới, cần hướng dẫn kỹ'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200';
      case 'processing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Chờ xử lý';
      case 'processing': return 'Đang xử lý';
      case 'completed': return 'Hoàn thành';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'normal': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Quản lý Hồ sơ</h1>
            <p className="text-gray-600 dark:text-gray-300">Theo dõi và xử lý các hồ sơ dịch vụ công</p>
          </div>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
            + Tạo hồ sơ mới
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Tổng hồ sơ</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{orders.length}</p>
            </div>
            <div className="text-blue-500 text-2xl">📋</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Chờ xử lý</p>
              <p className="text-2xl font-bold text-orange-600">
                {orders.filter(o => o.status === 'pending').length}
              </p>
            </div>
            <div className="text-orange-500 text-2xl">⏳</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Đang xử lý</p>
              <p className="text-2xl font-bold text-blue-600">
                {orders.filter(o => o.status === 'processing').length}
              </p>
            </div>
            <div className="text-blue-500 text-2xl">🔄</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Hoàn thành</p>
              <p className="text-2xl font-bold text-green-600">
                {orders.filter(o => o.status === 'completed').length}
              </p>
            </div>
            <div className="text-green-500 text-2xl">✅</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Tìm theo mã hồ sơ, tên khách..."
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-colors"
          />
          <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-colors">
            <option value="">Tất cả trạng thái</option>
            <option value="pending">Chờ xử lý</option>
            <option value="processing">Đang xử lý</option>
            <option value="completed">Hoàn thành</option>
            <option value="cancelled">Đã hủy</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-colors">
            <option value="">Tất cả dịch vụ</option>
            <option value="cccd">Đăng ký CCCD</option>
            <option value="khai-sinh">Trích lục khai sinh</option>
            <option value="ket-hon">Đăng ký kết hôn</option>
            <option value="bao-hiem">Bảo hiểm y tế</option>
          </select>
          <button className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors">
            Lọc
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Hồ sơ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Dịch vụ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Mức độ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Phí
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Deadline
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                      <div className="text-sm text-gray-500">{order.createdAt}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                      <div className="text-sm text-gray-500">{order.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.service}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${getPriorityColor(order.priority)}`}>
                      {order.priority === 'high' ? '🔴 Cao' : 
                       order.priority === 'normal' ? '🟡 Thường' : '🟢 Thấp'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.fee.toLocaleString('vi-VN')}đ
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.deadline}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(order.deadline) < new Date() ? 
                        <span className="text-red-600">Quá hạn</span> : 
                        `${Math.ceil((new Date(order.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} ngày`
                      }
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-red-600 hover:text-red-900">Xem</button>
                      <button className="text-blue-600 hover:text-blue-900">Sửa</button>
                      <button className="text-green-600 hover:text-green-900">Gọi</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-700">
              Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">5</span> trong tổng số <span className="font-medium">5</span> hồ sơ
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500">Trước</button>
              <button className="px-3 py-1 bg-red-600 text-white rounded-md text-sm">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500">Sau</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}