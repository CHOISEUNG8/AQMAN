'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/context/AuthContext';

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user === null) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    // 이미 로그인된 경우 대시보드로 리다이렉트
    const token = localStorage.getItem('admin_token');
    const user = localStorage.getItem('admin_user');
    
    if (token && user) {
      try {
        const userData = JSON.parse(user);
        if (userData.is_staff) {
          router.push('/admin');
        }
      } catch (error) {
        // 잘못된 데이터면 삭제
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
      console.log('Attempting login to:', `${apiUrl}/api/login/`);
      
      const response = await fetch(`${apiUrl}/api/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (response.status === 204) {
        setError('서버에서 응답이 없습니다. 백엔드 서버를 확인해주세요.');
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response:', errorText);
        setError(`로그인 실패: ${response.status} - ${errorText}`);
        return;
      }

      const data = await response.json();
      console.log('Login response:', data);

      // 관리자 권한 확인
      if (!data.user.is_staff) {
        setError('관리자 권한이 필요합니다.');
        return;
      }

      // 토큰과 사용자 정보 저장
      localStorage.setItem('admin_token', data.access_token);
      localStorage.setItem('admin_user', JSON.stringify(data.user));
      
      // 대시보드로 리다이렉트
      router.push('/admin');
    } catch (error) {
      console.error('Login error:', error);
      setError('서버 연결에 실패했습니다. 백엔드 서버가 실행 중인지 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getDisplayName = (userData: any) => {
    if (typeof userData.name === "string" && userData.name.trim() !== "") return userData.name;
    if (userData.first_name || userData.last_name) return `${userData.first_name || ""} ${userData.last_name || ""}`.trim();
    if (userData.username) return userData.username;
    if (userData.email) return userData.email;
    return "회원";
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">로딩 중...</div>;
  }
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            ZenithWorld 관리자
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            관리자 계정으로 로그인하세요
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                사용자명
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="사용자명"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="비밀번호"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            API URL: {process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}
          </p>
        </div>
      </div>
    </div>
  );
} 