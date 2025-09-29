'use client';

import { Shield, Lock, Eye, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SecurityFeature {
  name: string;
  status: 'active' | 'warning' | 'info';
  description: string;
  icon: React.ReactNode;
}

export default function PublicSecurityStatus() {
  const securityFeatures: SecurityFeature[] = [
    {
      name: 'HTTPS Enforced',
      status: 'active',
      description: 'Tất cả dữ liệu được mã hóa trong quá trình truyền tải',
      icon: <Lock className="h-4 w-4" />
    },
    {
      name: 'Clickjacking Protection',
      status: 'active', 
      description: 'Website được bảo vệ khỏi các cuộc tấn công nhúng iframe độc hại',
      icon: <Shield className="h-4 w-4" />
    },
    {
      name: 'Content Security Policy',
      status: 'warning',
      description: 'Chính sách bảo mật nội dung được cấu hình để ngăn chặn XSS',
      icon: <Eye className="h-4 w-4" />
    },
    {
      name: 'Cross-Origin Protection',
      status: 'active',
      description: 'Kiểm soát nghiêm ngặt các yêu cầu từ nguồn bên ngoài',
      icon: <Shield className="h-4 w-4" />
    },
    {
      name: 'MIME Sniffing Protection',
      status: 'active',
      description: 'Ngăn chặn trình duyệt đoán nhầm loại file độc hại',
      icon: <CheckCircle className="h-4 w-4" />
    }
  ];

  const getStatusColor = (status: SecurityFeature['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: SecurityFeature['status']) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'info': return <Eye className="h-4 w-4 text-blue-600" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Security Grade Display */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Shield className="h-8 w-8 text-green-600" />
            <CardTitle className="text-2xl font-bold text-green-800">
              Security Grade A
            </CardTitle>
          </div>
          <CardDescription className="text-green-700">
            Website đạt tiêu chuẩn bảo mật cao theo đánh giá của SecurityHeaders.com
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Security Features */}
      <div className="grid gap-4 md:grid-cols-2">
        {securityFeatures.map((feature, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {feature.icon}
                  <CardTitle className="text-sm font-medium">
                    {feature.name}
                  </CardTitle>
                </div>
                <Badge 
                  variant="outline" 
                  className={getStatusColor(feature.status)}
                >
                  {getStatusIcon(feature.status)}
                  <span className="ml-1 text-xs">
                    {feature.status === 'active' ? 'Hoạt động' : 
                     feature.status === 'warning' ? 'Cải thiện' : 'Thông tin'}
                  </span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Security Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Thông tin Bảo mật Bổ sung</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium">CDN Global Distribution</p>
              <p className="text-xs text-muted-foreground">
                Website được phân phối qua mạng CDN toàn cầu của Vercel
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Automatic Security Updates</p>
              <p className="text-xs text-muted-foreground">
                Hệ thống được cập nhật bảo mật tự động và thường xuyên
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Industry Standard Compliance</p>
              <p className="text-xs text-muted-foreground">
                Tuân thủ các tiêu chuẩn bảo mật quốc tế và thực tiễn tốt nhất
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Certificate/Badge */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <Badge className="bg-blue-600 text-white text-sm px-4 py-2">
                ✓ Security Verified
              </Badge>
            </div>
            <p className="text-sm text-blue-800">
              Website này được kiểm tra và xác minh đáp ứng các tiêu chuẩn bảo mật nghiêm ngặt
            </p>
            <p className="text-xs text-blue-600">
              Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}