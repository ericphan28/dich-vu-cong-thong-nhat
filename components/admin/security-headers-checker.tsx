'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertCircle, Shield, ExternalLink } from 'lucide-react';

interface SecurityHeader {
  name: string;
  description: string;
  required: boolean;
  present: boolean;
  value?: string;
  recommendation?: string;
}

export default function SecurityHeadersChecker() {
  const [headers, setHeaders] = useState<SecurityHeader[]>([]);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState<string>('');

  useEffect(() => {
    checkSecurityHeaders();
  }, []);

  const checkSecurityHeaders = async () => {
    setLoading(true);
    
    try {
      // Get current page headers
      const response = await fetch(window.location.href, { 
        method: 'HEAD',
        cache: 'no-store'
      });
      
      const headerData: SecurityHeader[] = [
        {
          name: 'Content-Security-Policy',
          description: 'Ngăn chặn tấn công XSS bằng cách kiểm soát tài nguyên được tải',
          required: true,
          present: response.headers.has('content-security-policy'),
          value: response.headers.get('content-security-policy') || undefined,
          recommendation: 'Nên có để bảo vệ khỏi XSS attacks'
        },
        {
          name: 'X-Frame-Options',
          description: 'Ngăn chặn tấn công clickjacking',
          required: true,
          present: response.headers.has('x-frame-options'),
          value: response.headers.get('x-frame-options') || undefined,
          recommendation: 'Nên set SAMEORIGIN hoặc DENY'
        },
        {
          name: 'X-Content-Type-Options',
          description: 'Ngăn chặn MIME type sniffing',
          required: true,
          present: response.headers.has('x-content-type-options'),
          value: response.headers.get('x-content-type-options') || undefined,
          recommendation: 'Nên set nosniff'
        },
        {
          name: 'Referrer-Policy',
          description: 'Kiểm soát thông tin referrer được gửi',
          required: true,
          present: response.headers.has('referrer-policy'),
          value: response.headers.get('referrer-policy') || undefined,
          recommendation: 'Nên set strict-origin-when-cross-origin'
        },
        {
          name: 'Permissions-Policy',
          description: 'Kiểm soát các tính năng browser có thể sử dụng',
          required: true,
          present: response.headers.has('permissions-policy'),
          value: response.headers.get('permissions-policy') || undefined,
          recommendation: 'Nên hạn chế các permissions không cần thiết'
        },
        {
          name: 'Strict-Transport-Security',
          description: 'Bắt buộc sử dụng HTTPS',
          required: true,
          present: response.headers.has('strict-transport-security'),
          value: response.headers.get('strict-transport-security') || undefined,
          recommendation: 'Bắt buộc cho HTTPS sites'
        },
        {
          name: 'Cross-Origin-Embedder-Policy',
          description: 'Kiểm soát cross-origin resources',
          required: false,
          present: response.headers.has('cross-origin-embedder-policy'),
          value: response.headers.get('cross-origin-embedder-policy') || undefined,
          recommendation: 'Tăng cường bảo mật'
        },
        {
          name: 'Cross-Origin-Opener-Policy',
          description: 'Bảo vệ khỏi cross-origin attacks',
          required: false,
          present: response.headers.has('cross-origin-opener-policy'),
          value: response.headers.get('cross-origin-opener-policy') || undefined,
          recommendation: 'Khuyến nghị cho security'
        }
      ];

      setHeaders(headerData);
      
      // Calculate score
      const requiredHeaders = headerData.filter(h => h.required);
      const presentRequiredHeaders = requiredHeaders.filter(h => h.present);
      const optionalHeaders = headerData.filter(h => !h.required);
      const presentOptionalHeaders = optionalHeaders.filter(h => h.present);
      
      const percentage = (presentRequiredHeaders.length / requiredHeaders.length) * 100;
      const bonusPoints = (presentOptionalHeaders.length / optionalHeaders.length) * 10;
      const totalScore = Math.min(percentage + bonusPoints, 100);
      
      let grade = 'F';
      if (totalScore >= 90) grade = 'A+';
      else if (totalScore >= 80) grade = 'A';
      else if (totalScore >= 70) grade = 'B';
      else if (totalScore >= 60) grade = 'C';
      else if (totalScore >= 50) grade = 'D';
      
      setScore(`${grade} (${Math.round(totalScore)}%)`);
      
    } catch (error) {
      console.error('Error checking headers:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (header: SecurityHeader) => {
    if (header.present) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    } else if (header.required) {
      return <XCircle className="w-5 h-5 text-red-500" />;
    } else {
      return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusBadge = (header: SecurityHeader) => {
    if (header.present) {
      return <Badge variant="default" className="bg-green-100 text-green-800">Present</Badge>;
    } else if (header.required) {
      return <Badge variant="destructive">Missing</Badge>;
    } else {
      return <Badge variant="secondary">Optional</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-500" />
                Security Headers Check
              </CardTitle>
              <CardDescription>
                Kiểm tra các security headers của website để cải thiện bảo mật
              </CardDescription>
            </div>
            
            {!loading && (
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{score}</div>
                <div className="text-sm text-gray-500">Security Score</div>
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center gap-4">
            <Button 
              onClick={checkSecurityHeaders}
              disabled={loading}
              size="sm"
            >
              {loading ? 'Đang kiểm tra...' : 'Kiểm tra lại'}
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              asChild
            >
              <a 
                href="https://securityheaders.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Test External
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Headers List */}
      <div className="grid gap-4">
        {headers.map((header) => (
          <Card key={header.name}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  {getStatusIcon(header)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{header.name}</h3>
                      {getStatusBadge(header)}
                      {header.required && (
                        <Badge variant="outline" className="text-xs">Required</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {header.description}
                    </p>
                    
                    {header.value && (
                      <div className="mt-2">
                        <div className="text-xs text-gray-500 mb-1">Current Value:</div>
                        <code className="text-xs bg-gray-100 dark:bg-gray-800 p-1 rounded break-all">
                          {header.value}
                        </code>
                      </div>
                    )}
                    
                    {!header.present && header.recommendation && (
                      <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                        <strong>Khuyến nghị:</strong> {header.recommendation}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Cách cải thiện Security Score</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">1. Deploy với cấu hình mới</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Headers đã được cấu hình trong next.config.ts và vercel.json. Deploy lại để áp dụng.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">2. Kiểm tra sau deploy</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Sử dụng <a href="https://securityheaders.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">securityheaders.com</a> để kiểm tra điểm số chính thức.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">3. Theo dõi thường xuyên</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Kiểm tra security headers định kỳ để đảm bảo bảo mật tối ưu.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}