import { useEffect, useState } from 'react'
import { createFeedback } from '../lib/api'
import { Animal } from '../types'
import { useRouter } from 'next/router'
import { mutate } from 'swr'

export default function FeedbackForm({ animal }: { animal?: Animal } = {}) {
  const [author, setAuthor] = useState('')
  const [species, setSpecies] = useState(animal?.name ?? '')
  const [rating, setRating] = useState(5)
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | undefined>(animal)
  const router = useRouter()

  useEffect(() => {
    async function loadAnimal() {
      const animalId = Array.isArray(router.query.animalId) ? router.query.animalId[0] : router.query.animalId
      if (!animalId || selectedAnimal) return
      const res = await fetch(`/api/animals/${animalId}`)
      if (!res.ok) return
      const animalData = await res.json()
      setSelectedAnimal(animalData)
      setSpecies(animalData.name)
    }

    loadAnimal()
  }, [router.query.animalId, selectedAnimal])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await createFeedback({
        author: author || 'Anonymous',
        animalId: selectedAnimal?.id,
        animalName: selectedAnimal?.name,
        species: species || 'Unknown',
        rating,
        message,
      })
      
      // Kusafisha fomu
      setAuthor('')
      setSpecies(selectedAnimal?.name ?? '')
      setRating(5)
      setMessage('')
      
      // Kuvuta maoni mapya mara moja (Real-time update)
      mutate(['/api/feedback', selectedAnimal?.id])
      mutate(['/api/feedback', undefined])
      
      // Kama yupo kwenye ukurasa wa /submit, mpeleke kwenye ukurasa wa mnyama
      if (router.pathname === '/submit') {
        router.push(selectedAnimal ? `/animal/${selectedAnimal.id}` : '/')
      }
    } catch {
      alert('Failed to submit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {selectedAnimal && (
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/40 backdrop-blur-md p-6 shadow-2xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <img src={selectedAnimal.imageUrl} alt={selectedAnimal.name} className="h-28 w-28 rounded-3xl object-cover" />
            <div>
              <p className="text-sm text-indigo-400 font-bold uppercase tracking-widest">Feedback for</p>
              <h2 className="text-3xl font-bold text-white mt-1">{selectedAnimal.name}</h2>
              <p className="text-sm text-slate-300 mt-2">{selectedAnimal.description}</p>
            </div>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-300">Your name</label>
        <input value={author} onChange={(e) => setAuthor(e.target.value)} className="mt-2 block w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition outline-none" required />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300">Species</label>
        <input value={species} onChange={(e) => setSpecies(e.target.value)} placeholder="e.g. African Elephant" className="mt-2 block w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition outline-none" required />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300">Rating</label>
        <input type="range" min={1} max={5} value={rating} onChange={(e) => setRating(Number(e.target.value))} className="mt-3 w-full accent-indigo-500" />
        <div className="text-sm text-indigo-300 font-semibold mt-1">{rating} / 5 Stars</div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300">Message</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className="mt-2 block w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition outline-none resize-none" required />
      </div>

      <div className="flex items-center space-x-4 pt-4">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] hover:scale-105 active:scale-95 transition disabled:opacity-50 disabled:pointer-events-none"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
        <button type="button" onClick={() => { setAuthor(''); setSpecies(selectedAnimal?.name ?? ''); setRating(5); setMessage('')}} className="px-6 py-3 rounded-full border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition">Reset</button>
      </div>
    </form>
  )
}
