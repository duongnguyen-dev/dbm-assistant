"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import "@/styles/globals.css"
import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"
import api from "@/hooks/use-api"
import { redirect, useRouter } from "next/navigation"

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER"
}

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [role, setRole] = useState<Role>(Role.ADMIN)

  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async () => {
    if (formData["password"] !== formData["confirmPassword"]) {
      setError("Password mismatch")
    } else {
      try {
        setError(null) // Reset error
        setSuccess(null) // Reset success
        const body = {
          email: formData["email"], 
          password: formData["password"],
          role: role
        }
        const response = await api.post("/auth/register", body)
        localStorage.setItem('access_token', response.data.access_token);
        // setSuccess(response.data.message)
        router.push("/chat")

      } catch (err: any) {
        setError(err.response?.data?.message || "Something went wrong")
        console.log(error)
      }
    }
  }

  const handleLogin = () => {
    redirect("/login")
  }

  return (
    <div className="flex h-screen items-center justify-center">
        <Card className="w-full max-w-3xl">
        <CardHeader>
            <CardTitle className="text-3xl">Create your account</CardTitle>
            <CardDescription>
              Already have an account?
              <Link href="#" className="underline" prefetch={false} onClick={handleLogin}>
                  Login
              </Link>
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            {/* Alert khi có lỗi */}
            {error && (
              <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Register error!!</AlertTitle>
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
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" placeholder="Enter your password" type="password" onChange={handleChange}/>
            </div>
            <Button className="w-full" onClick={handleSubmit}>Sign Up</Button>
        </CardContent>
        </Card>
    </div>
  )
}