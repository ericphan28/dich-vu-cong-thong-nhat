// Types for File Management System

export interface FileCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface FileDocument {
  id: string;
  name: string;
  originalName: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  fileType: string;
  mimeType: string;
  categoryId: string;
  category?: FileCategory;
  description?: string;
  tags: string[];
  uploadedBy: string;
  uploadedAt: Date;
  updatedAt: Date;
  isActive: boolean;
  downloadCount: number;
  metadata?: Record<string, any>;
}

export interface FileUploadRequest {
  file: File;
  categoryId: string;
  description?: string;
  tags: string[];
}

export interface FileSearchParams {
  query?: string;
  categoryId?: string;
  fileType?: string;
  tags?: string[];
  dateFrom?: Date;
  dateTo?: Date;
  sortBy?: 'name' | 'uploadedAt' | 'fileSize' | 'downloadCount';
  sortOrder?: 'asc' | 'desc';
}

export const FILE_CATEGORIES: FileCategory[] = [
  {
    id: 'postal-services',
    name: 'Dịch Vụ Bưu Chính',
    description: 'Tài liệu liên quan đến dịch vụ bưu chính và chuyển phát',
    icon: '📮',
    color: 'bg-blue-500'
  },
  {
    id: 'insurance-health',
    name: 'Bảo Hiểm Y Tế',
    description: 'Quyết định và tài liệu BHYT',
    icon: '🏥',
    color: 'bg-green-500'
  },
  {
    id: 'education',
    name: 'Giáo Dục',
    description: 'Thông báo và tài liệu giáo dục, học phí',
    icon: '🎓',
    color: 'bg-purple-500'
  },
  {
    id: 'business-plans',
    name: 'Kế Hoạch Kinh Doanh',
    description: 'Presentations và kế hoạch phát triển',
    icon: '📊',
    color: 'bg-orange-500'
  },
  {
    id: 'regulations',
    name: 'Quy Định & Quyết Định',
    description: 'Các quyết định hành chính và quy định',
    icon: '📋',
    color: 'bg-red-500'
  },
  {
    id: 'administrative',
    name: 'Hành Chính',
    description: 'Tài liệu hành chính tổng quát',
    icon: '🏛️',
    color: 'bg-gray-500'
  }
];

export const SUPPORTED_FILE_TYPES = {
  pdf: {
    extensions: ['.pdf'],
    mimeTypes: ['application/pdf'],
    icon: '📄',
    name: 'PDF Document'
  },
  excel: {
    extensions: ['.xlsx', '.xls'],
    mimeTypes: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'],
    icon: '📊',
    name: 'Excel Spreadsheet'
  },
  powerpoint: {
    extensions: ['.pptx', '.ppt'],
    mimeTypes: ['application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.ms-powerpoint'],
    icon: '📈',
    name: 'PowerPoint Presentation'
  },
  word: {
    extensions: ['.docx', '.doc'],
    mimeTypes: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'],
    icon: '📝',
    name: 'Word Document'
  },
  image: {
    extensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
    mimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    icon: '🖼️',
    name: 'Image File'
  }
};

export function getFileTypeInfo(fileName: string) {
  const extension = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));
  
  for (const [type, info] of Object.entries(SUPPORTED_FILE_TYPES)) {
    if (info.extensions.includes(extension)) {
      return { type, ...info };
    }
  }
  
  return {
    type: 'unknown',
    icon: '📄',
    name: 'Unknown File Type'
  };
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function categorizeFileByName(fileName: string): string {
  const name = fileName.toLowerCase();
  
  // Dịch vụ bưu chính
  if (name.includes('bưu') || name.includes('chuyển phát') || name.includes('vnpost') || name.includes('cước')) {
    return 'postal-services';
  }
  
  // Bảo hiểm y tế
  if (name.includes('bhyt') || name.includes('bảo hiểm') || name.includes('y tế')) {
    return 'insurance-health';
  }
  
  // Giáo dục
  if (name.includes('học phí') || name.includes('hs-gv') || name.includes('giáo dục') || name.includes('học')) {
    return 'education';
  }
  
  // Kế hoạch kinh doanh
  if (name.includes('giải pháp') || name.includes('phát triển') || name.includes('kế hoạch') || name.includes('slide')) {
    return 'business-plans';
  }
  
  // Quy định & quyết định
  if (name.includes('quyết định') || name.includes('qđ') || name.includes('ban hành')) {
    return 'regulations';
  }
  
  // Mặc định: hành chính
  return 'administrative';
}