"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import "@/styles/globals.css"
import { useState } from "react"
import axios from "axios"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"
import api from "@/hooks/use-api"
import { redirect, useRouter } from "next/navigation"


export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })
  const router = useRouter();
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleLogin = async () => {
    try {
      setError(null) // Reset error
      const body = {
        email: formData["email"], 
        password: formData["password"],
      }
      const response = await api.post("/auth/login", body)
      // setSuccess(response.data.message)
      localStorage.setItem('access_token', response.data.access_token);
      router.push('/chat'); 

    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong")
      console.log(err)
    }
  }

  const handleSignup = () => {
    redirect("/register")
  }

  return (
    <div className="flex h-screen items-center justify-center">
        <Card className="w-full max-w-3xl">
        <CardHeader>
            <CardTitle className="text-3xl">Login to your account</CardTitle>
            <CardDescription>
              Don't have any account?
              <Link href="#" className="underline" prefetch={false} onClick={handleSignup}>
                  Sign up
              </Link>
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            {/* Alert khi có lỗi */}
            {error && (
              <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Login error!</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Enter your email" type="email" onChange={handleChange}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" placeholder="Enter your password" type="password" onChange={handleChange}/>
            </div>
            <Button className="w-full" onClick={handleLogin}>Log in</Button>
        </CardContent>
        </Card>
    </div>
  )
}