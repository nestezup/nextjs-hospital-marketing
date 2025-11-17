import { promises as fs } from 'fs';
import { join } from 'path';
import { ENV } from './_core/env';

// JSON 데이터 타입 정의
export interface JsonCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  displayOrder: number;
}

export interface JsonBlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  status: 'draft' | 'published' | 'archived';
  views: number;
  createdAt: string;
  publishedAt: string;
  tags: string[];
  metadata?: {
    category?: string;
    excerpt?: string;
    tags?: string[];
    status?: string;
  };
}

// ==================== JSON 파일 관리 ====================

// 데이터 파일 경로
const DATA_DIR = join(process.cwd(), 'data');
const BLOG_POSTS_FILE = join(DATA_DIR, 'blog-posts.json');
const CATEGORIES_FILE = join(DATA_DIR, 'categories.json');

// JSON 파일 읽기 헬퍼 함수
async function readJsonFile<T>(filePath: string): Promise<T | null> {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`[JSON] Failed to read file ${filePath}:`, error);
    return null;
  }
}

// JSON 파일 쓰기 헬퍼 함수
async function writeJsonFile<T>(filePath: string, data: T): Promise<void> {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`[JSON] Failed to write file ${filePath}:`, error);
    throw error;
  }
}
// ==================== Categories (JSON) ====================

export async function getAllCategories(): Promise<JsonCategory[]> {
  const data = await readJsonFile<{ categories: JsonCategory[] }>(CATEGORIES_FILE);
  return data?.categories || [];
}

export async function getCategoryBySlug(slug: string): Promise<JsonCategory | undefined> {
  const categories = await getAllCategories();
  return categories.find(cat => cat.slug === slug);
}

// ==================== Blog Posts (JSON) ====================

export async function getAllBlogPosts(params?: {
  status?: 'draft' | 'published' | 'archived';
  limit?: number;
  offset?: number;
}): Promise<JsonBlogPost[]> {
  const data = await readJsonFile<{ posts: JsonBlogPost[] }>(BLOG_POSTS_FILE);
  if (!data) return [];

  let posts = [...data.posts];

  // 필터링
  if (params?.status) {
    posts = posts.filter(post => post.status === params.status);
  }

  // 정렬 (publishedAt 기준 내림차순)
  posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  // 페이지네이션
  if (params?.offset) {
    posts = posts.slice(params.offset);
  }
  if (params?.limit) {
    posts = posts.slice(0, params.limit);
  }

  return posts;
}

export async function getBlogPostBySlug(slug: string): Promise<JsonBlogPost | undefined> {
  const data = await readJsonFile<{ posts: JsonBlogPost[] }>(BLOG_POSTS_FILE);
  if (!data) return undefined;

  return data.posts.find(post => post.slug === slug);
}

export async function createBlogPost(postData: Omit<JsonBlogPost, 'id' | 'createdAt' | 'publishedAt' | 'views'>): Promise<JsonBlogPost> {
  const data = await readJsonFile<{ posts: JsonBlogPost[] }>(BLOG_POSTS_FILE) || { posts: [] };

  // 새 ID 생성 (가장 큰 ID + 1)
  const maxId = Math.max(...data.posts.map(p => p.id), 0);
  const newId = maxId + 1;

  const now = new Date().toISOString();
  const newPost: JsonBlogPost = {
    ...postData,
    id: newId,
    views: 0,
    createdAt: now,
    publishedAt: now,
  };

  // 기존에 같은 슬러그가 있다면 덮어쓰기
  const existingIndex = data.posts.findIndex(p => p.slug === newPost.slug);
  if (existingIndex >= 0) {
    data.posts[existingIndex] = { ...data.posts[existingIndex], ...newPost, id: data.posts[existingIndex].id };
  } else {
    data.posts.push(newPost);
  }

  await writeJsonFile(BLOG_POSTS_FILE, data);
  return data.posts.find(p => p.slug === newPost.slug)!;
}

export async function incrementBlogViewCount(slug: string): Promise<void> {
  const data = await readJsonFile<{ posts: JsonBlogPost[] }>(BLOG_POSTS_FILE);
  if (!data) return;

  const postIndex = data.posts.findIndex(post => post.slug === slug);
  if (postIndex >= 0) {
    data.posts[postIndex].views = (data.posts[postIndex].views || 0) + 1;
    await writeJsonFile(BLOG_POSTS_FILE, data);
  }
}

// ==================== Email Logs ====================

export interface EmailLog {
  recipientEmail: string;
  recipientName?: string;
  subject: string;
  templateType: string;
  relatedId?: number;
  relatedType?: string;
  status: 'sent' | 'failed';
  errorMessage?: string;
  sentAt?: Date;
}

export async function createEmailLog(log: EmailLog): Promise<void> {
  // TODO: Implement actual email log storage
  // For now, just log to console
  console.log('[Email Log]', {
    ...log,
    timestamp: new Date().toISOString(),
  });
}
