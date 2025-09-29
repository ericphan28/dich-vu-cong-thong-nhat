import PublicSecurityStatus from '@/components/admin/public-security-status';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tình trạng Bảo mật | Dịch vụ Công Thống Nhất',
  description: 'Thông tin về tình trạng bảo mật và các biện pháp bảo vệ của website Dịch vụ Công Thống Nhất',
  keywords: ['bảo mật', 'security', 'https', 'an toàn thông tin'],
};

export default function SecurityStatusPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Tình trạng Bảo mật Website
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Chúng tôi cam kết đảm bảo an toàn thông tin và bảo mật dữ liệu của người dùng 
            thông qua việc áp dụng các tiêu chuẩn bảo mật quốc tế hàng đầu.
          </p>
        </div>

        {/* Security Status Component */}
        <PublicSecurityStatus />

        {/* Additional Information */}
        <div className="mt-12 p-6 bg-muted/30 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Cam kết Bảo mật</h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              • <strong>Mã hóa dữ liệu:</strong> Tất cả thông tin được truyền tải thông qua kết nối HTTPS được mã hóa
            </p>
            <p>
              • <strong>Kiểm tra thường xuyên:</strong> Hệ thống được kiểm tra bảo mật định kỳ bởi các công cụ chuyên nghiệp
            </p>
            <p>
              • <strong>Cập nhật liên tục:</strong> Các bản vá bảo mật được áp dụng ngay khi có sẵn
            </p>
            <p>
              • <strong>Tuân thủ chuẩn:</strong> Đáp ứng các tiêu chuẩn bảo mật quốc tế và quy định của Việt Nam
            </p>
          </div>
        </div>

        {/* Contact for Security Issues */}
        <div className="mt-8 p-4 border border-orange-200 bg-orange-50 rounded-lg">
          <h3 className="font-medium text-orange-800 mb-2">
            Báo cáo Vấn đề Bảo mật
          </h3>
          <p className="text-sm text-orange-700">
            Nếu bạn phát hiện vấn đề bảo mật, vui lòng liên hệ ngay với chúng tôi qua email: 
            <span className="font-medium ml-1">security@thongnhat.giakiemso.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}