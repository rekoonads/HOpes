"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import slugify from "slugify"

export type Post = {
  id: number
  created_at: string
  published_at: string | null
  is_published: boolean
  title: string
  slug: string
  content: string | null
  excerpt: string | null
  author_name: string | null
}

// Public actions
export async function getPublishedPosts(): Promise<Post[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false })

  if (error) {
    console.error("Error fetching posts:", error)
    return []
  }
  return data
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = createClient()
  const { data, error } = await supabase.from("posts").select("*").eq("slug", slug).eq("is_published", true).single()

  if (error) {
    // It's okay if it's not found, so don't log every time
    if (error.code !== "PGRST116") {
      console.error(`Error fetching post by slug ${slug}:`, error)
    }
    return null
  }
  return data
}

// Admin actions
export async function getAllPosts(): Promise<Post[]> {
  const supabase = createClient()
  const { data, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false })
  if (error) return []
  return data
}

export async function getPostById(id: number): Promise<Post | null> {
  const supabase = createClient()
  const { data, error } = await supabase.from("posts").select("*").eq("id", id).single()
  if (error) return null
  return data
}

export async function createPost(formData: FormData) {
  const supabase = createClient()
  const title = formData.get("title") as string
  const newPost = {
    title,
    slug: slugify(title, { lower: true, strict: true }),
    content: formData.get("content") as string,
    excerpt: formData.get("excerpt") as string,
    author_name: formData.get("author_name") as string,
    is_published: formData.get("is_published") === "on",
    published_at: formData.get("is_published") === "on" ? new Date().toISOString() : null,
  }
  const { error } = await supabase.from("posts").insert(newPost)
  if (error) return { success: false, message: error.message }
  revalidatePath("/blog")
  revalidatePath("/admin/dashboard")
  return { success: true }
}

export async function updatePost(id: number, formData: FormData) {
  const supabase = createClient()
  const title = formData.get("title") as string
  const wasPublished = formData.get("was_published") === "true"
  const isPublished = formData.get("is_published") === "on"

  const updatedPost = {
    title,
    slug: slugify(title, { lower: true, strict: true }),
    content: formData.get("content") as string,
    excerpt: formData.get("excerpt") as string,
    author_name: formData.get("author_name") as string,
    is_published: isPublished,
    published_at: isPublished && !wasPublished ? new Date().toISOString() : formData.get("published_at"),
  }
  const { error } = await supabase.from("posts").update(updatedPost).eq("id", id)
  if (error) return { success: false, message: error.message }
  revalidatePath("/blog")
  revalidatePath(`/blog/${updatedPost.slug}`)
  revalidatePath("/admin/dashboard")
  return { success: true }
}

export async function deletePost(id: number) {
  const supabase = createClient()
  const { error } = await supabase.from("posts").delete().eq("id", id)
  if (error) return { success: false, message: error.message }
  revalidatePath("/blog")
  revalidatePath("/admin/dashboard")
  return { success: true }
}
