import HomeGallery from '../components/HomeGallery'

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 p-10 text-white shadow-xl">
        <div className="container mx-auto grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">Wildlife feedback hub</p>
            <h1 className="text-5xl font-semibold leading-tight">Discover animals and share your honest feedback.</h1>
            <p className="max-w-2xl text-lg text-slate-200">
              Browse a beautiful gallery of wildlife species, click your favorite animal, and add feedback instantly to help the community learn from your observations.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="/" className="rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white shadow-sm backdrop-blur transition hover:bg-white/20">Browse animals</a>
              <a href="/submit" className="rounded-2xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-400">Submit generic feedback</a>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl overflow-hidden bg-white/10 p-4 shadow-xl backdrop-blur-lg">
              <img src="https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&w=900&q=80" alt="Panda" className="h-48 w-full object-cover" />
            </div>
            <div className="rounded-3xl overflow-hidden bg-white/10 p-4 shadow-xl backdrop-blur-lg">
              <img src="https://images.unsplash.com/photo-1511974035430-5de47d3b95da?auto=format&fit=crop&w=900&q=80" alt="Tiger" className="h-48 w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <HomeGallery />
    </div>
  )
}
