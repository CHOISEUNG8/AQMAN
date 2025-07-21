// 인증 관련 유틸리티 함수들

export interface AdminUser {
  id: number;
  username: string;
  name: string;
  email: string;
  is_staff: boolean;
  is_superuser: boolean;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

// API URL 설정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// 로컬 스토리지 키
const ADMIN_TOKEN_KEY = 'admin_token';
const ADMIN_USER_KEY = 'admin_user';

// 토큰 관리
export const getAdminToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ADMIN_TOKEN_KEY);
};

export const setAdminToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
};

export const removeAdminToken = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ADMIN_TOKEN_KEY);
};

// 사용자 정보 관리
export const getAdminUser = (): AdminUser | null => {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem(ADMIN_USER_KEY);
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const setAdminUser = (user: AdminUser): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user));
};

export const removeAdminUser = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ADMIN_USER_KEY);
};

// 인증 상태 확인
export const isAuthenticated = (): boolean => {
  const token = getAdminToken();
  const user = getAdminUser();
  return !!(token && user && user.is_staff);
};

export const isSuperUser = (): boolean => {
  const user = getAdminUser();
  return !!(user && user.is_superuser);
};

// API 요청 헤더 생성
export const getAuthHeaders = (): Record<string, string> => {
  const token = getAdminToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

// 로그인 함수
export const adminLogin = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // 관리자 권한 확인
      if (!data.user.is_staff) {
        return { success: false, error: '관리자 권한이 필요합니다.' };
      }

      // 토큰과 사용자 정보 저장
      setAdminToken(data.access_token);
      setAdminUser(data.user);

      return { success: true };
    } else {
      return { success: false, error: data.detail || '로그인에 실패했습니다.' };
    }
  } catch (error) {
    return { success: false, error: '서버 연결에 실패했습니다.' };
  }
};

// 로그아웃 함수
export const adminLogout = (): void => {
  removeAdminToken();
  removeAdminUser();
};

// 토큰 갱신 함수
export const refreshToken = async (): Promise<boolean> => {
  try {
    const refreshToken = localStorage.getItem('admin_refresh_token');
    if (!refreshToken) return false;

    const response = await fetch(`${API_BASE_URL}/api/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      setAdminToken(data.access);
      return true;
    }
  } catch (error) {
    console.error('토큰 갱신 실패:', error);
  }

  return false;
};

// API 요청 래퍼 함수
export const apiRequest = async <T>(
  url: string, 
  options: RequestInit = {}
): Promise<T> => {
  const headers = getAuthHeaders();
  
  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  if (response.status === 401) {
    // 토큰이 만료된 경우 갱신 시도
    const refreshed = await refreshToken();
    if (refreshed) {
      // 갱신 성공 시 원래 요청 재시도
      const newHeaders = getAuthHeaders();
      const retryResponse = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers: {
          ...newHeaders,
          ...options.headers,
        },
      });
      
      if (retryResponse.ok) {
        return retryResponse.json();
      }
    }
    
    // 갱신 실패 시 로그아웃
    adminLogout();
    throw new Error('인증이 만료되었습니다.');
  }

  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }

  return response.json();
}; 