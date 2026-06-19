import { useRouter } from 'next/router'
import useSWR from 'swr'
import Link from 'next/link'
import FeedbackList from '../../components/FeedbackList'
import FeedbackForm from '../../components/FeedbackForm'
import { Animal } from '../../types'
import { motion } from 'framer-motion'

const fetcher = (url: string) => fetch(url).then((res) => res.json() as Promise<Animal>)

export default function AnimalDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const { data: animal, error } = useSWR<Animal>(id ? `/api/animals/${id}` : null, fetcher)

  if (!animal && !error) {
    return <div className="text-center text-gray-500 py-16">Loading animal details…</div>
  }

  if (error || !animal) {
    return (
      <div className="container py-16">
        <p className="text-center text-red-600">Unable to load animal profile.</p>
        <div className="mt-6 text-center">
          <Link href="/" className="text-indigo-600 underline">Back to gallery</Link>
        </div>
      </div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <motion.div 
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="rounded-[2.5rem] bg-slate-900/40 backdrop-blur-xl p-8 shadow-2xl border border-white/10"
      >
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <div className="overflow-hidden rounded-3xl shadow-lg">
              <img src={animal.imageUrl} alt={animal.name} className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-indigo-400 font-bold">{animal.category}</p>
                <h1 className="mt-3 text-4xl lg:text-5xl font-bold text-white">{animal.name}</h1>
              </div>
              <Link href="/" className="rounded-full border border-white/10 px-6 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition">Back to gallery</Link>
            </div>
            <p className="text-slate-300 leading-8 text-lg">{animal.description}</p>
            <div className="grid gap-4 sm:grid-cols-2 pt-4">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                <p className="text-sm text-slate-400">Scientific name</p>
                <p className="mt-2 font-semibold text-white">{animal.scientificName}</p>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                <p className="text-sm text-slate-400">Habitat</p>
                <p className="mt-2 font-semibold text-white">{animal.habitat}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.section 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-[2rem] bg-slate-900/40 backdrop-blur-xl p-8 shadow-2xl border border-white/10"
        >
          <h2 className="text-2xl font-bold mb-6 text-white">Feedback for {animal.name}</h2>
          <FeedbackList animalId={animal.id} />
        </motion.section>
        <motion.section 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-[2rem] bg-slate-900/40 backdrop-blur-xl p-8 shadow-2xl border border-white/10"
        >
          <h2 className="text-2xl font-bold mb-6 text-white">Leave your review</h2>
          <FeedbackForm animal={animal} />
        </motion.section>
      </div>
    </motion.div>
  )
}
