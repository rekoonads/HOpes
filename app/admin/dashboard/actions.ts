"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function deleteInquiry(id: number) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, message: "Authentication required." }
  }

  const { error } = await supabase.from("inquiries").delete().match({ id })

  if (error) {
    console.error("Delete error:", error)
    return { success: false, message: "Database error." }
  }

  revalidatePath("/admin/dashboard")
  return { success: true }
}
