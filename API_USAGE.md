# 블로그 API 사용 가이드

외부에서 블로그 포스트를 관리할 수 있는 REST API입니다. 모든 데이터는 `data/blog-posts.json` 파일에 저장됩니다.

## API 엔드포인트

### 1. 블로그 포스트 생성

**POST** `/api/blog`

새로운 블로그 포스트를 생성합니다.

#### 요청 예시

```bash
curl -X POST http://localhost:3000/api/blog \
  -H "Content-Type: application/json" \
  -d '{
    "title": "병원 마케팅 트렌드 2024",
    "excerpt": "2024년 병원 마케팅의 주요 트렌드를 소개합니다.",
    "content": "<h2>병원 마케팅의 새로운 패러다임</h2><p>디지털 시대에 맞는 병원 마케팅 전략...</p>",
    "author": "이엠마케팅",
    "category": "마케팅 전략",
    "tags": ["병원마케팅", "디지털마케팅", "트렌드"],
    "status": "published"
  }'
```

#### 응답 예시

```json
{
  "success": true,
  "data": {
    "slug": "병원-마케팅-트렌드-2024--1234567890",
    "title": "병원 마케팅 트렌드 2024",
    "excerpt": "2024년 병원 마케팅의 주요 트렌드를 소개합니다.",
    "content": "<h2>병원 마케팅의 새로운 패러다임</h2><p>디지털 시대에 맞는 병원 마케팅 전략...</p>",
    "author": "이엠마케팅",
    "category": "마케팅 전략",
    "tags": ["병원마케팅", "디지털마케팅", "트렌드"],
    "status": "published",
    "publishedAt": "2024-01-15T00:00:00.000Z",
    "views": 0
  },
  "message": "Blog post created successfully"
}
```

### 2. 모든 블로그 포스트 조회

**GET** `/api/blog`

모든 블로그 포스트를 조회합니다.

#### 요청 예시

```bash
# 전체 조회
curl http://localhost:3000/api/blog

# published 상태만 조회
curl http://localhost:3000/api/blog?status=published

# 특정 카테고리만 조회
curl "http://localhost:3000/api/blog?category=마케팅 전략"

# 조건 조합
curl "http://localhost:3000/api/blog?status=published&category=마케팅 전략"
```

#### 응답 예시

```json
{
  "success": true,
  "data": [
    {
      "slug": "병원-마케팅-트렌드-2024--1234567890",
      "title": "병원 마케팅 트렌드 2024",
      "excerpt": "2024년 병원 마케팅의 주요 트렌드를 소개합니다.",
      "content": "...",
      "author": "이엠마케팅",
      "category": "마케팅 전략",
      "tags": ["병원마케팅", "디지털마케팅", "트렌드"],
      "status": "published",
      "publishedAt": "2024-01-15T00:00:00.000Z",
      "views": 123
    }
  ],
  "count": 1
}
```

### 3. 특정 블로그 포스트 조회

**GET** `/api/blog/[slug]`

특정 블로그 포스트를 조회합니다.

#### 요청 예시

```bash
curl http://localhost:3000/api/blog/병원-마케팅-트렌드-2024--1234567890
```

#### 응답 예시

```json
{
  "success": true,
  "data": {
    "slug": "병원-마케팅-트렌드-2024--1234567890",
    "title": "병원 마케팅 트렌드 2024",
    "excerpt": "2024년 병원 마케팅의 주요 트렌드를 소개합니다.",
    "content": "...",
    "author": "이엠마케팅",
    "category": "마케팅 전략",
    "tags": ["병원마케팅", "디지털마케팅", "트렌드"],
    "status": "published",
    "publishedAt": "2024-01-15T00:00:00.000Z",
    "views": 123
  }
}
```

### 4. 블로그 포스트 수정

**PUT** `/api/blog`

기존 블로그 포스트를 수정합니다.

#### 요청 예시

```bash
curl -X PUT http://localhost:3000/api/blog \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "병원-마케팅-트렌드-2024--1234567890",
    "title": "병원 마케팅 트렌드 2024 (업데이트)",
    "content": "<h2>업데이트된 내용</h2><p>...</p>"
  }'
```

#### 응답 예시

```json
{
  "success": true,
  "data": {
    "slug": "병원-마케팅-트렌드-2024--1234567890",
    "title": "병원 마케팅 트렌드 2024 (업데이트)",
    "excerpt": "2024년 병원 마케팅의 주요 트렌드를 소개합니다.",
    "content": "<h2>업데이트된 내용</h2><p>...</p>",
    "author": "이엠마케팅",
    "category": "마케팅 전략",
    "tags": ["병원마케팅", "디지털마케팅", "트렌드"],
    "status": "published",
    "publishedAt": "2024-01-15T00:00:00.000Z",
    "views": 123
  },
  "message": "Blog post updated successfully"
}
```

