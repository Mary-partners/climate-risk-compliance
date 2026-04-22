'use client'

import { useEffect } from 'react'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Section variant="cream">
      <div className="text-center">
        <h1 className="font-serif text-4xl font-bold text-forest-900 mb-4">
          Something went wrong
        </h1>
        <p className="text-lg text-ink-700 mb-8">
          An error occurred while loading this page.
        </p>
        <Button variant="primary" onClick={reset}>
          Try again
        </Button>
      </div>
    </Section>
  )
}
