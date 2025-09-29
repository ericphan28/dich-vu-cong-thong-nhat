'use client';

import { useState, useEffect } from 'react';
import FileManager from '@/components/admin/file-manager';
import FilePreviewModal from '@/components/admin/file-preview-modal';
import DemoModeNotice from '@/components/admin/demo-mode-notice';
import { FileDocument, FileCategory } from '@/lib/types/file-management';
import { realDataFileService } from '@/lib/services/real-data-file-service';

export default function FileManagerContainer() {
  const [files, setFiles] = useState<FileDocument[]>([]);
  const [categories, setCategories] = useState<FileCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewFile, setPreviewFile] = useState<FileDocument | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Fetch data using real data service
  useEffect(() => {
    fetchFiles();
    fetchCategories();
  }, []);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      
      // Use real data service instead of API
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
      const result = await realDataFileService.getCategories();
      setCategories(result);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };

  const handleFileUpload = async (files: FileList) => {
    try {
      // In a real implementation, this would upload to your file service
      console.log('File upload:', files);
      
      // Refresh the file list after upload
      await fetchFiles();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleFileDelete = async (file: FileDocument) => {
    try {
      await realDataFileService.deleteFile(file.id);
      await fetchFiles(); // Refresh the file list
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleFileUpdate = async (fileId: string, updates: Partial<FileDocument>) => {
    try {
      await realDataFileService.updateFile(fileId, updates);
      await fetchFiles(); // Refresh the file list
    } catch (error) {
      console.error('Error updating file:', error);
    }
  };

  const handleFilePreview = (file: FileDocument) => {
    setPreviewFile(file);
    setIsPreviewOpen(true);
  };

  const handlePreviewClose = () => {
    setIsPreviewOpen(false);
    setPreviewFile(null);
  };

  return (
    <div className="space-y-6">
      <DemoModeNotice />
      
      <FileManager
        files={files}
        categories={categories}
        onFileUpload={handleFileUpload}
        onFileDelete={handleFileDelete}
        onFilePreview={handleFilePreview}
      />

      {previewFile && (
        <FilePreviewModal
          file={previewFile}
          isOpen={isPreviewOpen}
          onClose={handlePreviewClose}
        />
      )}
    </div>
  );
}