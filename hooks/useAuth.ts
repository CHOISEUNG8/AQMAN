import { useState, useEffect } from 'react';
import { getToken, setToken, removeToken, apiRequest } from '@/lib/api';

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  is_staff: boolean;
  is_superuser: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // 초기 로드 시 토큰 확인
  useEffect(() => {
    const initializeAuth = async () => {
      const token = getToken();
      
      if (token) {
        try {
          const userData = await apiRequest('/api/user-info/') as User;
          setAuthState({
            user: userData,
            token,
            isLoading: false,
            isAuthenticated: true,
          });
        } catch (error) {
          console.error('Token validation failed:', error);
          removeToken();
          setAuthState({
            user: null,
            token: null,
            isLoading: false,
            isAuthenticated: false,
          });
        }
      } else {
        setAuthState({
          user: null,
          token: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    };

    initializeAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/api/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.detail || '로그인에 실패했습니다.');
      }

      const data = await response.json();
      
      // 관리자 권한 확인
      if (!data.user.is_staff) {
        throw new Error('관리자 권한이 필요합니다.');
      }

      setToken(data.access_token);
      setAuthState({
        user: data.user as User,
        token: data.access_token,
        isLoading: false,
        isAuthenticated: true,
      });

      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : '로그인에 실패했습니다.' 
      };
    }
  };

  const logout = () => {
    removeToken();
    setAuthState({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  const refreshUser = async () => {
    try {
      const userData = await apiRequest('/api/user-info/') as User;
      setAuthState(prev => ({
        ...prev,
        user: userData,
      }));
    } catch (error) {
      console.error('Failed to refresh user:', error);
      logout();
    }
  };

  return {
    ...authState,
    login,
    logout,
    refreshUser,
  };
}; 