export default function SchedulePage() {
  // Mock data - trong thực tế sẽ fetch từ database
  const todaySchedule = [
    {
      id: 1,
      time: '08:00',
      title: 'Đi nộp hồ sơ CCCD cho khách Nguyễn Văn A',
      location: 'Công an Phường',
      type: 'appointment',
      status: 'upcoming',
      customer: 'Nguyễn Văn A',
      phone: '0912345678'
    },
    {
      id: 2,
      time: '09:30',
      title: 'Họp với nhân viên văn phòng Tư pháp',
      location: 'Sở Tư pháp Đồng Nai',
      type: 'meeting',
      status: 'completed',
      customer: null,
      phone: null
    },
    {
      id: 3,
      time: '10:30',
      title: 'Lấy kết quả trích lục khai sinh - Trần Thị B',
      location: 'Phòng Tư pháp Huyện',
      type: 'pickup',
      status: 'completed',
      customer: 'Trần Thị B',
      phone: '0987654321'
    },
    {
      id: 4,
      time: '14:00',
      title: 'Hẹn khách Lê Văn C làm hồ sơ kết hôn',
      location: 'Văn phòng',
      type: 'appointment',
      status: 'upcoming',
      customer: 'Lê Văn C',
      phone: '0901234567'
    },
    {
      id: 5,
      time: '16:00',
      title: 'Gọi điện thông báo hoàn thành cho khách Phạm Thị D',
      location: 'Văn phòng',
      type: 'call',
      status: 'pending',
      customer: 'Phạm Thị D',
      phone: '0976543210'
    }
  ];

  const upcomingAppointments = [
    {
      id: 6,
      date: '2024-09-28',
      time: '09:00',
      title: 'Nộp hồ sơ bảo hiểm xã hội - Hoàng Văn E',
      customer: 'Hoàng Văn E',
      phone: '0934567890',
      service: 'Bảo hiểm XH',
      status: 'confirmed'
    },
    {
      id: 7,
      date: '2024-09-28',
      time: '14:30',
      title: 'Làm giấy chứng nhận độc thân - Nguyễn Thị F',
      customer: 'Nguyễn Thị F',
      phone: '0923456789',
      service: 'Chứng nhận độc thân',
      status: 'pending'
    },
    {
      id: 8,
      date: '2024-09-30',
      time: '10:00',
      title: 'Hỗ trợ làm hộ khẩu - Gia đình Trần Văn G',
      customer: 'Trần Văn G',
      phone: '0945678901',
      service: 'Hộ khẩu',
      status: 'confirmed'
    }
  ];

  const quickStats = {
    todayTasks: todaySchedule.length,
    completed: todaySchedule.filter(task => task.status === 'completed').length,
    upcoming: todaySchedule.filter(task => task.status === 'upcoming').length,
    pending: todaySchedule.filter(task => task.status === 'pending').length
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200';
      case 'pending':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'completed':
        return 'Hoàn thành';
      case 'upcoming':
        return 'Sắp tới';
      case 'pending':
        return 'Chờ xử lý';
      default:
        return status;
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'appointment':
        return '📅';
      case 'meeting':
        return '🤝';
      case 'pickup':
        return '📋';
      case 'call':
        return '📞';
      default:
        return '📝';
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 lg:p-6 transition-colors">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-800 dark:text-white mb-1 lg:mb-2">📅 Lịch làm việc</h1>
            <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300">Quản lý lịch hẹn và công việc hàng ngày</p>
          </div>
          <button className="bg-red-600 text-white px-3 py-2 lg:px-4 lg:py-2 rounded-lg hover:bg-red-700 transition-colors text-sm lg:text-base">
            + Thêm lịch hẹn
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 lg:p-6 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm font-medium text-gray-600 dark:text-gray-300">Tổng công việc</p>
              <p className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">{quickStats.todayTasks}</p>
            </div>
            <div className="text-gray-500 text-xl lg:text-2xl">📋</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 lg:p-6 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm font-medium text-gray-600 dark:text-gray-300">Hoàn thành</p>
              <p className="text-lg lg:text-2xl font-bold text-green-600">{quickStats.completed}</p>
            </div>
            <div className="text-green-500 text-xl lg:text-2xl">✅</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 lg:p-6 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm font-medium text-gray-600 dark:text-gray-300">Sắp tới</p>
              <p className="text-lg lg:text-2xl font-bold text-blue-600">{quickStats.upcoming}</p>
            </div>
            <div className="text-blue-500 text-xl lg:text-2xl">🕒</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm font-medium text-gray-600">Chờ xử lý</p>
              <p className="text-lg lg:text-2xl font-bold text-orange-600">{quickStats.pending}</p>
            </div>
            <div className="text-orange-500 text-xl lg:text-2xl">⏳</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Today's Schedule */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow transition-colors">
          <div className="p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Lịch hôm nay (27/09/2024)</h2>
          </div>
          
          <div className="p-4 lg:p-6">
            <div className="space-y-3 lg:space-y-4">
              {todaySchedule.map((task) => (
                <div key={task.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 lg:p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className={`w-3 h-3 lg:w-4 lg:h-4 rounded-full mt-1 ${
                        task.status === 'completed' ? 'bg-green-500' : 
                        task.status === 'upcoming' ? 'bg-blue-500' : 'bg-orange-400'
                      }`}></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-2 sm:space-y-0">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-lg">{getTypeIcon(task.type)}</span>
                            <span className="text-xs lg:text-sm font-medium text-gray-900 dark:text-white">{task.time}</span>
                          </div>
                          <p className={`text-sm lg:text-base font-medium ${
                            task.status === 'completed' ? 'text-gray-500 dark:text-gray-400 line-through' : 'text-gray-800 dark:text-white'
                          }`}>
                            {task.title}
                          </p>
                          <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400 mt-1">📍 {task.location}</p>
                          {task.customer && (
                            <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-300 mt-1">
                              👤 {task.customer} • {task.phone}
                            </p>
                          )}
                        </div>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(task.status)}`}>
                          {getStatusText(task.status)}
                        </span>
                      </div>
                      
                      {task.status !== 'completed' && (
                        <div className="flex justify-end space-x-2 mt-3 pt-2 border-t border-gray-100 dark:border-gray-700">
                          <button className="text-xs lg:text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors">
                            Hoàn thành
                          </button>
                          {task.customer && (
                            <button className="text-xs lg:text-sm text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 font-medium transition-colors">
                              Gọi điện
                            </button>
                          )}
                          <button className="text-xs lg:text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 font-medium transition-colors">
                            Chỉnh sửa
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 lg:p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Lịch hẹn sắp tới</h2>
          </div>
          
          <div className="p-4 lg:p-6">
            <div className="space-y-3 lg:space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="border rounded-lg p-3 lg:p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm lg:text-base font-medium text-blue-600">{appointment.date}</span>
                        <span className="text-xs lg:text-sm text-gray-500">• {appointment.time}</span>
                      </div>
                      <p className="text-sm lg:text-base font-medium text-gray-900 mb-1">
                        {appointment.title}
                      </p>
                      <div className="text-xs lg:text-sm text-gray-600 space-y-1">
                        <p>👤 {appointment.customer} • {appointment.phone}</p>
                        <p>🏷️ {appointment.service}</p>
                      </div>
                    </div>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {appointment.status === 'confirmed' ? 'Đã xác nhận' : 'Chờ xác nhận'}
                    </span>
                  </div>
                  
                  <div className="flex justify-end space-x-2 mt-3 pt-2 border-t border-gray-100">
                    {appointment.status === 'pending' && (
                      <button className="text-xs lg:text-sm text-green-600 hover:text-green-800 font-medium">
                        Xác nhận
                      </button>
                    )}
                    <button className="text-xs lg:text-sm text-blue-600 hover:text-blue-800 font-medium">
                      Gọi điện
                    </button>
                    <button className="text-xs lg:text-sm text-gray-600 hover:text-gray-800 font-medium">
                      Chỉnh sửa
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Xem tất cả lịch hẹn →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}