### 5. 조회수 증가

**PATCH** `/api/blog/[slug]`

특정 블로그 포스트의 조회수를 1 증가시킵니다.

#### 요청 예시

```bash
curl -X PATCH http://localhost:3000/api/blog/병원-마케팅-트렌드-2024--1234567890
```

#### 응답 예시

```json
{
  "success": true,
  "data": {
    "slug": "병원-마케팅-트렌드-2024--1234567890",
    "title": "병원 마케팅 트렌드 2024",
    "views": 124
  },
  "message": "View count incremented"
}
```

### 6. 블로그 포스트 삭제

**DELETE** `/api/blog?slug=[slug]`

특정 블로그 포스트를 삭제합니다.

#### 요청 예시

```bash
curl -X DELETE "http://localhost:3000/api/blog?slug=병원-마케팅-트렌드-2024--1234567890"
```

#### 응답 예시

```json
{
  "success": true,
  "data": {
    "slug": "병원-마케팅-트렌드-2024--1234567890",
    "title": "병원 마케팅 트렌드 2024"
  },
  "message": "Blog post deleted successfully"
}
```

## 필드 설명

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `title` | string | ✅ | 블로그 포스트 제목 |
| `excerpt` | string | ✅ | 요약 내용 (미리보기에 표시) |
| `content` | string | ✅ | HTML 형식의 본문 내용 |
| `author` | string | ✅ | 작성자 이름 |
| `category` | string | ✅ | 카테고리 (예: "마케팅 전략", "성공 사례") |
| `tags` | string[] | ❌ | 태그 배열 |
| `status` | 'draft' \| 'published' | ❌ | 상태 (기본값: 'draft') |
| `slug` | string | ❌ | URL 경로 (자동 생성) |
| `publishedAt` | string | ❌ | 발행일 (ISO 8601 형식, 기본값: 현재 시간) |
| `views` | number | ❌ | 조회수 (자동 관리) |

## 데이터 저장 위치

모든 블로그 포스트는 `data/blog-posts.json` 파일에 JSON 배열 형태로 저장됩니다.

```json
[
  {
    "slug": "post-1--1234567890",
    "title": "첫 번째 포스트",
    "excerpt": "...",
    "content": "...",
    "author": "이엠마케팅",
    "category": "마케팅 전략",
    "tags": ["마케팅"],
    "status": "published",
    "publishedAt": "2024-01-15T00:00:00.000Z",
    "views": 0
  },
  {
    "slug": "post-2--1234567891",
    "title": "두 번째 포스트",
    "excerpt": "...",
    "content": "...",
    "author": "이엠마케팅",
    "category": "성공 사례",
    "tags": ["사례"],
    "status": "published",
    "publishedAt": "2024-01-16T00:00:00.000Z",
    "views": 0
  }
]
```

## 에러 응답

API에서 에러가 발생하면 다음과 같은 형식으로 응답합니다:

```json
{
  "success": false,
  "error": "에러 메시지"
}
```

### 일반적인 에러 코드

- `400` - 잘못된 요청 (필수 필드 누락 등)
- `404` - 리소스를 찾을 수 없음
- `500` - 서버 내부 에러

## 외부 시스템 연동 예시

### Node.js

```javascript
const axios = require('axios');

async function createBlogPost() {
  try {
    const response = await axios.post('http://localhost:3000/api/blog', {
      title: '병원 마케팅 가이드',
      excerpt: '효과적인 병원 마케팅 전략을 소개합니다.',
      content: '<p>본문 내용...</p>',
      author: '이엠마케팅',
      category: '마케팅 전략',
      tags: ['가이드', '전략'],
      status: 'published'
    });

    console.log('포스트 생성 성공:', response.data);
  } catch (error) {
    console.error('에러:', error.response.data);
  }
}
```

### Python

```python
import requests

def create_blog_post():
    url = 'http://localhost:3000/api/blog'
    data = {
        'title': '병원 마케팅 가이드',
        'excerpt': '효과적인 병원 마케팅 전략을 소개합니다.',
        'content': '<p>본문 내용...</p>',
        'author': '이엠마케팅',
        'category': '마케팅 전략',
        'tags': ['가이드', '전략'],
        'status': 'published'
    }

    response = requests.post(url, json=data)

    if response.status_code == 201:
        print('포스트 생성 성공:', response.json())
    else:
        print('에러:', response.json())
```

## 보안 고려사항

프로덕션 환경에서는 다음 사항을 고려해야 합니다:

1. **API 인증**: API 키 또는 JWT 토큰을 사용한 인증 추가
2. **Rate Limiting**: 요청 횟수 제한
3. **입력 검증**: XSS 공격 방지를 위한 HTML 새니타이제이션
4. **CORS 설정**: 허용된 도메인만 API 호출 가능하도록 설정
