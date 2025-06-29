"use client"

import { useActionState } from "react"
import { login } from "@/lib/auth-actions"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Factory } from "lucide-react"

const initialState = { message: "" }

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(login, initialState)

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <Factory className="mx-auto h-8 w-8" />
          <CardTitle className="mt-2 text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription>Hopes Industrial Solutions</CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="admin@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Signing In..." : "Sign In"}
            </Button>
            {state?.message && <p className="mt-4 text-sm text-red-500">{state.message}</p>}
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
