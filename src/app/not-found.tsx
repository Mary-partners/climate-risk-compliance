import Link from 'next/link'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <Section variant="cream">
      <div className="text-center">
        <h1 className="font-serif text-6xl font-bold text-forest-900 mb-4">
          404
        </h1>
        <p className="text-xl text-ink-700 mb-8">
          Page not found
        </p>
        <Link href="/">
          <Button variant="primary">
            Back to home
          </Button>
        </Link>
      </div>
    </Section>
  )
}
