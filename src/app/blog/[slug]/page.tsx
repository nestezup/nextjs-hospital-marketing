import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import * as db from "@/lib/db";
import { Calendar, User, Eye, ArrowLeft } from "lucide-react";
import ShareButton from "@/components/ShareButton";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await db.getAllBlogPosts({ status: "published" });
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await db.getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "게시글을 찾을 수 없습니다",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await db.getBlogPostBySlug(slug);

  if (!post || post.status !== "published") {
    notFound();
  }

  // 조회수 증가
  await db.incrementBlogViewCount(slug);

  // 관련 포스트 가져오기 (같은 카테고리)
  const relatedPosts = (await db.getAllBlogPosts({ status: "published" }))
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Back Button */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/blog">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              목록으로 돌아가기
            </Button>
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge variant="secondary">{post.category}</Badge>
              <div className="flex items-center text-sm text-muted-foreground gap-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.publishedAt).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {post.author}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {post.views.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Share Button */}
            <div className="flex gap-2 mb-12 pb-8 border-b">
              <ShareButton
                title={post.title}
                text={post.excerpt}
                url={`${process.env.NEXT_PUBLIC_BASE_URL || ''}/blog/${post.slug}`}
              />
            </div>

            {/* Content */}
            <div
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Author Card */}
            <Card className="mb-12">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{post.author}</h3>
                    <p className="text-muted-foreground">
                      20년 경력의 병원 마케팅 전문가. 100개 이상의 병원 성장을 도왔습니다.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">관련 글</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((related) => (
                    <Link key={related.slug} href={`/blog/${related.slug}`}>
                      <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                        <CardContent className="p-6">
                          <Badge variant="secondary" className="mb-3">
                            {related.category}
                          </Badge>
                          <h3 className="font-bold mb-2 line-clamp-2">
                            {related.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {related.excerpt}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              병원 마케팅 전략이 필요하신가요?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              전문가와 함께 병원에 맞는 맞춤형 마케팅 전략을 수립하세요
            </p>
            <Link href="/consultation">
              <Button size="lg" className="text-lg text-white font-bold px-10 py-7 bg-primary-600 hover:bg-primary-700 shadow-2xl hover:shadow-primary-600/50 hover:scale-105 transition-all duration-300">
                무료 상담 신청하기
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
