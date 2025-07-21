"use client"

import { useEffect, useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "./contexts/auth-context"
import AdminLayoutWrapper from "@/components/layout/admin-layout-wrapper"

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <AuthProvider>
        <AdminLayoutWrapper>
          {children}
        </AdminLayoutWrapper>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  )
} 