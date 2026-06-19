import Link from 'next/link'
import { useMemo, useState } from 'react'
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
      <div className="rounded-3xl bg-white p-8 shadow-sm border">
        <h2 className="text-2xl font-semibold mb-3">Real animals, real feedback</h2>
        <p className="text-gray-600 max-w-2xl">
          Browse an inspiring gallery of wildlife and click any animal to add feedback about that species.
          Each card leads directly to a focused review experience for the chosen animal.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search species or habitat"
              className="col-span-2 rounded-2xl border border-slate-200 px-4 py-3 shadow-sm focus:border-indigo-500 focus:outline-none"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-2xl border border-slate-200 px-4 py-3 shadow-sm focus:border-indigo-500 focus:outline-none"
            >
              {categories.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((animal) => (
          <Link key={animal.id} href={`/animal/${animal.id}`} className="group block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="relative h-64 overflow-hidden bg-slate-100">
              <img src={animal.imageUrl} alt={animal.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-4 pb-4 pt-10 text-white">
                <p className="text-sm uppercase tracking-[0.2em] text-indigo-200">{animal.category}</p>
                <h3 className="text-xl font-semibold">{animal.name}</h3>
              </div>
            </div>
            <div className="p-5">
              <p className="text-gray-600">{animal.description}</p>
              <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
                <span>{animal.habitat}</span>
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-indigo-700">Give feedback</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
