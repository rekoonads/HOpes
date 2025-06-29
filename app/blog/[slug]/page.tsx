import { getPostBySlug } from "@/lib/blog-actions"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { MotionWrapper } from "@/components/motion-wrapper"

type Props = {
  params: { slug: string }
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: Props) {
  const post = await getPostBySlug(params.slug)
  if (!post) {
    return {
      title: "Post Not Found",
    }
  }
  return {
    title: `${post.title} | Hopes Industrial Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.published_at,
      authors: [post.author_name || "Hopes Industrial Solutions"],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.published_at,
    author: {
      "@type": "Organization",
      name: post.author_name || "Hopes Industrial Solutions",
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <MotionWrapper>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-center">{post.title}</h1>
            <div className="text-center text-muted-foreground mb-8">
              <span>By {post.author_name || "Hopes Industrial"}</span>
              <span className="mx-2">&bull;</span>
              <span>{new Date(post.published_at!).toLocaleDateString()}</span>
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.2}>
            <div
              className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-bold prose-a:text-primary hover:prose-a:underline"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
            </div>
          </MotionWrapper>
        </div>
      </article>
    </>
  )
}
