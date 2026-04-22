import { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'Resources — Climate Risk & ESG Reporting Insights',
  description: 'Expert insights on climate risk, ESG reporting, TCFD, IFRS S1/S2, and regulatory compliance for financial institutions in Kenya and beyond.',
  openGraph: {
    title: 'Resources — Climate Risk & ESG Reporting Insights',
    description: 'Expert insights on climate risk, ESG reporting, TCFD, IFRS S1/S2, and regulatory compliance for financial institutions in Kenya and beyond.',
    type: 'website',
    url: 'https://climate-risk-compliance.com/resources',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resources — Climate Risk & ESG Reporting Insights',
    description: 'Expert insights on climate risk, ESG reporting, TCFD, IFRS S1/S2, and regulatory compliance for financial institutions in Kenya and beyond.',
    images: ['/og-image.png'],
  },
}

interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  author: string
  category: string
}

function getPosts(): Post[] {
  const contentDir = path.join(process.cwd(), 'src/content/resources')
  const files = fs.readdirSync(contentDir)
  
  const posts = files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '')
      const filePath = path.join(contentDir, file)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)
      
      return {
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        author: data.author,
        category: data.category,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  return posts
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

export default function ResourcesPage() {
  const posts = getPosts()
  
  return (
    <main>
      <Section>
        <SectionHeader
          eyebrow="Insights & Analysis"
          title="Resources"
          description="Expert insights on climate risk disclosure, ESG reporting, regulatory compliance, and green finance for Kenya's financial institutions."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {posts.map((post) => (
            <Link key={post.slug} href={`/resources/${post.slug}`}>
              <Card className="h-full hover:scale-[1.02] cursor-pointer">
                <div className="flex flex-col gap-3">
                  <Badge variant={getCategoryVariant(post.category)}>
                    {post.category}
                  </Badge>
                  <h3 className="text-xl font-serif font-bold text-ink-950 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-sm text-ink-600">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-ink-700 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto pt-4">
                    <span className="text-sm font-medium text-forest-600 hover:text-forest-700">
                      Read more →
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </main>
  )
}
