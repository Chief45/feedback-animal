import HomeGallery from '../components/HomeGallery'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="space-y-10"
    >
      <section className="relative overflow-hidden rounded-[2.5rem] bg-slate-900/40 p-10 text-white shadow-2xl backdrop-blur-xl border border-white/10 group">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition duration-700"></div>
        <div className="container relative z-10 mx-auto grid gap-8 lg:grid-cols-2 lg:items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-indigo-400 font-semibold">Wildlife feedback hub</p>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Discover animals and share your honest feedback.</h1>
            <p className="max-w-2xl text-lg text-slate-300">
              Browse a beautiful gallery of wildlife species, click your favorite animal, and add feedback instantly to help the community learn from your observations.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="/" className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white shadow-sm backdrop-blur-md transition hover:bg-white/10 hover:scale-105 active:scale-95">Browse animals</a>
              <a href="/submit" className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] transition hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] hover:scale-105 active:scale-95">Submit generic feedback</a>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            <div className="group/img relative rounded-3xl overflow-hidden bg-white/5 p-2 shadow-2xl backdrop-blur-md border border-white/10 transition-all duration-500 hover:-translate-y-2 hover:border-indigo-500/50">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/img:opacity-100 transition duration-300 z-10 rounded-2xl"></div>
              <img src="https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&w=900&q=80" alt="Panda" className="h-56 w-full object-cover rounded-2xl transition duration-700 group-hover/img:scale-110" />
            </div>
            <div className="group/img relative rounded-3xl overflow-hidden bg-white/5 p-2 shadow-2xl backdrop-blur-md border border-white/10 transition-all duration-500 hover:-translate-y-2 hover:border-purple-500/50 translate-y-8">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/img:opacity-100 transition duration-300 z-10 rounded-2xl"></div>
              <img src="https://images.unsplash.com/photo-1511974035430-5de47d3b95da?auto=format&fit=crop&w=900&q=80" alt="Tiger" className="h-56 w-full object-cover rounded-2xl transition duration-700 group-hover/img:scale-110" />
            </div>
          </motion.div>
        </div>
      </section>

      <HomeGallery />
    </motion.div>
  )
}
