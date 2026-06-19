export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/50 backdrop-blur-md mt-auto">
      <div className="container py-6 text-sm text-slate-500 text-center">© {new Date().getFullYear()} Animal Feedback. All rights reserved.</div>
    </footer>
  )
}
