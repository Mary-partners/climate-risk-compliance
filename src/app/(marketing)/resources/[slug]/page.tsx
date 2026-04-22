import { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'

interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  author: string
  category: string
  content: string
}

function getPost(slug: string): Post | null {
  try {
    const contentDir = path.join(process.cwd(), 'src/content/resources')
    const filePath = path.join(contentDir, `${slug}.md`)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      author: data.author,
      category: data.category,
      content,
    }
  } catch {
    return null
  }
}

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'src/content/resources')
  const files = fs.readdirSync(contentDir)
  
  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => ({
      slug: file.replace(/\.md$/, ''),
    }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPost(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }
  
  return {
    title: `${post.title} — Climate Risk Platform`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://climate-risk-compliance.com/resources/${post.slug}`,
      images: ['/og-image.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: ['/og-image.png'],
    },
  }
}

function getCategoryVariant(category: string): 'neutral' | 'success' | 'warning' | 'info' {
  const variants: Record<string, 'neutral' | 'success' | 'warning' | 'info'> = {
    Regulatory: 'warning',
    Standards: 'info',
    'Green Finance': 'success',
    Data: 'neutral',
    SACCOs: 'info',
    Insurance: 'neutral',
    Technical: 'neutral',
  }
  return variants[category] || 'neutral'
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  
  if (!post) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-serif font-bold text-ink-950 mb-4">Post Not Found</h1>
        <p className="text-ink-700 mb-6">The post you're looking for doesn't exist.</p>
        <Link href="/resources" className="text-forest-600 hover:text-forest-700 font-medium">
          ← Back to Resources
        </Link>
      </main>
    )
  }
  
  const contentHtml = await markdownToHtml(post.content)
  
  return (
    <main className="bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link 
          href="/resources" 
          className="inline-flex items-center text-sm text-forest-600 hover:text-forest-700 font-medium mb-8"
        >
          ← Back to Resources
        </Link>
        
        <article>
          <header className="mb-12">
            <Badge variant={getCategoryVariant(post.category)} className="mb-4">
              {post.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-ink-950 mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-ink-600">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>•</span>
              <span>{post.author}</span>
            </div>
          </header>
          
          <div 
            className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:text-ink-950 prose-p:text-ink-700 prose-p:leading-relaxed prose-a:text-forest-600 prose-a:no-underline hover:prose-a:text-forest-700 prose-strong:text-ink-950 prose-strong:font-semibold prose-ul:text-ink-700 prose-ol:text-ink-700 prose-li:my-1"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </article>
        
        <div className="mt-16 pt-8 border-t border-ink-200">
          <Link 
            href="/resources" 
            className="inline-flex items-center text-forest-600 hover:text-forest-700 font-medium"
          >
            ← Back to Resources
          </Link>
        </div>
      </div>
    </main>
  )
}
