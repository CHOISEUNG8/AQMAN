'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보 확인
    const token = localStorage.getItem('admin_token');
    const userInfo = localStorage.getItem('admin_user');
    
    if (!token || !userInfo) {
      router.push('/admin/login');
      return;
    }

    try {
      const userData = JSON.parse(userInfo);
      if (!userData.is_staff) {
        router.push('/admin/login');
        return;
      }
      setUser(userData);
    } catch (error) {
      router.push('/admin/login');
    }
  }, [router]);

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">로딩 중...</div>;
  }

  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
} 