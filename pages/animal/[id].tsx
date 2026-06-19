import { useRouter } from 'next/router'
import useSWR from 'swr'
import Link from 'next/link'
import FeedbackList from '../../components/FeedbackList'
import FeedbackForm from '../../components/FeedbackForm'
import { Animal } from '../../types'

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
    <div className="space-y-8">
      <div className="rounded-3xl bg-white p-8 shadow-sm border">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <div className="overflow-hidden rounded-3xl shadow-lg">
              <img src={animal.imageUrl} alt={animal.name} className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-indigo-600">{animal.category}</p>
                <h1 className="mt-3 text-4xl font-semibold">{animal.name}</h1>
              </div>
              <Link href="/" className="rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Back to gallery</Link>
            </div>
            <p className="text-gray-600 leading-8">{animal.description}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Scientific name</p>
                <p className="mt-2 font-semibold text-slate-900">{animal.scientificName}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Habitat</p>
                <p className="mt-2 font-semibold text-slate-900">{animal.habitat}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-3xl bg-white p-8 shadow-sm border">
          <h2 className="text-2xl font-semibold mb-4">Feedback for {animal.name}</h2>
          <FeedbackList animalId={animal.id} />
        </section>
        <section className="rounded-3xl bg-white p-8 shadow-sm border">
          <h2 className="text-2xl font-semibold mb-4">Leave your review</h2>
          <FeedbackForm animal={animal} />
        </section>
      </div>
    </div>
  )
}
