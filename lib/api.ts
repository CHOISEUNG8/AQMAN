// API 설정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

// 토큰 관리
export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token') || getCookie('auth-token');
};

export const setToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('auth_token', token);
  document.cookie = `auth-token=${token}; path=/;`;
};

export const removeToken = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('auth_token');
  document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
};

// 쿠키에서 토큰 가져오기
export const getCookie = (name: string): string | null => {
  if (typeof window === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
};

// API 요청 헤더 생성
export const getAuthHeaders = (): Record<string, string> => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

// 로그인 함수
export const login = async (username: string, password: string): Promise<{ success: boolean; data?: any; error?: string }> => {
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
      // 토큰과 사용자 정보 저장
      setToken(data.access_token);
      return { success: true, data };
    } else {
      return { success: false, error: data.error || data.detail || '로그인에 실패했습니다.' };
    }
  } catch (error) {
    return { success: false, error: '서버 연결에 실패했습니다.' };
  }
};

// 로그아웃 함수
export const logout = (): void => {
  removeToken();
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
};

// 토큰 갱신 함수
export const refreshToken = async (): Promise<boolean> => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
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
      setToken(data.access);
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
    logout();
    throw new Error('인증이 만료되었습니다.');
  }

  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }

  return response.json();
};

// 사용자 정보 가져오기
export const getUserInfo = async (): Promise<any> => {
  return apiRequest('/api/user-info/');
};

// 관리자 전용 API 요청
export const adminApiRequest = async <T>(
  url: string, 
  options: RequestInit = {}
): Promise<T> => {
  const headers = getAuthHeaders();
  
  const response = await fetch(`${API_BASE_URL}/api/admin${url}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  if (response.status === 401) {
    logout();
    throw new Error('관리자 권한이 필요합니다.');
  }

  if (!response.ok) {
    throw new Error(`관리자 API 요청 실패: ${response.status}`);
  }

  return response.json();
};

// 관리자 대시보드 데이터 가져오기
export const getAdminDashboard = async (): Promise<any> => {
  return adminApiRequest('/dashboard/');
};

// 관리자 사용자 목록 가져오기
export const getAdminUsers = async (): Promise<any> => {
  return adminApiRequest('/users/');
};

// 관리자 통계 가져오기
export const getAdminStats = async (): Promise<any> => {
  return adminApiRequest('/stats/');
}; 