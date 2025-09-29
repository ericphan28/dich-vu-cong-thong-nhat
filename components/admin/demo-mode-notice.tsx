'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Database, X, CheckCircle } from 'lucide-react';

interface DemoModeNoticeProps {
  onDismiss?: () => void;
}

export default function DemoModeNotice({ onDismiss }: DemoModeNoticeProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  const handleDismiss = () => {
    setIsDismissed(true);
    if (onDismiss) onDismiss();
  };

  return (
    <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/20 mb-6">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">
                Demo Mode Active
              </h3>
              <Badge variant="outline" className="text-yellow-700 border-yellow-300">
                Development
              </Badge>
            </div>
            
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              Hệ thống đang chạy ở chế độ demo với dữ liệu mẫu. Database chưa được cấu hình hoặc kết nối.
            </p>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Tính năng hoạt động:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-yellow-700 dark:text-yellow-300">
                    Xem danh sách file
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-yellow-700 dark:text-yellow-300">
                    Tìm kiếm & lọc
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-yellow-700 dark:text-yellow-300">
                    Upload file (demo)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-yellow-700 dark:text-yellow-300">
                    Download file
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-yellow-700 dark:text-yellow-300">
                    Xem trước file
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-yellow-700 dark:text-yellow-300">
                    Chỉnh sửa thông tin
                  </span>
                </div>
              </div>
            </div>
            
            <div className="pt-2 border-t border-yellow-200 dark:border-yellow-800">
              <p className="text-xs text-yellow-600 dark:text-yellow-400 flex items-center gap-1">
                <Database className="w-3 h-3" />
                Để kích hoạt chế độ production, cần cấu hình database Supabase
              </p>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleDismiss}
            className="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-200"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}