import Link from 'next/link'
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import useSWR from 'swr'
import { animals as initialAnimals } from '../lib/animals'
import { Animal } from '../types'

const fetcher = (url: string) => fetch(url).then((res) => res.json() as Promise<Animal[]>)

export default function HomeGallery() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const { data } = useSWR<Animal[]>('/api/animals', fetcher, { fallbackData: initialAnimals })
  const animals = data ?? initialAnimals
  const categories = useMemo(() => ['All', ...Array.from(new Set(animals.map((animal) => animal.category)))], [animals])
  const filtered = useMemo(() => {
    return animals.filter((animal) => {
      const matchesCategory = category === 'All' || animal.category === category
      const matchesSearch = animal.name.toLowerCase().includes(search.toLowerCase()) || animal.description.toLowerCase().includes(search.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [animals, category, search])

  return (
    <section className="space-y-6 mb-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-[2.5rem] bg-slate-900/40 backdrop-blur-xl p-8 shadow-2xl border border-white/10"
      >
        <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">Real animals, real feedback</h2>
        <p className="text-slate-300 max-w-2xl text-lg">
          Browse an inspiring gallery of wildlife and click any animal to add feedback about that species.
          Each card leads directly to a focused review experience.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]"
      >
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/40 backdrop-blur-xl p-5 shadow-2xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search species or habitat"
              className="col-span-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-slate-100 placeholder-slate-400 shadow-inner focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-slate-100 shadow-inner focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition appearance-none"
            >
              {categories.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
          hidden: {}
        }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((animal) => (
          <motion.div 
            key={animal.id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <Link href={`/animal/${animal.id}`} className="group block overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/40 backdrop-blur-xl shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(79,70,229,0.3)] hover:border-indigo-500/50">
              <div className="relative h-64 overflow-hidden bg-slate-800">
                <img src={animal.imageUrl} alt={animal.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent px-5 pb-5 pt-12 text-white opacity-90 transition duration-500 group-hover:opacity-100">
                  <p className="text-xs uppercase tracking-[0.2em] text-indigo-300 font-bold mb-1">{animal.category}</p>
                  <h3 className="text-2xl font-bold">{animal.name}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-300 line-clamp-2">{animal.description}</p>
                <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
                  <span className="font-medium">{animal.habitat}</span>
                  <span className="rounded-full bg-indigo-500/20 px-4 py-1.5 text-indigo-300 font-semibold transition group-hover:bg-indigo-500 group-hover:text-white">Give feedback</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
