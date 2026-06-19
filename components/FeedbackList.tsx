import useSWR from 'swr'
import FeedbackCard from './FeedbackCard'
import { sampleFeedback } from '../lib/sampleData'
import { Feedback } from '../types'
import { listFeedback } from '../lib/api'

export default function FeedbackList({ animalId }: { animalId?: string } = {}) {
  const { data, error } = useSWR<Feedback[]>(['/api/feedback', animalId], () => listFeedback(animalId))

  if (error) {
    const fallback = animalId ? sampleFeedback.filter((it) => it.animalId === animalId) : sampleFeedback
    return (
      <div className="space-y-4">
        <div className="rounded-3xl border border-red-100 bg-red-50 p-4 text-red-700">
          Failed to load feedback from the backend. Showing sample submissions instead.
        </div>
        {fallback.map((it) => (
          <FeedbackCard key={it.id} item={it} />
        ))}
      </div>
    )
  }
  if (!data) return <div className="text-center text-gray-500">Loading…</div>
  if (data.length === 0) return <div className="text-center text-gray-600">No feedback yet — be the first to submit.</div>

  return (
    <div className="space-y-4">
      {data.map((it) => (
        <FeedbackCard
          key={it._id ?? it.id}
          item={{
            id: it._id ?? it.id,
            author: it.author,
            species: it.species,
            rating: it.rating,
            message: it.message,
            images: it.images ?? [],
            createdAt: it.createdAt,
          }}
        />
      ))}
    </div>
  )
}
