import Image from "next/image";


export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 relative">
      {/* Floating contact buttons for mobile */}
      <div className="fixed bottom-4 right-4 z-50 sm:hidden flex flex-col space-y-3">
        <a
          href="https://zalo.me/0933211134"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center animate-pulse"
          style={{ width: '56px', height: '56px' }}
          title="Chat Zalo"
        >
          <span className="text-xl">💬</span>
        </a>
        <a
          href="tel:0933211134"
          className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center animate-bounce"
          style={{ width: '56px', height: '56px' }}
          title="Gọi điện"
        >
          <span className="text-xl">📞</span>
        </a>
      </div>
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-700 shadow-lg">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Image
                src="/images/logo/tri.png"
                alt="Anh Trí"
                width={50}
                height={50}
                className="sm:w-[60px] sm:h-[60px] rounded-full border-3 border-white shadow-lg"
              />
              <div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight text-white">
                  Hỗ Trợ Dịch Vụ Công<br className="sm:hidden" />
                  <span className="hidden sm:inline"> </span>Thống Nhất
                </h1>
                <p className="text-red-100 text-sm sm:text-base">Anh Trí - 0933.211.134</p>
              </div>
            </div>
            <div className="text-center sm:text-right text-sm">
              <p className="text-red-100">Ấp Phú Cường</p>
              <p className="text-red-100">Xã Thống Nhất, Đồng Nai</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 leading-tight text-red-600">
            Dịch Vụ Công Nhanh Chóng - Uy Tín
          </h2>
          <p className="text-base sm:text-xl md:text-2xl mb-6 sm:mb-8 text-gray-700 px-2 leading-relaxed">
            Chúng tôi cung cấp đầy đủ các dịch vụ công với quy trình nhanh gọn, tiết kiệm thời gian và chi phí cho bà con nhân dân.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <a
              href="tel:0933211134"
              className="bg-red-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 inline-flex items-center justify-center text-sm sm:text-base btn-hover shadow-lg"
            >
              📞 Liên hệ ngay
            </a>
            <a
              href="https://zalo.me/0933211134"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 inline-flex items-center justify-center text-sm sm:text-base btn-hover shadow-lg"
            >
              💬 Chat Zalo
            </a>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3 text-red-600">⚡</div>
              <h4 className="font-semibold text-lg text-red-600 mb-2">Nhanh Chóng</h4>
              <p className="text-sm text-gray-600">Xử lý hồ sơ trong ngày</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3 text-red-600">💎</div>
              <h4 className="font-semibold text-lg text-red-600 mb-2">Uy Tín</h4>
              <p className="text-sm text-gray-600">Kinh nghiệm nhiều năm</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3 text-red-600">💰</div>
              <h4 className="font-semibold text-lg text-red-600 mb-2">Tiết Kiệm</h4>
              <p className="text-sm text-gray-600">Phí dịch vụ hợp lý</p>
            </div>
          </div>
        </div>
      </section>      {/* Services Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-red-600">25 Dịch Vụ Công Trực Tuyến Thống Nhất</h3>
          <p className="text-center text-gray-600 mb-8 text-sm sm:text-base">
            <span className="font-semibold text-red-600">🏛️ Dịch vụ công trực tuyến toàn trình thiết yếu, bước làm thủ tục trực tuyến từ ngày 1-10, không nhận hồ sơ giấy</span>
          </p>
          <div className="service-grid">
            {/* Nhóm 1: Dịch vụ Giấy tờ tùy thân */}
            {[
              "🆔 Xác nhận số chứng minh nhân dân khi đã được cấp thẻ căn cước công dân",
              "🔄 Cấp lại, đổi thẻ căn cước công dân",
              "📋 Đăng ký thương trú"
            ].map((service, index) => (
              <div key={`id-${index}`} className="bg-white border border-red-100 rounded-lg p-6 hover:shadow-lg hover:border-red-300 transition-all duration-300">
                <div className="flex items-start space-x-3">
                  <span className="text-red-500 text-lg flex-shrink-0 mt-0.5">✓</span>
                  <p className="text-gray-800 text-sm sm:text-base leading-relaxed">{service}</p>
                </div>
              </div>
            ))}
            
            {/* Nhóm 2: Dịch vụ Hộ tịch - Dân cư */}
            {[
              "🏠 Đăng ký tạm trú",
              "� Khai báo tạm vắng",
              "🏘️ Thông báo lưu trú",
              "🏍️ Đăng ký, cấp biển số mô tô, xe gắn máy",
              "💰 Thu tiền nộp phạt vi lý vi phạm hành chính trong lĩnh vực giao thông đường bộ qua thiết bị ghi hình (phạt nguội)",
              "👶 Đăng ký khai sinh",
              "⚰️ Đăng ký khai tử",
              "💒 Đăng ký kết hôn",
              "📋 Cấp, cấp lại, sửa đổi, bổ sung hộ chiếu phổ thông"
            ].map((service, index) => (
              <div key={`civil-${index}`} className="bg-white border border-red-100 rounded-lg p-6 hover:shadow-lg hover:border-red-300 transition-all duration-300">
                <div className="flex items-start space-x-3">
                  <span className="text-red-500 text-lg flex-shrink-0 mt-0.5">✓</span>
                  <p className="text-gray-800 text-sm sm:text-base leading-relaxed">{service}</p>
                </div>
              </div>
            ))}
            
            {/* Nhóm 3: Dịch vụ Pháp lý - Công chứng */}
            {[
              "🔐 Thủ tục làm con dấu mới và cấp giấy chứng nhận đã đăng ký mẫu dấu",
              "🔄 Thủ tục làm con dấu thay thế, dấu nổi, dấu xí và cấp giấy chứng nhận đã đăng ký mẫu con dấu",
              "� Liên thông đăng ký khai sinh - Đăng ký thường trú - Cấp thẻ bảo hiểm y tế theo hộ gia đình",
              "📝 Liên thông đăng ký khai tử - Xóa đăng ký thường trú - Trợ cấp mai táng phí",
              "🏠 Tích hợp tính năm về quyền sử dụng đất trong gia hạn thẻ bảo hiểm y tế theo hộ gia đình"
            ].map((service, index) => (
              <div key={`legal-${index}`} className="bg-white border border-red-100 rounded-lg p-6 hover:shadow-lg hover:border-red-300 transition-all duration-300">
                <div className="flex items-start space-x-3">
                  <span className="text-red-500 text-lg flex-shrink-0 mt-0.5">✓</span>
                  <p className="text-gray-800 text-sm sm:text-base leading-relaxed">{service}</p>
                </div>
              </div>
            ))}
            
            {/* Nhóm 4: Dịch vụ Giao thông - Phương tiện */}
            {[
              "🚗 Đăng ký biến động về quyền sử dụng đất, quyền sở hữu nhà ở và tài sản khác gắn liền với đất để tín dụng được cấp giấy chứng nhận (quyền tín dụng, hoặc giấy tờ pháp nhân, giấy tờ nhân thân, địa chỉ)",
              "📄 Cấp đổi, cấp lại giấy phép lái xe",
              "🎓 Đăng ký du lịch tốt nghiệp THPT và cuốc gia vào xét tuyển đại học, cao đẳng",
              "📋 Cấp phiếu lý lịch tư pháp",
              "💼 Giải quyết hưởng trợ cấp thất nghiệp",
              "⚡ Cấp điện mới tư lưới điện hạ áp (220/380V)",
              "🔌 Thay đổi chủ hộ đồng mua bán điện"
            ].map((service, index) => (
              <div key={`transport-${index}`} className="bg-white border border-red-100 rounded-lg p-6 hover:shadow-lg hover:border-red-300 transition-all duration-300">
                <div className="flex items-start space-x-3">
                  <span className="text-red-500 text-lg flex-shrink-0 mt-0.5">✓</span>
                  <p className="text-gray-800 text-sm sm:text-base leading-relaxed">{service}</p>
                </div>
              </div>
            ))}
            
            {/* Nhóm 5: Dịch vụ Hỗ trợ & Tư vấn */}
            {[
              "📄 Photocopy, soạn hợp đồng các loại",
              "✍️ Sao y, chứng thực",
              "🏠 Hồ sơ thừa kế, tặng cho, chuyển nhượng quyền SDD",
              "📋 Xóa thẻ chấp, đăng ký thẻ chấp, chuyển mục đích",
              "💼 Hồ sơ xin việc",
              "🏢 Đăng ký giấy phép kinh doanh",
              "💳 Vay vốn ngân hàng",
              "🏥 Bán bảo hiểm y tế",
              "🚗 Hồ sơ thi bằng lái xe các hạng",
              "🔄 Đổi bằng lái xe các hạng",
              "🏍️ Hồ sơ đăng ký ôtô, mô tô",
              "🆔 Đăng ký lại CCCD",
              "🔐 Đăng ký định danh mức 2",
              "🏠 Đăng ký tạm trú, thường trú"
            ].map((service, index) => (
              <div key={`support-${index}`} className="bg-white border border-red-100 rounded-lg p-6 hover:shadow-lg hover:border-red-300 transition-all duration-300">
                <div className="flex items-start space-x-3">
                  <span className="text-red-500 text-lg flex-shrink-0 mt-0.5">✓</span>
                  <p className="text-gray-800 text-sm sm:text-base leading-relaxed">{service}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Ghi chú quan trọng */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center max-w-4xl mx-auto">
            <div className="text-yellow-600 text-2xl mb-3">⚠️</div>
            <h4 className="text-lg font-bold text-yellow-800 mb-2">Lưu ý quan trọng</h4>
            <p className="text-sm sm:text-base text-yellow-700 leading-relaxed">
              <span className="font-semibold">25 dịch vụ công trực tuyến trên</span> được triển khai từ ngày 1-10, 
              thực hiện <span className="font-semibold">toàn trình trực tuyến</span> và <span className="font-semibold text-red-600">không nhận hồ sơ giấy</span>.
              Vui lòng liên hệ chúng tôi để được hỗ trợ làm thủ tục online một cách nhanh chóng và chính xác nhất.
            </p>
          </div>
        </div>
      </section>

      {/* Working Hours */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center max-w-4xl mx-auto">
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-red-600">⏰ Thời Gian Hoạt Động</h3>
            <div className="space-y-2 text-sm sm:text-lg">
              <p className="text-gray-700"><span className="font-semibold text-red-600">Sáng:</span> 6:30 - 11:30</p>
              <p className="text-gray-700"><span className="font-semibold text-red-600">Chiều:</span> 13:30 - 20:00</p>
              <p className="text-red-600 font-semibold">Từ thứ hai đến chủ nhật hàng tuần</p>
            </div>
            <div className="mt-6 space-y-3">
              <p className="text-lg sm:text-xl font-bold text-red-600">📞 HOTLINE/ZALO: 0933.211.134</p>
              <p className="text-sm sm:text-base text-red-100">📞 Hỗ trợ kỹ thuật: 0367.582.386</p>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed px-2">
                📍 <span className="font-semibold">ĐỊA CHỈ:</span> Ấp Phú Cường, Xã Thống Nhất, Tỉnh Đồng Nai
              </p>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed px-2">
                📍 <span className="font-semibold">ĐỊA CHỈ 2:</span> LB 25 Quốc lộ 20, Ấp Láp Thạnh, Xã Dầu Giây, Đồng Nai (Gần chợ đầu mối Dầu Giây)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-red-600 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Developer Info */}
            <div className="text-center md:text-left">
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-red-100">💻 Hỗ Trợ Kỹ Thuật & Phát Triển Website</h4>
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-3 md:space-y-0 md:space-x-4">
                <Image
                  src="/images/logo/thang-phan.png"
                  alt="Thắng Phan"
                  width={60}
                  height={60}
                  className="sm:w-[80px] sm:h-[80px] rounded-full border-2 border-white shadow-lg"
                />
                <div className="text-center md:text-left">
                  <p className="font-semibold text-base sm:text-lg">Thắng Phan - Developer</p>
                  <p className="text-red-100 text-sm sm:text-base">Web Developer</p>
                  <p className="mt-2 text-sm sm:text-base">📱 Zalo: 0907 136 029</p>
                  <a
                    href="https://www.facebook.com/thang.phan.334/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-100 hover:text-white underline text-sm sm:text-base"
                  >
                    📘 Facebook Profile
                  </a>
                </div>
              </div>
            </div>

            {/* Technology Partner */}
            <div className="text-center md:text-left">
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-red-100">🤝 Technology Partner</h4>
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-3 md:space-y-0 md:space-x-4">
                <Image
                  src="/images/logo/gia-kiem-so-logo.png"
                  alt="Gia Kiểm Số"
                  width={60}
                  height={60}
                  className="sm:w-[80px] sm:h-[80px] rounded-lg bg-white p-2 shadow-lg"
                />
                <div className="text-center md:text-left">
                  <p className="font-semibold text-base sm:text-lg">Cty TNHH Gia Kiểm Số</p>
                  <a
                    href="https://www.giakiemso.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-100 hover:text-white underline text-sm sm:text-base block"
                  >
                    🌐 Giakiemso.com
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61577066581766"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-100 hover:text-white underline text-sm sm:text-base block mt-1"
                  >
                    📘 Facebook Page
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-red-500">
            <p className="text-red-100 text-xs sm:text-sm">© 2024 Hỗ Trợ Dịch Vụ Công Thống Nhất. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
