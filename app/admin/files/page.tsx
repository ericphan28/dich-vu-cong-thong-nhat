import { Metadata } from 'next';
import FileManagerRealData from '@/components/admin/file-manager-real-data';

export const metadata: Metadata = {
  title: 'Quản Lý File | Admin Dashboard',
  description: 'Quản lý tài liệu và file dịch vụ công',
};

export default function FilesPage() {
  return <FileManagerRealData />;
}