import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-bold">
          Animal Feedback
        </Link>
        <nav className="space-x-4">
          <Link href="/" className="text-sm text-gray-600">Home</Link>
          <Link href="/submit" className="text-sm text-gray-600">Submit</Link>
        </nav>
      </div>
    </header>
  )
}
