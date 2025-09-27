export default function ServicesPage() {
  // Mock data - trong thực tế sẽ fetch từ database
  const services = [
    {
      id: 1,
      name: 'Đăng ký CCCD',
      category: 'Giấy tờ tùy thân',
      baseFee: 150000,
      processingTime: '1-2 ngày',
      description: 'Hỗ trợ làm căn cước công dân mới, đổi, cấp lại',
      requiredDocs: ['Hộ khẩu gốc', 'Chứng minh thư cũ', 'Giấy khai sinh'],
      totalOrders: 25,
      monthlyRevenue: 3750000,
      isActive: true
    },
    {
      id: 2,
      name: 'Trích lục khai sinh',
      category: 'Hộ t적 dân cư',
      baseFee: 100000,
      processingTime: '1 ngày',
      description: 'Trích lục khai sinh các loại, bản sao có công chứng',
      requiredDocs: ['Giấy khai sinh gốc', 'CCCD người yêu cầu'],
      totalOrders: 18,
      monthlyRevenue: 1800000,
      isActive: true
    },
    {
      id: 3,
      name: 'Đăng ký kết hôn',
      category: 'Hộ tịch dân cư',
      baseFee: 200000,
      processingTime: '2-3 ngày',
      description: 'Đăng ký kết hôn, cấp giấy chứng nhận kết hôn',
      requiredDocs: ['CCCD 2 bên', 'Giấy khám sức khỏe', 'Giấy xác nhận độc thân'],
      totalOrders: 12,
      monthlyRevenue: 2400000,
      isActive: true
    },
    {
      id: 4,
      name: 'Bảo hiểm y tế',
      category: 'Bảo hiểm xã hội',
      baseFee: 300000,
      processingTime: '3-5 ngày',
      description: 'Đăng ký, gia hạn, thay đổi thông tin thẻ BHYT',
      requiredDocs: ['CCCD', 'Hộ khẩu', 'Ảnh 3x4'],
      totalOrders: 8,
      monthlyRevenue: 2400000,
      isActive: true
    },
    {
      id: 5,
      name: 'Đăng ký kinh doanh',
      category: 'Kinh doanh',
      baseFee: 500000,
      processingTime: '5-7 ngày',
      description: 'Đăng ký giấy phép kinh doanh hộ cá thể',
      requiredDocs: ['CCCD chủ hộ', 'Giấy thuê mặt bằng', 'Đơn đăng ký'],
      totalOrders: 6,
      monthlyRevenue: 3000000,
      isActive: true
    }
  ];

  const categories = [
    { name: 'Giấy tờ tùy thân', count: 1, color: 'bg-blue-100 text-blue-800' },
    { name: 'Hộ tịch dân cư', count: 2, color: 'bg-green-100 text-green-800' },
    { name: 'Bảo hiểm xã hội', count: 1, color: 'bg-purple-100 text-purple-800' },
    { name: 'Kinh doanh', count: 1, color: 'bg-orange-100 text-orange-800' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Quản lý Dịch vụ</h1>
            <p className="text-gray-600">Cấu hình và quản lý các loại dịch vụ</p>
          </div>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
            + Thêm dịch vụ
          </button>
        </div>
      </div>

      {/* Service Categories */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${category.color}`}>
                  {category.name}
                </span>
                <p className="text-2xl font-bold text-gray-900 mt-2">{category.count}</p>
                <p className="text-sm text-gray-600">dịch vụ</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng dịch vụ</p>
              <p className="text-2xl font-bold text-gray-900">{services.length}</p>
            </div>
            <div className="text-blue-500 text-2xl">⚙️</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng đơn hàng</p>
              <p className="text-2xl font-bold text-green-600">
                {services.reduce((sum, service) => sum + service.totalOrders, 0)}
              </p>
            </div>
            <div className="text-green-500 text-2xl">📋</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Doanh thu tháng</p>
              <p className="text-2xl font-bold text-red-600">
                {(services.reduce((sum, service) => sum + service.monthlyRevenue, 0) / 1000000).toFixed(1)}M
              </p>
            </div>
            <div className="text-red-500 text-2xl">💰</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Giá trung bình</p>
              <p className="text-2xl font-bold text-purple-600">
                {Math.round(services.reduce((sum, service) => sum + service.baseFee, 0) / services.length / 1000)}K
              </p>
            </div>
            <div className="text-purple-500 text-2xl">💵</div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{service.name}</h3>
                <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 mt-1">
                  {service.category}
                </span>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-red-600">{service.baseFee.toLocaleString('vi-VN')}đ</p>
                <p className="text-sm text-gray-500">{service.processingTime}</p>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4">{service.description}</p>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Giấy tờ cần thiết:</p>
              <div className="flex flex-wrap gap-1">
                {service.requiredDocs.map((doc, index) => (
                  <span key={index} className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    {doc}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
              <div>
                <span className="font-medium">{service.totalOrders}</span> đơn hàng
              </div>
              <div>
                <span className="font-medium text-green-600">
                  {service.monthlyRevenue.toLocaleString('vi-VN')}đ
                </span> doanh thu
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${service.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`text-sm font-medium ${service.isActive ? 'text-green-600' : 'text-red-600'}`}>
                  {service.isActive ? 'Hoạt động' : 'Tạm dừng'}
                </span>
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Sửa</button>
                <button className="text-red-600 hover:text-red-800 text-sm font-medium">Xóa</button>
                <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                  {service.isActive ? 'Tắt' : 'Bật'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Service Performance Chart Placeholder */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Hiệu suất dịch vụ</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Biểu đồ thống kê sẽ được hiển thị tại đây</p>
        </div>
      </div>
    </div>
  );
}