import { useEffect, useState } from 'react'
import { createFeedback } from '../lib/api'
import { Animal } from '../types'
import { useRouter } from 'next/router'
import { mutate } from 'swr'
import { motion, AnimatePresence } from 'framer-motion'

const FLOWERS = ['🌸', '🌺', '🌼', '🎉', '✨', '💖', '🦋']

function CelebrationOverlay() {
  const [particles, setParticles] = useState<any[]>([])

  useEffect(() => {
    setParticles(
      Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        emoji: FLOWERS[Math.floor(Math.random() * FLOWERS.length)],
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2.5 + Math.random() * 2,
        scale: 0.8 + Math.random() * 1.5,
      }))
    )
  }, [])

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden bg-slate-950/60 backdrop-blur-md"
    >
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: '100vh', x: `${p.x}vw`, scale: p.scale }}
          animate={{ 
            opacity: [0, 1, 1, 0], 
            y: '-20vh', 
            x: `${p.x + (Math.random() * 30 - 15)}vw`,
            rotate: Math.random() * 360
          }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeOut" }}
          className="absolute text-4xl"
        >
          {p.emoji}
        </motion.div>
      ))}
      <motion.div 
        initial={{ scale: 0.5, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: -50 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="bg-slate-900/80 backdrop-blur-2xl border border-white/20 px-12 py-10 rounded-[3rem] shadow-[0_0_60px_rgba(236,72,153,0.3)] text-center relative z-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 mb-4">
          Thank you!
        </h2>
        <p className="text-slate-300 text-lg md:text-xl font-medium">
          Your feedback is highly appreciated.
        </p>
      </motion.div>
    </motion.div>
  )
}
import { mutate } from 'swr'

export default function FeedbackForm({ animal }: { animal?: Animal } = {}) {
  const [author, setAuthor] = useState('')
  const [species, setSpecies] = useState(animal?.name ?? '')
  const [rating, setRating] = useState(5)
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
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
      
      // Onyesha maua na shukrani
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        // Kama yupo kwenye ukurasa wa /submit, mpeleke kwenye ukurasa wa mnyama baada ya maua
        if (router.pathname === '/submit') {
          router.push(selectedAnimal ? `/animal/${selectedAnimal.id}` : '/')
        }
      }, 3500)
      
    } catch {
      alert('Failed to submit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <AnimatePresence>
        {showSuccess && <CelebrationOverlay />}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-4 relative">
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
    </>
  )
}
