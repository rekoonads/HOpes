"use client"

import { useRouter } from "next/navigation"
import { useActionState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { createPost, updatePost, type Post } from "@/lib/blog-actions"

const initialState = { success: false, message: "" }

export function PostForm({ post }: { post?: Post }) {
  const router = useRouter()
  const { toast } = useToast()
  const [state, formAction, isPending] = useActionState(
    post ? updatePost.bind(null, post.id) : createPost,
    initialState,
  )

  if (state.success) {
    toast({ title: "Success!", description: `Post ${post ? "updated" : "created"} successfully.` })
    router.push("/admin/dashboard")
    // Reset state or handle redirect better if needed
  } else if (state.message) {
    toast({ title: "Error", description: state.message, variant: "destructive" })
  }

  return (
    <form action={formAction}>
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Post Title</Label>
            <Input id="title" name="title" defaultValue={post?.title} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content (Markdown)</Label>
            <Textarea id="content" name="content" defaultValue={post?.content || ""} rows={15} />
            <p className="text-sm text-muted-foreground">Supports GitHub Flavored Markdown for formatting.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Input
              id="excerpt"
              name="excerpt"
              defaultValue={post?.excerpt || ""}
              placeholder="A short summary for the blog list page"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="author_name">Author Name</Label>
            <Input
              id="author_name"
              name="author_name"
              defaultValue={post?.author_name || "Hopes Industrial Solutions"}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="is_published" name="is_published" defaultChecked={post?.is_published} />
            <Label htmlFor="is_published">Publish Post</Label>
          </div>
          <input type="hidden" name="was_published" value={String(post?.is_published)} />
          <input type="hidden" name="published_at" value={post?.published_at || ""} />
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : post ? "Update Post" : "Create Post"}
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}
