import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// 블로그 포스트 타입 정의
interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags?: string[];
  status: 'draft' | 'published';
  publishedAt: string;
  views: number;
}

// 데이터 파일 경로
const DATA_DIR = path.join(process.cwd(), 'data');
const BLOG_FILE = path.join(DATA_DIR, 'blog-posts.json');

// 블로그 포스트 읽기
async function readBlogPosts(): Promise<BlogPost[]> {
  if (!existsSync(BLOG_FILE)) {
    return [];
  }
  const data = await readFile(BLOG_FILE, 'utf-8');
  return JSON.parse(data);
}

// 블로그 포스트 저장
async function saveBlogPosts(posts: BlogPost[]): Promise<void> {
  await writeFile(BLOG_FILE, JSON.stringify(posts, null, 2), 'utf-8');
}

// GET: 특정 블로그 포스트 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const posts = await readBlogPosts();
    const post = posts.find(p => p.slug === slug);

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('Error reading blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to read blog post' },
      { status: 500 }
    );
  }
}

// PATCH: 조회수 증가
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const posts = await readBlogPosts();
    const index = posts.findIndex(p => p.slug === slug);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // 조회수 증가
    posts[index].views += 1;
    await saveBlogPosts(posts);

    return NextResponse.json({
      success: true,
      data: posts[index],
      message: 'View count incremented'
    });
  } catch (error) {
    console.error('Error updating view count:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update view count' },
      { status: 500 }
    );
  }
}
