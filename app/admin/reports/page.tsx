export default function ReportsPage() {
  // Mock data - trong thực tế sẽ fetch từ database
  const reportStats = {
    totalCustomers: 125,
    totalOrders: 345,
    totalRevenue: 45600000,
    completionRate: 92.5,
    avgOrderValue: 132173,
    monthlyGrowth: 15.8
  };

  const monthlyPerformance = [
    { month: 'T1/2024', orders: 45, revenue: 12500000, customers: 38 },
    { month: 'T2/2024', orders: 52, revenue: 14200000, customers: 42 },
    { month: 'T3/2024', orders: 61, revenue: 16800000, customers: 48 },
    { month: 'T4/2024', orders: 58, revenue: 15600000, customers: 45 },
    { month: 'T5/2024', orders: 68, revenue: 18900000, customers: 55 },
    { month: 'T6/2024', orders: 61, revenue: 17300000, customers: 51 }
  ];

  const serviceAnalysis = [
    { name: 'Căn cước công dân', orders: 89, revenue: 13350000, percentage: 25.8 },
    { name: 'Trích lục khai sinh', orders: 76, revenue: 7600000, percentage: 22.0 },
    { name: 'Đăng ký kết hôn', orders: 34, revenue: 6800000, percentage: 9.9 },
    { name: 'Bảo hiểm xã hội', orders: 45, revenue: 13500000, percentage: 13.0 },
    { name: 'Giấy chứng nhận độc thân', orders: 28, revenue: 2800000, percentage: 8.1 },
    { name: 'Hộ khẩu/Tạm trú', orders: 23, revenue: 2300000, percentage: 6.7 },
    { name: 'Khác', orders: 50, revenue: 5000000, percentage: 14.5 }
  ];

  const customerSegments = [
    { segment: 'Khách hàng VIP', count: 15, percentage: 12.0, avgSpending: 850000 },
    { segment: 'Khách thường xuyên', count: 68, percentage: 54.4, avgSpending: 420000 },
    { segment: 'Khách mới', count: 42, percentage: 33.6, avgSpending: 180000 }
  ];

  const regionAnalysis = [
    { area: 'Ấp Phú Cường', customers: 45, orders: 123, percentage: 36.0 },
    { area: 'Ấp Tân Hòa', customers: 32, orders: 87, percentage: 25.6 },
    { area: 'Ấp Long Thành', customers: 28, orders: 76, percentage: 22.4 },
    { area: 'Ấp Bình An', customers: 20, orders: 59, percentage: 16.0 }
  ];

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 lg:p-6 transition-colors">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-800 dark:text-white mb-1 lg:mb-2">📈 Báo cáo & Thống kê</h1>
            <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300">Phân tích hiệu suất kinh doanh và khách hàng</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button className="bg-green-600 text-white px-3 py-2 lg:px-4 lg:py-2 rounded-lg hover:bg-green-700 transition-colors text-sm lg:text-base">
              📊 Xuất báo cáo
            </button>
            <button className="bg-blue-600 text-white px-3 py-2 lg:px-4 lg:py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm lg:text-base">
              📅 Tùy chọn thời gian
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 lg:gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 lg:p-5 transition-colors">
          <div className="flex flex-col items-center text-center">
            <div className="text-2xl lg:text-3xl mb-2">👥</div>
            <p className="text-lg lg:text-2xl font-bold text-blue-600">{reportStats.totalCustomers}</p>
            <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-300">Tổng KH</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 lg:p-5 transition-colors">
          <div className="flex flex-col items-center text-center">
            <div className="text-2xl lg:text-3xl mb-2">📋</div>
            <p className="text-lg lg:text-2xl font-bold text-green-600">{reportStats.totalOrders}</p>
            <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-300">Tổng đơn</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 lg:p-5 transition-colors">
          <div className="flex flex-col items-center text-center">
            <div className="text-2xl lg:text-3xl mb-2">💰</div>
            <p className="text-lg lg:text-2xl font-bold text-red-600">{(reportStats.totalRevenue / 1000000).toFixed(1)}M</p>
            <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-300">Doanh thu</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 lg:p-5 transition-colors">
          <div className="flex flex-col items-center text-center">
            <div className="text-2xl lg:text-3xl mb-2">✅</div>
            <p className="text-lg lg:text-2xl font-bold text-purple-600">{reportStats.completionRate}%</p>
            <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-300">Hoàn thành</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 lg:p-5 transition-colors">
          <div className="flex flex-col items-center text-center">
            <div className="text-2xl lg:text-3xl mb-2">💵</div>
            <p className="text-lg lg:text-2xl font-bold text-orange-600">{(reportStats.avgOrderValue / 1000).toFixed(0)}K</p>
            <p className="text-xs lg:text-sm text-gray-600">Giá trị TB</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 lg:p-5">
          <div className="flex flex-col items-center text-center">
            <div className="text-2xl lg:text-3xl mb-2">📈</div>
            <p className="text-lg lg:text-2xl font-bold text-teal-600">+{reportStats.monthlyGrowth}%</p>
            <p className="text-xs lg:text-sm text-gray-600">Tăng trưởng</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Monthly Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow transition-colors">
          <div className="p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Hiệu suất theo tháng</h2>
          </div>
          <div className="p-4 lg:p-6">
            <div className="space-y-4">
              {monthlyPerformance.map((month) => (
                <div key={month.month} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 lg:p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">{month.month}</h3>
                    <span className="text-sm font-bold text-blue-600">
                      {month.revenue.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 lg:gap-4 text-sm mb-3">
                    <div className="text-center">
                      <span className="block text-lg font-bold text-green-600">{month.orders}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Đơn hàng</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-lg font-bold text-blue-600">{month.customers}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Khách hàng</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-lg font-bold text-purple-600">
                        {(month.revenue / month.orders / 1000).toFixed(0)}K
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">TB/đơn</span>
                    </div>
                  </div>

                  {/* Progress compared to max month */}
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                      style={{width: `${(month.revenue / Math.max(...monthlyPerformance.map(m => m.revenue))) * 100}%`}}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Service Analysis */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow transition-colors">
          <div className="p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Phân tích dịch vụ</h2>
          </div>
          <div className="p-4 lg:p-6">
            <div className="space-y-3">
              {serviceAnalysis.map((service) => (
                <div key={service.name} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate pr-2">{service.name}</h3>
                    <span className="text-sm font-bold text-green-600 flex-shrink-0">
                      {service.revenue.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-300 mb-2">
                    <span>{service.orders} đơn hàng</span>
                    <span>{service.percentage}% tổng doanh thu</span>
                  </div>

                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-red-400 to-red-600 h-2 rounded-full transition-all duration-500"
                      style={{width: `${service.percentage}%`}}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Customer Segments */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 lg:p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Phân khúc khách hàng</h2>
          </div>
          <div className="p-4 lg:p-6">
            <div className="space-y-4">
              {customerSegments.map((segment) => (
                <div key={segment.segment} className="border rounded-lg p-3 lg:p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-medium text-gray-900">{segment.segment}</h3>
                    <span className="text-sm font-bold text-purple-600">
                      {segment.count} khách hàng
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-500">Tỷ lệ:</span>
                      <span className="font-medium ml-2">{segment.percentage}%</span>
                    </div>
                    <div>
                      <span className="text-gray-500">TB chi tiêu:</span>
                      <span className="font-medium ml-2">{segment.avgSpending.toLocaleString('vi-VN')}đ</span>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${
                        segment.segment === 'Khách hàng VIP' ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                        segment.segment === 'Khách thường xuyên' ? 'bg-gradient-to-r from-green-400 to-green-600' :
                        'bg-gradient-to-r from-blue-400 to-blue-600'
                      }`}
                      style={{width: `${segment.percentage}%`}}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Regional Analysis */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 lg:p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Phân tích theo khu vực</h2>
          </div>
          <div className="p-4 lg:p-6">
            <div className="space-y-4">
              {regionAnalysis.map((region) => (
                <div key={region.area} className="border rounded-lg p-3 lg:p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-medium text-gray-900">{region.area}</h3>
                    <span className="text-sm font-bold text-teal-600">
                      {region.percentage}%
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-500">KH:</span>
                      <span className="font-medium ml-2">{region.customers}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Đơn hàng:</span>
                      <span className="font-medium ml-2">{region.orders}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-600 mb-2">
                    <span>Mật độ: {(region.orders / region.customers).toFixed(1)} đơn/KH</span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-teal-400 to-teal-600 h-2 rounded-full transition-all duration-500"
                      style={{width: `${region.percentage}%`}}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <button className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors text-sm">
                Xem bản đồ chi tiết →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}