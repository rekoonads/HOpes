import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { InquiriesTable } from "@/components/admin/inquiries-table"
import { Button } from "@/components/ui/button"
import { logout } from "@/lib/auth-actions"
import { Factory } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PostsManager } from "@/components/admin/posts-manager"
import { getAllPosts } from "@/lib/blog-actions"

export default async function AdminDashboard() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data: inquiries } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false })
  const posts = await getAllPosts()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      <header className="bg-white dark:bg-neutral-800 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Factory className="h-6 w-6 mr-2" />
              <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            </div>
            <form action={logout}>
              <Button variant="outline" type="submit">
                Logout
              </Button>
            </form>
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <Tabs defaultValue="inquiries">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            <TabsTrigger value="posts">Blog Posts</TabsTrigger>
          </TabsList>
          <TabsContent value="inquiries" className="mt-6">
            <h2 className="text-2xl font-bold mb-6">Submitted Inquiries</h2>
            <InquiriesTable inquiries={inquiries || []} />
          </TabsContent>
          <TabsContent value="posts" className="mt-6">
            <h2 className="text-2xl font-bold mb-6">Manage Blog Posts</h2>
            <PostsManager posts={posts} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
