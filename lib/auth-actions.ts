"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function login(prevState: any, formData: FormData) {
  const supabase = createClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { message: error.message }
  }

  revalidatePath("/admin/dashboard", "layout")
  redirect("/admin/dashboard")
}

export async function logout() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect("/admin/login")
}
