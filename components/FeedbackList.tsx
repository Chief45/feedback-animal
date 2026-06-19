import useSWR from 'swr'
import { useState } from 'react'
import FeedbackCard from './FeedbackCard'
import { sampleFeedback } from '../lib/sampleData'
import { Feedback } from '../types'
import { listFeedback } from '../lib/api'

export default function FeedbackList({ animalId }: { animalId?: string } = {}) {
  const { data, error } = useSWR<Feedback[]>(['/api/feedback', animalId], () => listFeedback(animalId))
  const [limit, setLimit] = useState(10)

  if (error) {
    const fallback = animalId ? sampleFeedback.filter((it) => it.animalId === animalId) : sampleFeedback
    const displayedFallback = fallback.slice(0, limit)
    return (
      <div className="space-y-4">
        <div className="rounded-[2rem] border border-red-500/30 bg-red-500/10 backdrop-blur-md p-6 text-red-200">
          Failed to load feedback from the backend. Showing sample submissions instead.
        </div>
        {displayedFallback.map((it) => (
          <FeedbackCard key={it.id} item={it} />
        ))}
        {limit < fallback.length && (
          <div className="flex justify-center mt-8">
            <button onClick={() => setLimit(l => l + 10)} className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-slate-300 hover:bg-white/10 hover:text-white transition shadow-lg backdrop-blur-md">
              Load More
            </button>
          </div>
        )}
      </div>
    )
  }
  if (!data) return <div className="text-center text-slate-400 py-10 animate-pulse">Loading feedback...</div>
  if (data.length === 0) return <div className="text-center text-slate-400 py-10">No feedback yet — be the first to submit.</div>

  const displayedData = data.slice(0, limit)

  return (
    <div className="space-y-4">
      {displayedData.map((it) => (
        <FeedbackCard
          key={it._id ?? it.id}
          item={{
            id: it._id ?? it.id,
            author: it.author,
            species: it.species,
            rating: it.rating,
            message: it.message,

            createdAt: it.createdAt,
          }}
        />
      ))}
      {limit < data.length && (
        <div className="flex justify-center mt-8">
          <button onClick={() => setLimit(l => l + 10)} className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-slate-300 hover:bg-white/10 hover:text-white transition shadow-lg backdrop-blur-md">
            Load More
          </button>
        </div>
      )}
    </div>
  )
}
