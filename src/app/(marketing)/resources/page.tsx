import { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import Section from '@/components/ui/Section'
import Reveal from '@/components/home/Reveal'
import PageHero from '@/components/inner/PageHero'
import PageCTA from '@/components/inner/PageCTA'

export const metadata: Metadata = {
  title: 'Insights — Kenya Climate Risk, Green Finance & Disclosure | C&E',
  description:
    'Analysis of the regulations, deadlines, and market shifts reshaping climate risk, green finance, and ESG disclosure across Kenya’s financial sector — from the CBK Green Finance Taxonomy and IFRS S2 to the Disaster Risk Financing Strategy 2026–2030.',
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

  return files
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
}

export default function ResourcesPage() {
  const posts = getPosts()

  return (
    <main>
      <PageHero
        eyebrow="Insights"
        title="Where Kenya's climate risk and green finance rules are heading — and what they mean for your institution"
        lead="The regulations, deadlines, and market shifts reshaping climate and ESG in Kenya move quickly. We follow them closely — the CBK Green Finance Taxonomy, IFRS S2, the Disaster Risk Financing Strategy 2026–2030 — and write about what each one changes for banks, SACCOs, insurers, listed companies, and the businesses they finance."
        points={[
          { icon: 'bank', text: 'What the CBK Green Finance Taxonomy asks of banks' },
          { icon: 'alert', text: 'The Disaster Risk Financing Strategy 2026–2030' },
          { icon: 'scale', text: 'IFRS S2 and the 2028 and 2030 assurance deadlines' },
          { icon: 'trending', text: 'How climate risk turns into credit risk' },
        ]}
      />

      <Section variant="default">
        <Reveal>
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-end mb-12">
            <div className="lg:col-span-7">
              <div className="text-xs uppercase tracking-wider font-semibold text-gold-600 mb-3">
                Insights &amp; analysis
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-ink-950 leading-tight">
                Latest articles
              </h2>
            </div>
            <p className="lg:col-span-5 text-ink-600 leading-relaxed">
              Regular reading on the climate risk, green finance, and disclosure landscape shaping
              Kenya&rsquo;s financial sector.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 70} className="h-full">
              <Link href={`/resources/${post.slug}`} className="group block h-full">
                <article className="flex h-full flex-col rounded-xl border border-ink-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-gold-400">
                  <span className="inline-flex self-start items-center rounded-full bg-navy-50 text-navy-700 px-3 py-1 text-xs font-semibold mb-4">
                    {post.category}
                  </span>
                  <h3 className="text-lg font-bold font-serif text-navy-900 leading-tight mb-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-ink-500 mb-3">
                    {new Date(post.date).toLocaleDateString('en-GB', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-sm text-ink-700 leading-relaxed">{post.excerpt}</p>
                  <span className="mt-auto pt-4 text-sm font-semibold text-navy-800 group-hover:text-navy-900">
                    Read more →
                  </span>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <PageCTA
        title="Turn guidance into a practical plan for your institution"
        body="Start with a readiness diagnostic to see where you stand, or speak with our team about how these requirements apply to you."
      />
    </main>
  )
}
