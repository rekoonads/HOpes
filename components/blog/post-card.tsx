import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import type { Post } from "@/lib/blog-actions"

export function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <Card className="h-full flex flex-col transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
        <CardHeader>
          <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">{post.title}</CardTitle>
          <CardDescription>{new Date(post.published_at!).toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground">{post.excerpt}</p>
        </CardContent>
        <CardFooter>
          <span className="font-semibold text-primary">Read More &rarr;</span>
        </CardFooter>
      </Card>
    </Link>
  )
}
