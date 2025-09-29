'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
// import { ScrollArea } from '@/components/ui/scroll-area';
import { FileDocument, getFileTypeInfo, formatFileSize } from '@/lib/types/file-management';
import { 
  Download, 
  ExternalLink, 
  Calendar, 
  User, 
  Eye,
  FileText,
  X
} from 'lucide-react';

interface FilePreviewModalProps {
  file: FileDocument | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload?: (file: FileDocument) => void;
}

export default function FilePreviewModal({
  file,
  isOpen,
  onClose,
  onDownload
}: FilePreviewModalProps) {
  const [previewError, setPreviewError] = useState(false);

  if (!file) return null;

  const fileTypeInfo = getFileTypeInfo(file.fileName);
  const canPreview = ['pdf', 'image'].includes(fileTypeInfo.type);

  const handleDownload = () => {
    if (onDownload && file) {
      onDownload(file);
    }
  };

  const renderPreviewContent = () => {
    if (previewError) {
      return (
        <div className="flex flex-col items-center justify-center h-96 text-muted-foreground">
          <FileText className="w-16 h-16 mb-4" />
          <p className="text-lg font-medium mb-2">Không thể xem trước file</p>
          <p className="text-sm">Vui lòng tải xuống để xem nội dung</p>
        </div>
      );
    }

    if (!canPreview) {
      return (
        <div className="flex flex-col items-center justify-center h-96 text-muted-foreground">
          <span className="text-6xl mb-4">{fileTypeInfo.icon}</span>
          <p className="text-lg font-medium mb-2">{fileTypeInfo.name}</p>
          <p className="text-sm mb-4">File này không hỗ trợ xem trước</p>
          <Button onClick={handleDownload} className="mb-2">
            <Download className="w-4 h-4 mr-2" />
            Tải xuống để xem
          </Button>
        </div>
      );
    }

    if (fileTypeInfo.type === 'pdf') {
      return (
        <div className="w-full h-96">
          <iframe
            src={file.filePath}
            className="w-full h-full border rounded"
            title={file.name}
            onError={() => setPreviewError(true)}
          />
        </div>
      );
    }

    if (fileTypeInfo.type === 'image') {
      return (
        <div className="flex justify-center">
          <img
            src={file.filePath}
            alt={file.name}
            className="max-w-full max-h-96 object-contain rounded"
            onError={() => setPreviewError(true)}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0 pr-4">
              <DialogTitle className="text-lg font-semibold truncate">
                {file.name}
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {file.originalName}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* File Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="text-sm font-medium">Loại file</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-lg">{fileTypeInfo.icon}</span>
                <span className="text-sm">{fileTypeInfo.name}</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Kích thước</p>
              <p className="text-sm text-muted-foreground mt-1">
                {formatFileSize(file.fileSize)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Tải xuống</p>
              <p className="text-sm text-muted-foreground mt-1">
                {file.downloadCount} lần
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Ngày tải lên</p>
              <div className="flex items-center gap-1 mt-1">
                <Calendar className="w-3 h-3" />
                <span className="text-sm text-muted-foreground">
                  {new Date(file.uploadedAt).toLocaleDateString('vi-VN')}
                </span>
              </div>
            </div>
          </div>

          {/* Category and Tags */}
          <div className="flex flex-wrap gap-2">
            {file.category && (
              <Badge variant="secondary">
                <span className="mr-1">{file.category.icon}</span>
                {file.category.name}
              </Badge>
            )}
            {file.tags.map((tag, index) => (
              <Badge key={index} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Description */}
          {file.description && (
            <div>
              <h3 className="text-sm font-medium mb-2">Mô tả</h3>
              <p className="text-sm text-muted-foreground">
                {file.description}
              </p>
            </div>
          )}

          {/* Preview */}
          <div>
            <h3 className="text-sm font-medium mb-2">Xem trước</h3>
            <div className="border rounded-lg p-4">
              {renderPreviewContent()}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t">
            <Button onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Tải xuống
            </Button>
            <Button variant="outline" asChild>
              <a 
                href={file.filePath} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Mở trong tab mới
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}