'use client';

import { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { 
  FileDocument, 
  FileCategory, 
  FILE_CATEGORIES, 
  getFileTypeInfo, 
  formatFileSize
} from '@/lib/types/file-management';
import { 
  Upload, 
  Download, 
  Eye, 
  Search, 
  Filter, 
  MoreVertical, 
  Folder,
  Calendar,
  User,
  FileText,
  Trash2,
  Edit3,
  Share
} from 'lucide-react';

interface FileManagerProps {
  files: FileDocument[];
  categories: FileCategory[];
  onFileUpload?: (files: FileList) => void;
  onFileDownload?: (file: FileDocument) => void;
  onFilePreview?: (file: FileDocument) => void;
  onFileDelete?: (file: FileDocument) => void;
  onFileEdit?: (file: FileDocument) => void;
}

export default function FileManager({
  files,
  categories = FILE_CATEGORIES,
  onFileUpload,
  onFileDownload,
  onFilePreview,
  onFileDelete,
  onFileEdit
}: FileManagerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [dragOver, setDragOver] = useState(false);

  // Filter files based on search and category
  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         file.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         file.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || file.categoryId === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Handle file drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    if (onFileUpload && e.dataTransfer.files.length > 0) {
      onFileUpload(e.dataTransfer.files);
    }
  }, [onFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  // Get category by id
  const getCategoryById = (id: string) => {
    return categories.find(cat => cat.id === id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Quản Lý File</h2>
          <p className="text-muted-foreground">
            Quản lý tài liệu và file dịch vụ công
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Tải lên
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <FileText className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tổng File</p>
                <p className="text-2xl font-bold">{files.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {categories.slice(0, 3).map((category) => {
          const count = files.filter(f => f.categoryId === category.id).length;
          return (
            <Card key={category.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 ${category.color}/10 rounded-lg`}>
                    <span className="text-lg">{category.icon}</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{category.name}</p>
                    <p className="text-2xl font-bold">{count}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Tìm kiếm file..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              {selectedCategory === 'all' ? 'Tất cả danh mục' : getCategoryById(selectedCategory)?.name}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => setSelectedCategory('all')}>
              <Folder className="w-4 h-4 mr-2" />
              Tất cả danh mục
            </DropdownMenuItem>
            {categories.map((category) => (
              <DropdownMenuItem 
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Upload Zone */}
      {onFileUpload && (
        <Card 
          className={`border-2 border-dashed transition-colors ${
            dragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <CardContent className="p-8 text-center">
            <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">Kéo thả file vào đây</p>
            <p className="text-muted-foreground mb-4">
              Hoặc click để chọn file (PDF, Excel, PowerPoint, Word, Image)
            </p>
            <Button 
              variant="outline"
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.multiple = true;
                input.accept = '.pdf,.xlsx,.xls,.pptx,.ppt,.docx,.doc,.jpg,.jpeg,.png,.gif,.webp';
                input.onchange = (e) => {
                  const files = (e.target as HTMLInputElement).files;
                  if (files) onFileUpload(files);
                };
                input.click();
              }}
            >
              Chọn File
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Files Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredFiles.map((file) => {
          const fileTypeInfo = getFileTypeInfo(file.fileName);
          const category = getCategoryById(file.categoryId);
          
          return (
            <Card key={file.id} className="group hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{fileTypeInfo.icon}</span>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-sm truncate">
                        {file.name}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {fileTypeInfo.name}
                      </CardDescription>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {onFilePreview && (
                        <DropdownMenuItem onClick={() => onFilePreview(file)}>
                          <Eye className="w-4 h-4 mr-2" />
                          Xem trước
                        </DropdownMenuItem>
                      )}
                      {onFileDownload && (
                        <DropdownMenuItem onClick={() => onFileDownload(file)}>
                          <Download className="w-4 h-4 mr-2" />
                          Tải xuống
                        </DropdownMenuItem>
                      )}
                      {onFileEdit && (
                        <DropdownMenuItem onClick={() => onFileEdit(file)}>
                          <Edit3 className="w-4 h-4 mr-2" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem>
                        <Share className="w-4 h-4 mr-2" />
                        Chia sẻ
                      </DropdownMenuItem>
                      {onFileDelete && (
                        <DropdownMenuItem 
                          onClick={() => onFileDelete(file)}
                          className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Xóa
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                {/* Category Badge */}
                {category && (
                  <Badge variant="secondary" className="mb-3 text-xs">
                    <span className="mr-1">{category.icon}</span>
                    {category.name}
                  </Badge>
                )}
                
                {/* Description */}
                {file.description && (
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {file.description}
                  </p>
                )}
                
                {/* Tags */}
                {file.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {file.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {file.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{file.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
                
                {/* File Info */}
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Kích thước:</span>
                    <span>{formatFileSize(file.fileSize)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Tải xuống:</span>
                    <span>{file.downloadCount} lần</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(file.uploadedAt).toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredFiles.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">Không tìm thấy file</p>
            <p className="text-muted-foreground">
              {searchQuery || selectedCategory !== 'all' 
                ? 'Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc' 
                : 'Chưa có file nào được tải lên'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}