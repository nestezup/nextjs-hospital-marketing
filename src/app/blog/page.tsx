import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import * as db from "@/lib/db";
import { Calendar, User, ArrowRight } from "lucide-react";

export const metadata = {
  title: "블로그",
  description: "병원 마케팅 인사이트와 성공 사례를 확인하세요",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const category = params.category;
  const postsPerPage = 9;

  // 블로그 포스트 가져오기
  const allPosts = await db.getAllBlogPosts({ status: "published" });

  // 카테고리 필터링
  const filteredPosts = category
    ? allPosts.filter((post) => post.category === category)
    : allPosts;

  // 페이지네이션
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const posts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  // 카테고리 목록
  const categories = await db.getAllCategories();

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
              병원 마케팅 인사이트
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              20년 경력의 전문가가 전하는 병원 마케팅 노하우와 성공 사례
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/blog">
              <Badge
                className={`px-4 py-2 cursor-pointer transition-all duration-300 ${
                  !category
                    ? "bg-gray-800 text-white shadow-md"
                    : "bg-transparent border-2 border-gray-800 text-gray-800 hover:bg-gray-100"
                }`}
              >
                전체
              </Badge>
            </Link>
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/blog?category=${cat.slug}`}>
                <Badge
                  className={`px-4 py-2 cursor-pointer transition-all duration-300 ${
                    category === cat.slug
                      ? "bg-gray-800 text-white shadow-md"
                      : "bg-transparent border-2 border-gray-800 text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  {cat.name}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">게시글이 없습니다.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {posts.map((post) => (
                  <Link href={`/blog/${post.slug}`}>
                    <Card
                      key={post.slug}
                      className="border-2 border-transparent hover:border-primary-600 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col cursor-pointer"
                    >
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className="bg-gray-800 text-white hover:bg-gray-800/90">{post.category}</Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(post.publishedAt).toLocaleDateString("ko-KR")}
                        </div>
                      </div>
                      <CardTitle className="text-xl leading-tight line-clamp-2 text-gray-900 hover:text-gray-700 transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full group">
                          자세히 보기
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </CardFooter>
                  </Card>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                  {currentPage > 1 && (
                    <Link
                      href={`/blog?${new URLSearchParams({
                        ...(category && { category }),
                        page: String(currentPage - 1)
                      })}`}
                    >
                      <Button variant="outline">이전</Button>
                    </Link>
                  )}
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Link
                        key={page}
                        href={`/blog?${new URLSearchParams({
                          ...(category && { category }),
                          page: String(page)
                        })}`}
                      >
                        <Button
                          variant={page === currentPage ? "default" : "outline"}
                          size="sm"
                        >
                          {page}
                        </Button>
                      </Link>
                    ))}
                  </div>
                  {currentPage < totalPages && (
                    <Link
                      href={`/blog?${new URLSearchParams({
                        ...(category && { category }),
                        page: String(currentPage + 1)
                      })}`}
                    >
                      <Button variant="outline">다음</Button>
                    </Link>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              병원 마케팅에 대해 더 궁금하신가요?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              전문가와 함께 병원에 맞는 마케팅 전략을 수립하세요
            </p>
            <Link href="/consultation">
              <Button size="lg" className="text-lg font-bold px-10 py-7">
                무료 상담 신청하기
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
