export default function FinancePage() {
  // Mock data - trong thực tế sẽ fetch từ database
  const financialStats = {
    totalRevenue: 45600000,
    monthlyRevenue: 15600000,
    totalExpenses: 8500000,
    monthlyExpenses: 3200000,
    profit: 37100000,
    monthlyProfit: 12400000,
    pendingPayments: 2850000,
    overduePayments: 850000,
  };

  const recentTransactions = [
    {
      id: 'TXN001',
      type: 'income',
      description: 'Dịch vụ CCCD - Nguyễn Văn A',
      amount: 150000,
      date: '2024-09-27',
      status: 'completed',
      customer: 'Nguyễn Văn A'
    },
    {
      id: 'TXN002',
      type: 'income',
      description: 'Trích lục khai sinh - Trần Thị B',
      amount: 100000,
      date: '2024-09-27',
      status: 'completed',
      customer: 'Trần Thị B'
    },
    {
      id: 'TXN003',
      type: 'expense',
      description: 'Phí di chuyển - Sở Tư pháp',
      amount: 50000,
      date: '2024-09-26',
      status: 'completed',
      customer: null
    },
    {
      id: 'TXN004',
      type: 'income',
      description: 'Đăng ký kết hôn - Lê Văn C',
      amount: 200000,
      date: '2024-09-25',
      status: 'pending',
      customer: 'Lê Văn C'
    },
    {
      id: 'TXN005',
      type: 'expense',
      description: 'Chi phí photocopy hồ sơ',
      amount: 25000,
      date: '2024-09-25',
      status: 'completed',
      customer: null
    },
  ];

  const monthlyData = [
    { month: 'T1/2024', revenue: 12500000, expense: 2800000, profit: 9700000 },
    { month: 'T2/2024', revenue: 14200000, expense: 3100000, profit: 11100000 },
    { month: 'T3/2024', revenue: 16800000, expense: 3500000, profit: 13300000 },
    { month: 'T4/2024', revenue: 15600000, expense: 3200000, profit: 12400000 },
    { month: 'T5/2024', revenue: 18900000, expense: 3800000, profit: 15100000 },
    { month: 'T6/2024', revenue: 17300000, expense: 3600000, profit: 13700000 },
  ];

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-1 lg:mb-2">💰 Quản lý Tài chính</h1>
            <p className="text-sm lg:text-base text-gray-600">Theo dõi doanh thu, chi phí và lợi nhuận</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button className="bg-green-600 text-white px-3 py-2 lg:px-4 lg:py-2 rounded-lg hover:bg-green-700 transition-colors text-sm lg:text-base">
              + Thu nhập
            </button>
            <button className="bg-red-600 text-white px-3 py-2 lg:px-4 lg:py-2 rounded-lg hover:bg-red-700 transition-colors text-sm lg:text-base">
              + Chi phí
            </button>
          </div>
        </div>
      </div>

      {/* Financial Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        <div className="bg-white rounded-lg shadow p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm font-medium text-gray-600">Tổng doanh thu</p>
              <p className="text-lg lg:text-2xl font-bold text-green-600">{financialStats.totalRevenue.toLocaleString('vi-VN')}đ</p>
              <p className="text-xs text-gray-500">Tháng này: {financialStats.monthlyRevenue.toLocaleString('vi-VN')}đ</p>
            </div>
            <div className="text-green-500 text-xl lg:text-2xl">💰</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm font-medium text-gray-600">Tổng chi phí</p>
              <p className="text-lg lg:text-2xl font-bold text-red-600">{financialStats.totalExpenses.toLocaleString('vi-VN')}đ</p>
              <p className="text-xs text-gray-500">Tháng này: {financialStats.monthlyExpenses.toLocaleString('vi-VN')}đ</p>
            </div>
            <div className="text-red-500 text-xl lg:text-2xl">💸</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm font-medium text-gray-600">Lợi nhuận</p>
              <p className="text-lg lg:text-2xl font-bold text-blue-600">{financialStats.profit.toLocaleString('vi-VN')}đ</p>
              <p className="text-xs text-gray-500">Tháng này: {financialStats.monthlyProfit.toLocaleString('vi-VN')}đ</p>
            </div>
            <div className="text-blue-500 text-xl lg:text-2xl">📈</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm font-medium text-gray-600">Chờ thanh toán</p>
              <p className="text-lg lg:text-2xl font-bold text-orange-600">{financialStats.pendingPayments.toLocaleString('vi-VN')}đ</p>
              <p className="text-xs text-red-500">Quá hạn: {financialStats.overduePayments.toLocaleString('vi-VN')}đ</p>
            </div>
            <div className="text-orange-500 text-xl lg:text-2xl">⏳</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 lg:p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Giao dịch gần đây</h2>
          </div>
          
          {/* Desktop Table */}
          <div className="hidden lg:block">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mô tả</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Số tiền</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                          {transaction.customer && (
                            <p className="text-xs text-gray-500">{transaction.customer}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-medium ${
                          transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'income' ? '+' : '-'}{transaction.amount.toLocaleString('vi-VN')}đ
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{transaction.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden divide-y divide-gray-200">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                    {transaction.customer && (
                      <p className="text-xs text-gray-500">{transaction.customer}</p>
                    )}
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <span className={`font-medium ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}{transaction.amount.toLocaleString('vi-VN')}đ
                    </span>
                    <p className={`text-xs px-2 py-1 rounded-full inline-block ml-2 ${
                      transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {transaction.status === 'completed' ? 'Hoàn thành' : 'Chờ xử lý'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Overview */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 lg:p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Tổng quan theo tháng</h2>
          </div>
          <div className="p-4 lg:p-6">
            <div className="space-y-4">
              {monthlyData.map((data) => (
                <div key={data.month} className="border rounded-lg p-3 lg:p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-900">{data.month}</h3>
                    <span className="text-sm font-bold text-blue-600">
                      Lợi nhuận: {data.profit.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Doanh thu:</span>
                      <span className="font-medium text-green-600 ml-2">
                        {data.revenue.toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Chi phí:</span>
                      <span className="font-medium text-red-600 ml-2">
                        {data.expense.toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{width: `${(data.profit / data.revenue) * 100}%`}}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Tỷ lệ lợi nhuận: {((data.profit / data.revenue) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Xem báo cáo chi tiết →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}