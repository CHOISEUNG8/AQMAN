"use client"

import { createContext, useContext, useState, type ReactNode, useEffect } from "react"
import { useRouter } from "next/navigation";

interface User {
  id: string
  adminId: string // userId → adminId로 변경
  username: string // 시스템 계정명 추가
  name: string
  role: string // 관리자 권한 추가
}

interface AuthContextType {
  user: User | null
  login: (adminId: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  signup: (
    username: string,
    password: string,
    name: string,
    phone: string,
    birthDate?: string,
    gender?: string,
  ) => Promise<{ success: boolean; error?: string }>
  createAdmin: (
    adminId: string,
    password: string,
    name: string,
    role: string,
  ) => Promise<{ success: boolean; error?: string }>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  const fetchUserInfo = async (token: string): Promise<User> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
    const response = await fetch(`${apiUrl}/api/profile/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include', // if using cookies
    })
    const userData = await response.json()

    // name fallback 처리
    const getDisplayName = (userData: any) => {
      if (typeof userData.name === "string" && userData.name.trim() !== "") return userData.name;
      if (userData.first_name || userData.last_name) return `${userData.first_name || ""} ${userData.last_name || ""}`.trim();
      if (userData.username) return userData.username;
      if (userData.email) return userData.email;
      return "회원";
    };

    return {
      id: userData.id,
      adminId: userData.email || userData.username,
      username: userData.username,
      name: getDisplayName(userData),
      role: userData.role || userData.groups?.[0] || "Admin",
    }
  }

  useEffect(() => {
    setIsClient(true);
    const getTokenFromCookie = () => {
      if (typeof window === "undefined") return null;
      const match = document.cookie.match(/auth-token=([^;]+)/);
      return match ? match[1] : null;
    };
    const token = getTokenFromCookie();
    if (token && !user) {
      fetchUserInfo(token)
        .then(setUser)
        .catch(() => setUser(null));
    }
  }, []);

  if (!isClient) return null; // SSR에서는 아무것도 렌더링하지 않음

  const login = async (adminId: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
      const res = await fetch(`${apiUrl}/api/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: adminId, password }),
        credentials: 'include', // 쿠키 사용 시
      });
      if (!res.ok) {
        const text = await res.text();
        console.error('Login failed, response:', text);
        throw new Error('Login failed');
      }
      const data = await res.json();
      console.log(data); // 여기에 access_token이 있는지 확인
      document.cookie = `auth-token=${data.access_token}; path=/;`;
      setToken(data.access_token); // 토큰 상태 업데이트
      const userInfo = await fetchUserInfo(data.access_token)
      setUser(userInfo)
      return { success: true }
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, error: "네트워크 오류 또는 서버 오류" }
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null); // 토큰 상태 업데이트
    document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
  }

  const createAdmin = async (
    adminId: string,
    password: string,
    name: string,
    role: string,
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const token = document.cookie.replace(/(?:(?:^|.*;)*\s*auth-token\s*=\s*([^;]*).*$)|^.*$/, "$1")
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
      const response = await fetch(`${apiUrl}/api/admin/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ adminId, password, name, role }),
      })

      if (response.ok) {
        return { success: true }
      } else {
        const data = await response.json()
        return { success: false, error: data.error || "관리자 생성 실패" }
      }
    } catch (error) {
      console.error("Admin creation failed:", error)
      return { success: false, error: "네트워크 오류 또는 서버 오류" }
    }
  }

  const signup = async (
    username: string,
    password: string,
    name: string,
    phone: string,
    birthDate?: string,
    gender?: string,
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log('Signup request to:', 'http://127.0.0.1:8000/api/register/')
      console.log('Signup data:', { username, password, name, phone, birthDate, gender })
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
      const response = await fetch(`${apiUrl}/api/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          confirmPassword: password,
          name,
          phone,
          birth_date: birthDate,
          gender,
        }),
      })

      console.log('Response status:', response.status)
      console.log('Response headers:', response.headers)

      if (response.ok) {
        const data = await response.json()
        console.log('Signup success:', data)
        return { success: true }
      } else {
        // 응답이 JSON이 아닐 수 있으므로 text로 먼저 읽어보기
        const responseText = await response.text()
        console.log('Response text:', responseText)
        
        let errorMessage = "회원가입에 실패했습니다."
        
        try {
          const errorData = JSON.parse(responseText)
          
          // Django 백엔드의 에러 메시지를 친화적으로 변환
          if (errorData.details) {
            if (
              errorData.details.username && (
                errorData.details.username.includes('이미 존재합니다') ||
                errorData.details.username.includes('해당 사용자 이름은 이미 존재합니다.')
              )
            ) {
              errorMessage = "이미 사용 중인 아이디입니다. 다른 아이디를 입력해 주세요."
            } else if (errorData.details.phone && errorData.details.phone.includes('전화번호 형식')) {
              errorMessage = "올바른 휴대폰번호 형식을 입력해 주세요. (예: 010-1234-5678)"
            } else if (errorData.details.name && errorData.details.name.includes('이름')) {
              errorMessage = "올바른 이름 형식을 입력해 주세요."
            } else if (errorData.details.password) {
              errorMessage = "비밀번호 조건을 확인해 주세요."
            } else {
              // 기타 필드별 에러 메시지
              const fieldErrors = Object.values(errorData.details).flat()
              errorMessage = Array.isArray(fieldErrors) ? String(fieldErrors[0]) : errorMessage
            }
          } else if (errorData.error) {
            errorMessage = errorData.error
          }
        } catch (parseError) {
          console.error('Failed to parse error response as JSON:', parseError)
          errorMessage = `서버 오류 (${response.status}): ${responseText.substring(0, 100)}`
        }
        
        return { success: false, error: errorMessage }
      }
    } catch (error) {
      console.error("Signup failed:", error)
      return { success: false, error: "네트워크 오류 또는 서버 오류" }
    }
  }

  return <AuthContext.Provider value={{ user, login, logout, signup, createAdmin }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
