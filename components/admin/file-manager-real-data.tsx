'use client';

import { useState, useEffect } from 'react';
import FileManager from '@/components/admin/file-manager-improved';
import FilePreviewModal from '@/components/admin/file-preview-modal';
import { FileDocument, FileCategory } from '@/lib/types/file-management';
import { realDataFileService } from '@/lib/services/real-data-file-service';

export default function FileManagerContainer() {
  const [files, setFiles] = useState<FileDocument[]>([]);
  const [categories, setCategories] = useState<FileCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewFile, setPreviewFile] = useState<FileDocument | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Fetch real data
  useEffect(() => {
    fetchFiles();
    fetchCategories();
  }, []);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const result = await realDataFileService.getFiles();
      setFiles(result.files);
    } catch (error) {
      console.error('Error fetching files:', error);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const categories = await realDataFileService.getCategories();
      setCategories(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };

  const handlePreview = (file: FileDocument) => {
    setPreviewFile(file);
    setIsPreviewOpen(true);
    // Increment download count
    realDataFileService.incrementDownloadCount(file.id);
  };

  const handleDownload = async (file: FileDocument) => {
    try {
      // Increment download count
      await realDataFileService.incrementDownloadCount(file.id);
      
      // Create download link
      const link = document.createElement('a');
      link.href = file.filePath;
      link.download = file.originalName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Refresh files to update download count
      fetchFiles();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleUpload = async (uploadData: {
    file: File;
    categoryId: string;
    description: string;
    tags: string[];
  }) => {
    try {
      setLoading(true);
      
      // Create file data - in real implementation, file would be uploaded to storage
      const fileData: Omit<FileDocument, 'id' | 'uploadedAt' | 'updatedAt' | 'downloadCount'> = {
        name: uploadData.file.name.replace(/\.[^/.]+$/, ""), // Remove extension
        originalName: uploadData.file.name,
        fileName: `${Date.now()}_${uploadData.file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`,
        filePath: `/uploads/${uploadData.file.name}`, // Temporary path
        fileSize: uploadData.file.size,
        fileType: getFileType(uploadData.file.name),
        mimeType: uploadData.file.type,
        categoryId: uploadData.categoryId,
        description: uploadData.description,
        tags: uploadData.tags,
        uploadedBy: 'current-user',
        isActive: true
      };

      await realDataFileService.uploadFile(fileData);
      fetchFiles(); // Refresh files list
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (file: FileDocument) => {
    // This would normally open an edit modal
    console.log('Edit file:', file.name);
    // For now, just log - in real implementation, would open edit dialog
  };

  const handleDelete = async (file: FileDocument) => {
    if (confirm(`Bạn có chắc chắn muốn xóa file "${file.name}"?`)) {
      try {
        await realDataFileService.deleteFile(file.id);
        fetchFiles(); // Refresh files list
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    }
  };

  const handleSearch = async (params: {
    search?: string;
    category?: string;
    fileType?: string;
    sortBy?: string;
    sortOrder?: string;
  }) => {
    try {
      setLoading(true);
      const result = await realDataFileService.getFiles({
        search: params.search,
        category: params.category,
        fileType: params.fileType,
        sortBy: params.sortBy as any,
        sortOrder: params.sortOrder as any
      });
      setFiles(result.files);
    } catch (error) {
      console.error('Error searching files:', error);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to determine file type
  const getFileType = (fileName: string): string => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return 'pdf';
      case 'doc':
      case 'docx':
        return 'word';
      case 'xls':
      case 'xlsx':
        return 'excel';
      case 'ppt':
      case 'pptx':
        return 'powerpoint';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'webp':
        return 'image';
      default:
        return 'other';
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Real Data Notice */}
      <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            ✅
          </div>
          <div>
            <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
              Dữ Liệu Thật Đang Hoạt Động
            </h3>
            <p className="mt-1 text-sm text-green-700 dark:text-green-300">
              Hệ thống hiện đang sử dụng dữ liệu thật từ thư mục file-goc với {files.length} tài liệu thực tế.
            </p>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="flex items-center space-x-1">
                <span className="text-green-600">📄</span>
                <span>Xem chi tiết file</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-green-600">📤</span>
                <span>Tải file thực</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-green-600">🔍</span>
                <span>Tìm kiếm & lọc</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-green-600">📊</span>
                <span>Thống kê thực tế</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">Đang tải dữ liệu thật...</span>
        </div>
      ) : (
        <FileManager
          files={files}
          categories={categories}
          onFileUpload={(fileList) => {
            // Convert FileList to File array and handle upload
            const filesArray = Array.from(fileList);
            filesArray.forEach(file => {
              handleUpload({
                file,
                categoryId: 'administrative', // Default category
                description: `Uploaded file: ${file.name}`,
                tags: ['Upload mới']
              });
            });
          }}
          onFilePreview={handlePreview}
          onFileDownload={handleDownload}
          onFileEdit={handleEdit}
          onFileDelete={handleDelete}
        />
      )}

      {previewFile && (
        <FilePreviewModal
          file={previewFile}
          isOpen={isPreviewOpen}
          onClose={() => {
            setIsPreviewOpen(false);
            setPreviewFile(null);
          }}
          onDownload={() => handleDownload(previewFile)}
        />
      )}
    </div>
  );
}