import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Admin Dashboard - Hỗ Trợ Dịch Vụ Công',
  description: 'Quản lý dịch vụ hỗ trợ dịch vụ công',
};

export default function AdminPage() {
  redirect('/admin/dashboard');
}