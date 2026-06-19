import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/50 backdrop-blur-md">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
          Animal Feedback
        </Link>
        <nav className="space-x-6">
          <Link href="/" className="text-sm font-medium text-slate-300 hover:text-white transition">Home</Link>
          <Link href="/submit" className="text-sm font-medium text-slate-300 hover:text-white transition">Submit</Link>
        </nav>
      </div>
    </header>
  )
}
