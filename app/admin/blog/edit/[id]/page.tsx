import { PostForm } from "@/components/admin/post-form"
import { getPostById } from "@/lib/blog-actions"
import { notFound } from "next/navigation"

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const post = await getPostById(Number(params.id))
  if (!post) {
    notFound()
  }
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
      <PostForm post={post} />
    </div>
  )
}
