import { getPublishedPosts } from "@/lib/blog-actions"
import { PostCard } from "@/components/blog/post-card"
import { MotionWrapper } from "@/components/motion-wrapper"

export const metadata = {
  title: "Blog | Hopes Industrial Solutions",
  description: "Insights, news, and articles on industrial solutions and manufacturing.",
}

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts()

  return (
    <div className="bg-gray-50 dark:bg-gray-950 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <MotionWrapper>
          <h1 className="text-4xl font-extrabold text-center mb-4">From the Blog</h1>
          <p className="text-lg text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Insights, news, and articles on industrial solutions, manufacturing, and technology from our team of
            experts.
          </p>
        </MotionWrapper>

        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <MotionWrapper key={post.id} delay={index * 0.1}>
                <PostCard post={post} />
              </MotionWrapper>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground mt-16">No posts published yet. Check back soon!</p>
        )}
      </div>
    </div>
  )
}
