export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-100">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-forest-700 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-ink-600 text-sm">Loading...</p>
      </div>
    </div>
  )
}
