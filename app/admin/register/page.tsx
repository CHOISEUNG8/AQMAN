"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

const adminRoles = [
  { value: "Admin", label: "최고관리자" },
  { value: "Product", label: "상품 관리자" },
  { value: "Order", label: "주문 관리자" },
  { value: "Member", label: "회원 관리자" },
  { value: "Marketing", label: "마케팅 관리자" },
  { value: "Support", label: "고객센터 담당자" },
]

export default function AdminRegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "Admin",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError("")
  }

  const handleRoleChange = (value: string) => {
    setForm({ ...form, role: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.username || !form.password || !form.confirmPassword) {
      setError("모든 항목을 입력해주세요.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/admin/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          username: form.username,
          password: form.password,
          role: form.role,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess("관리자 계정이 성공적으로 생성되었습니다.");
        setTimeout(() => {
          router.push("/admin");
        }, 1500);
      } else {
        setError(data.error || "회원가입에 실패했습니다.");
      }
    } catch (err) {
      setError("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>관리자 회원가입</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">이름</label>
              <Input name="name" value={form.name} onChange={handleChange} autoComplete="off" />
            </div>
            <div>
              <label className="block mb-1 font-medium">아이디</label>
              <Input name="username" value={form.username} onChange={handleChange} autoComplete="off" />
            </div>
            <div>
              <label className="block mb-1 font-medium">비밀번호</label>
              <Input name="password" type="password" value={form.password} onChange={handleChange} autoComplete="new-password" />
            </div>
            <div>
              <label className="block mb-1 font-medium">비밀번호 확인</label>
              <Input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} autoComplete="new-password" />
            </div>
            <div>
              <label className="block mb-1 font-medium">권한</label>
              <Select value={form.role} onValueChange={handleRoleChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {adminRoles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {success && <div className="text-green-600 text-sm">{success}</div>}
            <Button type="submit" className="w-full" style={{ backgroundColor: "#ff8c00", color: "white" }}>회원가입</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 