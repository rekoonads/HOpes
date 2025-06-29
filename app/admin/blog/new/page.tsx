import { PostForm } from "@/components/admin/post-form"

export default function NewPostPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
      <PostForm />
    </div>
  )
}
