import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
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

// 데이터 디렉토리 경로
const DATA_DIR = path.join(process.cwd(), 'data');
const BLOG_FILE = path.join(DATA_DIR, 'blog-posts.json');

// 데이터 디렉토리 초기화
async function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }

  if (!existsSync(BLOG_FILE)) {
    await writeFile(BLOG_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

// 블로그 포스트 읽기
async function readBlogPosts(): Promise<BlogPost[]> {
  await ensureDataDir();
  const data = await readFile(BLOG_FILE, 'utf-8');
  const parsed = JSON.parse(data);

  // 데이터가 { posts: [...] } 형태인지 확인
  if (parsed.posts && Array.isArray(parsed.posts)) {
    return parsed.posts;
  }

  // 데이터가 배열 형태인 경우
  if (Array.isArray(parsed)) {
    return parsed;
  }

  // 그 외의 경우 빈 배열 반환
  return [];
}

// 블로그 포스트 저장
async function saveBlogPosts(posts: BlogPost[]): Promise<void> {
  await ensureDataDir();

  // 현재 데이터 구조 확인
  const currentData = await readFile(BLOG_FILE, 'utf-8');
  const parsed = JSON.parse(currentData);

  // 기존 데이터가 { posts: [...] } 형태인 경우
  if (parsed.posts && Array.isArray(parsed.posts)) {
    parsed.posts = posts;
    await writeFile(BLOG_FILE, JSON.stringify(parsed, null, 2), 'utf-8');
  } else {
    // 배열 형태로 저장
    await writeFile(BLOG_FILE, JSON.stringify(posts, null, 2), 'utf-8');
  }
}

// GET: 모든 블로그 포스트 조회
export async function GET(request: NextRequest) {
  try {
    const posts = await readBlogPosts();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');

    let filteredPosts = posts;

    // 상태별 필터링
    if (status) {
      filteredPosts = filteredPosts.filter(post => post.status === status);
    }

    // 카테고리별 필터링
    if (category) {
      filteredPosts = filteredPosts.filter(post => post.category === category);
    }

    // 최신순 정렬
    filteredPosts.sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return NextResponse.json({
      success: true,
      data: filteredPosts,
      count: filteredPosts.length
    });
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to read blog posts' },
      { status: 500 }
    );
  }
}

// POST: 새 블로그 포스트 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 필수 필드 검증
    const requiredFields = ['title', 'excerpt', 'content', 'author', 'category'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const posts = await readBlogPosts();

    // slug 생성 (제목 기반 + 타임스탬프) - 영문만 사용
    const slug = body.slug || (() => {
      // 한글 제목을 영문 슬러그로 변환
      const koreanToEnglishMap: { [key: string]: string } = {
        '소아과': 'pediatrics',
        '가을철': 'autumn',
        '아이': 'children',
        '독감': 'flu',
        '예방': 'prevention',
        '가이드': 'guide',
        '안과': 'ophthalmology',
        '농내장': 'glaucoma',
        '관리': 'management',
        '마케팅': 'marketing',
        '병원': 'hospital',
        '전문': 'expert',
        '완벽': 'perfect',
        '알려주는': 'tips',
        '관한': 'about',
        '주제': 'topic'
      };

      let englishSlug = body.title;
      // 한글 키워드를 영문으로 변환
      Object.entries(koreanToEnglishMap).forEach(([korean, english]) => {
        englishSlug = englishSlug.replace(new RegExp(korean, 'g'), english);
      });

      // 남은 문자들 처리 (영문, 숫자, 공백만 남기기)
      return englishSlug
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '') || `post-${Date.now()}`;
    })() + `--${Date.now()}`;

    // 새 블로그 포스트 생성
    const newPost: BlogPost = {
      slug,
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      author: body.author,
      category: body.category,
      tags: body.tags || [],
      status: body.status || 'draft',
      publishedAt: body.publishedAt || new Date().toISOString(),
      views: 0
    };

    // 포스트 추가
    posts.push(newPost);
    await saveBlogPosts(posts);

    return NextResponse.json({
      success: true,
      data: newPost,
      message: 'Blog post created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}

// PUT: 블로그 포스트 업데이트
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.slug) {
      return NextResponse.json(
        { success: false, error: 'Missing slug' },
        { status: 400 }
      );
    }

    const posts = await readBlogPosts();
    const index = posts.findIndex(p => p.slug === body.slug);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // 포스트 업데이트
    posts[index] = {
      ...posts[index],
      ...body,
      slug: posts[index].slug, // slug는 변경 불가
    };

    await saveBlogPosts(posts);

    return NextResponse.json({
      success: true,
      data: posts[index],
      message: 'Blog post updated successfully'
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

// DELETE: 블로그 포스트 삭제
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Missing slug' },
        { status: 400 }
      );
    }

    const posts = await readBlogPosts();
    const index = posts.findIndex(p => p.slug === slug);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // 포스트 삭제
    const deletedPost = posts.splice(index, 1)[0];
    await saveBlogPosts(posts);

    return NextResponse.json({
      success: true,
      data: deletedPost,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
