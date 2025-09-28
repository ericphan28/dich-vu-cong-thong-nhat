export default function CustomersPage() {
  // Mock data - trong thực tế sẽ fetch từ database
  const customers = [
    {
      id: 1,
      name: 'Nguyễn Văn An',
      phone: '0912345678',
      address: 'Ấp Phú Cường, Xã Thống Nhất, Đồng Nai',
      totalOrders: 5,
      totalSpent: 750000,
      lastOrder: '2024-09-25',
      status: 'active'
    },
    {
      id: 2,
      name: 'Trần Thị Bình',
      phone: '0987654321',
      address: 'Ấp Tân Hòa, Xã Thống Nhất, Đồng Nai',
      totalOrders: 3,
      totalSpent: 450000,
      lastOrder: '2024-09-20',
      status: 'active'
    },
    {
      id: 3,
      name: 'Lê Văn Cường',
      phone: '0901234567',
      address: 'Ấp Long Thành, Xã Thống Nhất, Đồng Nai',
      totalOrders: 8,
      totalSpent: 1200000,
      lastOrder: '2024-09-27',
      status: 'vip'
    },
    {
      id: 4,
      name: 'Phạm Thị Dung',
      phone: '0976543210',
      address: 'Ấp Phú Cường, Xã Thống Nhất, Đồng Nai',
      totalOrders: 2,
      totalSpent: 300000,
      lastOrder: '2024-09-15',
      status: 'active'
    },
    {
      id: 5,
      name: 'Hoàng Văn Em',
      phone: '0934567890',
      address: 'Ấp Bình An, Xã Thống Nhất, Đồng Nai',
      totalOrders: 1,
      totalSpent: 150000,
      lastOrder: '2024-09-10',
      status: 'new'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 lg:p-6 transition-colors">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-800 dark:text-white mb-1 lg:mb-2">Quản lý Khách hàng</h1>
            <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300">Danh sách và thông tin khách hàng</p>
          </div>
          <button className="bg-red-600 text-white px-3 py-2 lg:px-4 lg:py-2 rounded-lg hover:bg-red-700 transition-colors text-sm lg:text-base">
            + Thêm khách hàng
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 lg:p-6 transition-colors">
        <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, số điện thoại..."
              className="w-full px-3 py-2 lg:px-4 lg:py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm lg:text-base bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-colors"
            />
          </div>
          <select className="px-3 py-2 lg:px-4 lg:py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm lg:text-base bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-colors">
            <option value="">Tất cả trạng thái</option>
            <option value="new">Khách hàng mới</option>
            <option value="active">Khách hàng thường xuyên</option>
            <option value="vip">Khách hàng VIP</option>
          </select>
          <button className="bg-gray-600 text-white px-4 py-2 lg:px-6 lg:py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm lg:text-base">
            Tìm kiếm
          </button>
        </div>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 lg:p-6 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm font-medium text-gray-600 dark:text-gray-300">Tổng khách hàng</p>
              <p className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">{customers.length}</p>
            </div>
            <div className="text-blue-500 text-xl lg:text-2xl">👥</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 lg:p-6 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm font-medium text-gray-600 dark:text-gray-300">Khách mới tháng này</p>
              <p className="text-lg lg:text-2xl font-bold text-green-600">12</p>
            </div>
            <div className="text-green-500 text-xl lg:text-2xl">🆕</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 lg:p-6 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm font-medium text-gray-600 dark:text-gray-300">Khách VIP</p>
              <p className="text-lg lg:text-2xl font-bold text-purple-600">8</p>
            </div>
            <div className="text-purple-500 text-xl lg:text-2xl">⭐</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 lg:p-6 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm font-medium text-gray-600 dark:text-gray-300">Tổng chi tiêu</p>
              <p className="text-lg lg:text-2xl font-bold text-red-600">25.6M</p>
            </div>
            <div className="text-red-500 text-2xl">💰</div>
          </div>
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition-colors">
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Liên hệ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Địa chỉ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Tổng đơn
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Tổng chi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Lần cuối
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
                          <span className="text-red-600 dark:text-red-400 font-medium text-sm">
                            {customer.name.charAt(customer.name.lastIndexOf(' ') + 1)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{customer.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">ID: {customer.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {customer.phone}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    <div className="max-w-xs truncate">{customer.address}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {customer.totalOrders} đơn
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {customer.totalSpent.toLocaleString('vi-VN')}đ
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {customer.lastOrder}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      customer.status === 'vip' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200' :
                      customer.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' :
                      'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200'
                    }`}>
                      {customer.status === 'vip' ? 'VIP' : 
                       customer.status === 'active' ? 'Thường xuyên' : 'Mới'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors">Xem</button>
                      <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">Sửa</button>
                      <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 transition-colors">Gọi</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden divide-y divide-gray-200 dark:divide-gray-700">
          {customers.map((customer) => (
            <div key={customer.id} className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
                    <span className="text-red-600 dark:text-red-400 font-medium text-sm">
                      {customer.name.charAt(customer.name.lastIndexOf(' ') + 1)}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{customer.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">ID: {customer.id}</div>
                  </div>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  customer.status === 'vip' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200' :
                  customer.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' :
                  'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200'
                }`}>
                  {customer.status === 'vip' ? 'VIP' : 
                   customer.status === 'active' ? 'Thường xuyên' : 'Mới'}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">SĐT:</span>
                  <div className="font-medium text-gray-900 dark:text-white">{customer.phone}</div>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Lần cuối:</span>
                  <div className="font-medium text-gray-900 dark:text-white">{customer.lastOrder}</div>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Tổng đơn:</span>
                  <div className="font-medium text-gray-900 dark:text-white">{customer.totalOrders} đơn</div>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Tổng chi:</span>
                  <div className="font-medium text-gray-900 dark:text-white">{customer.totalSpent.toLocaleString('vi-VN')}đ</div>
                </div>
              </div>
              
              <div>
                <span className="text-gray-500 dark:text-gray-400 text-sm">Địa chỉ:</span>
                <div className="text-sm text-gray-900 dark:text-white mt-1">{customer.address}</div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-2 border-t border-gray-100 dark:border-gray-700">
                <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium transition-colors">Xem</button>
                <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-colors">Sửa</button>
                <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 text-sm font-medium transition-colors">Gọi</button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
            <div className="text-sm text-gray-700">
              Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">5</span> trong tổng số <span className="font-medium">5</span> khách hàng
            </div>
            <div className="flex justify-center sm:justify-end space-x-2">
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