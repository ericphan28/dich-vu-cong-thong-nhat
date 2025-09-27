import Image from "next/image";


export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-800 text-white relative">
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
      <header className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Image
              src="/images/logo/tri-tu-thien.jpg"
              alt="Anh Trí"
              width={50}
              height={50}
              className="sm:w-[60px] sm:h-[60px] rounded-full border-2 border-white shadow-lg"
            />
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">
                Hỗ Trợ Dịch Vụ Công<br className="sm:hidden" />
                <span className="hidden sm:inline"> </span>Thống Nhất
              </h1>
              <p className="text-red-100 text-sm sm:text-base">Anh Trí - 0933.211.134</p>
            </div>
          </div>
          <div className="text-center sm:text-right text-sm">
            <p className="text-red-100">Xã Thống Nhất</p>
            <p className="text-red-100">Tỉnh Đồng Nai</p>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-6 sm:py-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
          Dịch Vụ Công Nhanh Chóng - Uy Tín
        </h2>
        <p className="text-base sm:text-xl md:text-2xl mb-6 sm:mb-8 text-red-100 px-2 leading-relaxed">
          Chúng tôi cung cấp đầy đủ các dịch vụ công với quy trình nhanh gọn, tiết kiệm thời gian và chi phí cho bà con nhân dân.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
          <a
            href="tel:0933211134"
            className="bg-white text-red-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition-all duration-300 inline-flex items-center justify-center text-sm sm:text-base btn-hover"
          >
            📞 Liên hệ ngay
          </a>
          <a
            href="https://zalo.me/0933211134"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 inline-flex items-center justify-center text-sm sm:text-base btn-hover"
          >
            💬 Chat Zalo
          </a>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 text-center">
            <div className="text-3xl mb-2">⚡</div>
            <h4 className="font-semibold text-base text-yellow-400">Nhanh Chóng</h4>
            <p className="text-sm text-red-100">Xử lý hồ sơ trong ngày</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 text-center">
            <div className="text-3xl mb-2">💎</div>
            <h4 className="font-semibold text-base text-yellow-400">Uy Tín</h4>
            <p className="text-sm text-red-100">Kinh nghiệm nhiều năm</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 text-center">
            <div className="text-3xl mb-2">💰</div>
            <h4 className="font-semibold text-base text-yellow-400">Tiết Kiệm</h4>
            <p className="text-sm text-red-100">Phí dịch vụ hợp lý</p>
          </div>
        </div>
      </section>      {/* Services Section */}
      <section className="container mx-auto px-4 py-12">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Các Dịch Vụ Chúng Tôi Cung Cấp</h3>
        <div className="service-grid">
          {/* Service Cards */}
          {[
            "Photocopy, soạn hợp đồng các loại",
            "Sao y, chứng thực",
            "Đăng ký kết hôn, trích lục kết hôn, ly hôn",
            "Đăng ký khai sinh, trích lục khai sinh",
            "Đăng ký khai tử, trích lục khai tử",
            "Hồ sơ thừa kế, tặng cho, chuyển nhượng quyền SDD",
            "Xóa thẻ chấp, đăng ký thẻ chấp, chuyển mục đích",
            "Hồ sơ xin việc",
            "Đăng ký giấy phép kinh doanh",
            "Vay vốn ngân hàng",
            "Bán bảo hiểm y tế",
            "Hồ sơ thị bằng lái xe các hạng",
            "Đổi bằng lái xe cấp hạng",
            "Hồ sơ đăng ký ôtô, mô tô",
            "Đăng ký lại CCCD",
            "Đăng ký định danh mức 2",
            "Đăng ký tạm trú, thường trú"
          ].map((service, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors">
              <div className="flex items-start space-x-3">
                <span className="text-yellow-400 text-xl">✓</span>
                <p className="text-white">{service}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Working Hours */}
      <section className="container mx-auto px-4 py-6 sm:py-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 text-center border border-white/10">
          <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-yellow-400">⏰ Thời Gian Hoạt Động</h3>
          <div className="space-y-2 text-sm sm:text-lg">
            <p className="text-red-100"><span className="font-semibold">Sáng:</span> 6:30 - 11:30</p>
            <p className="text-red-100"><span className="font-semibold">Chiều:</span> 13:30 - 20:00</p>
            <p className="text-red-100 font-semibold">Từ thứ hai đến chủ nhật hàng tuần</p>
          </div>
          <div className="mt-4 sm:mt-6 space-y-2">
            <p className="text-lg sm:text-xl font-bold text-yellow-400">📞 HOTLINE/ZALO: 0933.211.134</p>
            <p className="text-xs sm:text-sm text-red-100 leading-relaxed px-2">
              📍 <span className="font-semibold">ĐỊA CHỈ:</span> 18-25 QUỐC LỘ 20, ẤP LẬP THÀNH, XÃ DẦU GIÂY, ĐỒNG NAI<br />
              <span className="text-yellow-300">(Gần chợ gần mới Dầu Giây)</span>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-red-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Developer Info */}
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold mb-4">💻 Hỗ Trợ Kỹ Thuật & Phát Triển Website</h4>
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
                <Image
                  src="/images/logo/thang-phan.png"
                  alt="Thắng Phan"
                  width={80}
                  height={80}
                  className="rounded-full border-2 border-white"
                />
                <div>
                  <p className="font-semibold text-lg">Thắng Phan - Developer</p>
                  <p className="text-red-200">Web Developer</p>
                  <p className="mt-2">📱 Zalo: 0907 136 029</p>
                  <a
                    href="https://www.facebook.com/thang.phan.334/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-blue-200 underline"
                  >
                    📘 Facebook Profile
                  </a>
                </div>
              </div>
            </div>

            {/* Technology Partner */}
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold mb-4">Technology Partner</h4>
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
                <Image
                  src="/images/logo/gia-kiem-so-logo.png"
                  alt="Gia Kiểm Số"
                  width={80}
                  height={80}
                  className="rounded-lg bg-white p-2"
                />
                <div>
                  <p className="font-semibold text-lg">Cty TNHH Gia Kiểm Số</p>
                  <a
                    href="https://www.giakiemso.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-blue-200 underline"
                  >
                    🌐 Giakiemso.com
                  </a>
                  <br />
                  <a
                    href="https://www.facebook.com/profile.php?id=61577066581766"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-blue-200 underline"
                  >
                    📘 Facebook Page
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8 pt-8 border-t border-red-800">
            <p className="text-red-200">© 2024 Hỗ Trợ Dịch Vụ Công Thống Nhất. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
