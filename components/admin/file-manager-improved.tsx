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
  MoreVertical, 
  Folder,
  Calendar,
  FileText,
  Trash2,
  Edit3,
  Share,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
  Plus
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
  const [selectedFileType, setSelectedFileType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size' | 'downloads'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [dragOver, setDragOver] = useState(false);

  // Get unique file types
  const fileTypes = Array.from(new Set(files.map(file => file.fileType)));

  // Filter and sort files
  const filteredFiles = files
    .filter(file => {
      const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (file.description && file.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          file.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || file.categoryId === selectedCategory;
      const matchesFileType = selectedFileType === 'all' || file.fileType === selectedFileType;
      
      return matchesSearch && matchesCategory && matchesFileType;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'size':
          comparison = a.fileSize - b.fileSize;
          break;
        case 'downloads':
          comparison = a.downloadCount - b.downloadCount;
          break;
        case 'date':
        default:
          comparison = new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime();
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const getCategoryById = (id: string) => {
    return categories.find(cat => cat.id === id);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0 && onFileUpload) {
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

  // Calculate stats
  const totalSize = filteredFiles.reduce((sum, file) => sum + file.fileSize, 0);
  const totalDownloads = filteredFiles.reduce((sum, file) => sum + file.downloadCount, 0);

  return (
    <div className="space-y-6">
      {/* Header with Title and Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quản Lý File</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Quản lý tài liệu và file dịch vụ công
          </p>
        </div>
        
        {/* Quick Stats */}
        <div className="flex items-center gap-6 text-sm">
          <div className="text-center">
            <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
              {filteredFiles.length}
            </div>
            <div className="text-gray-500">Files</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-green-600 dark:text-green-400">
              {formatFileSize(totalSize)}
            </div>
            <div className="text-gray-500">Tổng dung lượng</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-purple-600 dark:text-purple-400">
              {totalDownloads}
            </div>
            <div className="text-gray-500">Downloads</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm file..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap lg:flex-nowrap gap-2">
              {/* Category Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="whitespace-nowrap">
                    <Folder className="w-4 h-4 mr-2" />
                    {selectedCategory === 'all' ? 'Tất cả danh mục' : 
                     categories.find(c => c.id === selectedCategory)?.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSelectedCategory('all')}>
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

              {/* File Type Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="whitespace-nowrap">
                    <FileText className="w-4 h-4 mr-2" />
                    {selectedFileType === 'all' ? 'Tất cả loại' : selectedFileType}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSelectedFileType('all')}>
                    Tất cả loại file
                  </DropdownMenuItem>
                  {fileTypes.map((type) => (
                    <DropdownMenuItem 
                      key={type}
                      onClick={() => setSelectedFileType(type)}
                    >
                      {getFileTypeInfo('.' + type).icon} {getFileTypeInfo('.' + type).name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Sort */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => { setSortBy('name'); setSortOrder('asc'); }}>
                    Tên A-Z
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setSortBy('name'); setSortOrder('desc'); }}>
                    Tên Z-A
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setSortBy('date'); setSortOrder('desc'); }}>
                    Mới nhất
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setSortBy('date'); setSortOrder('asc'); }}>
                    Cũ nhất
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setSortBy('size'); setSortOrder('desc'); }}>
                    Lớn nhất
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setSortBy('size'); setSortOrder('asc'); }}>
                    Nhỏ nhất
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setSortBy('downloads'); setSortOrder('desc'); }}>
                    Phổ biến nhất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* View Mode */}
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload Drop Zone */}
      {onFileUpload && (
        <Card 
          className={`border-2 border-dashed transition-colors ${
            dragOver 
              ? 'border-blue-400 bg-blue-50 dark:bg-blue-950/20' 
              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <CardContent className="p-8 text-center">
            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">Kéo thả file vào đây</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
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
              <Plus className="w-4 h-4 mr-2" />
              Chọn File
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Files Display */}
      {viewMode === 'grid' ? (
        <div className="file-grid">
          {filteredFiles.map((file) => (
            <FileCard 
              key={file.id}
              file={file}
              category={getCategoryById(file.categoryId)}
              onPreview={onFilePreview}
              onDownload={onFileDownload}
              onEdit={onFileEdit}
              onDelete={onFileDelete}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredFiles.map((file) => (
                <FileListItem
                  key={file.id}
                  file={file}
                  category={getCategoryById(file.categoryId)}
                  onPreview={onFilePreview}
                  onDownload={onFileDownload}
                  onEdit={onFileEdit}
                  onDelete={onFileDelete}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {filteredFiles.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">
              Không tìm thấy file
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
              {searchQuery || selectedCategory !== 'all' || selectedFileType !== 'all'
                ? 'Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc để tìm file khác' 
                : 'Chưa có file nào được tải lên. Hãy bắt đầu bằng cách tải lên file đầu tiên.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// File Card Component for Grid View
function FileCard({
  file,
  category,
  onPreview,
  onDownload,
  onEdit,
  onDelete
}: {
  file: FileDocument;
  category?: FileCategory;
  onPreview?: (file: FileDocument) => void;
  onDownload?: (file: FileDocument) => void;
  onEdit?: (file: FileDocument) => void;
  onDelete?: (file: FileDocument) => void;
}) {
  const fileTypeInfo = getFileTypeInfo(file.fileName);

  return (
    <Card className="file-card group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="text-3xl">{fileTypeInfo.icon}</div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-sm font-medium truncate" title={file.name}>
                {file.name}
              </CardTitle>
              <CardDescription className="text-xs">
                {fileTypeInfo.name}
              </CardDescription>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onPreview && (
                <DropdownMenuItem onClick={() => onPreview(file)}>
                  <Eye className="w-4 h-4 mr-2" />
                  Xem trước
                </DropdownMenuItem>
              )}
              {onDownload && (
                <DropdownMenuItem onClick={() => onDownload(file)}>
                  <Download className="w-4 h-4 mr-2" />
                  Tải xuống
                </DropdownMenuItem>
              )}
              {onEdit && (
                <DropdownMenuItem onClick={() => onEdit(file)}>
                  <Edit3 className="w-4 h-4 mr-2" />
                  Chỉnh sửa
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>
                <Share className="w-4 h-4 mr-2" />
                Chia sẻ
              </DropdownMenuItem>
              {onDelete && (
                <DropdownMenuItem 
                  onClick={() => onDelete(file)}
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
          <Badge 
            variant="secondary" 
            className="mb-3 text-xs"
            style={{ backgroundColor: `${category.color}15`, color: category.color }}
          >
            <span className="mr-1">{category.icon}</span>
            {category.name}
          </Badge>
        )}
        
        {/* Description */}
        {file.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">
            {file.description}
          </p>
        )}
        
        {/* Tags */}
        {file.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {file.tags.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {file.tags.length > 2 && (
              <Badge variant="outline" className="text-xs text-gray-500">
                +{file.tags.length - 2}
              </Badge>
            )}
          </div>
        )}
        
        {/* File Info */}
        <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400 border-t pt-3">
          <div className="flex items-center justify-between">
            <span>Kích thước:</span>
            <span className="font-medium">{formatFileSize(file.fileSize)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Tải xuống:</span>
            <span className="font-medium">{file.downloadCount} lần</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date(file.uploadedAt).toLocaleDateString('vi-VN')}</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-1 mt-3 pt-3 border-t">
          {onPreview && (
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => onPreview(file)}
              className="flex-1 text-xs"
            >
              <Eye className="w-3 h-3 mr-1" />
              Xem
            </Button>
          )}
          {onDownload && (
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => onDownload(file)}
              className="flex-1 text-xs"
            >
              <Download className="w-3 h-3 mr-1" />
              Tải
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// File List Item Component for List View
function FileListItem({
  file,
  category,
  onPreview,
  onDownload,
  onEdit,
  onDelete
}: {
  file: FileDocument;
  category?: FileCategory;
  onPreview?: (file: FileDocument) => void;
  onDownload?: (file: FileDocument) => void;
  onEdit?: (file: FileDocument) => void;
  onDelete?: (file: FileDocument) => void;
}) {
  const fileTypeInfo = getFileTypeInfo(file.fileName);

  return (
    <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <div className="flex items-center gap-4">
        {/* File Icon & Info */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="text-2xl">{fileTypeInfo.icon}</div>
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate">{file.name}</div>
            <div className="text-sm text-gray-500 truncate">
              {file.description || fileTypeInfo.name}
            </div>
          </div>
        </div>

        {/* Category */}
        <div className="hidden sm:block">
          {category && (
            <Badge variant="secondary" className="text-xs">
              <span className="mr-1">{category.icon}</span>
              {category.name}
            </Badge>
          )}
        </div>

        {/* File Size */}
        <div className="hidden md:block text-sm text-gray-500 w-20 text-right">
          {formatFileSize(file.fileSize)}
        </div>

        {/* Download Count */}
        <div className="hidden lg:block text-sm text-gray-500 w-16 text-center">
          {file.downloadCount}
        </div>

        {/* Date */}
        <div className="hidden lg:block text-sm text-gray-500 w-24">
          {new Date(file.uploadedAt).toLocaleDateString('vi-VN')}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {onPreview && (
            <Button size="sm" variant="ghost" onClick={() => onPreview(file)}>
              <Eye className="w-4 h-4" />
            </Button>
          )}
          {onDownload && (
            <Button size="sm" variant="ghost" onClick={() => onDownload(file)}>
              <Download className="w-4 h-4" />
            </Button>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onEdit && (
                <DropdownMenuItem onClick={() => onEdit(file)}>
                  <Edit3 className="w-4 h-4 mr-2" />
                  Chỉnh sửa
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>
                <Share className="w-4 h-4 mr-2" />
                Chia sẻ
              </DropdownMenuItem>
              {onDelete && (
                <DropdownMenuItem 
                  onClick={() => onDelete(file)}
                  className="text-red-600"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Xóa
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}