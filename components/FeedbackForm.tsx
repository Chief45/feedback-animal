import { useEffect, useState } from 'react'
import { createFeedback } from '../lib/api'
import { Animal } from '../types'
import { useRouter } from 'next/router'

export default function FeedbackForm({ animal }: { animal?: Animal } = {}) {
  const [author, setAuthor] = useState('')
  const [species, setSpecies] = useState(animal?.name ?? '')
  const [rating, setRating] = useState(5)
  const [message, setMessage] = useState('')
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
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

  async function handleFiles(files: FileList | null) {
    if (!files) return
    const previews: string[] = []
    for (const file of Array.from(files)) {
      const dataUrl = await new Promise<string>((res, rej) => {
        const fr = new FileReader()
        fr.onload = () => res(String(fr.result))
        fr.onerror = rej
        fr.readAsDataURL(file)
      })
      previews.push(dataUrl)
    }
    setImagePreviews((p) => [...p, ...previews])
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    createFeedback({
      author: author || 'Anonymous',
      animalId: selectedAnimal?.id,
      animalName: selectedAnimal?.name,
      species: species || 'Unknown',
      rating,
      message,
      images: imagePreviews,
    }).then(() => router.push(selectedAnimal ? `/animal/${selectedAnimal.id}` : '/'))
      .catch(() => alert('Failed to submit. Please try again.'))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {selectedAnimal && (
        <div className="rounded-3xl border bg-slate-50 p-4 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <img src={selectedAnimal.imageUrl} alt={selectedAnimal.name} className="h-28 w-28 rounded-3xl object-cover" />
            <div>
              <p className="text-sm text-indigo-600 font-semibold">Feedback for</p>
              <h2 className="text-xl font-semibold">{selectedAnimal.name}</h2>
              <p className="text-sm text-gray-600">{selectedAnimal.description}</p>
            </div>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Your name</label>
        <input value={author} onChange={(e) => setAuthor(e.target.value)} className="mt-1 block w-full rounded border px-3 py-2" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Species</label>
        <input value={species} onChange={(e) => setSpecies(e.target.value)} placeholder="e.g. African Elephant" className="mt-1 block w-full rounded border px-3 py-2" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Rating</label>
        <input type="range" min={1} max={5} value={rating} onChange={(e) => setRating(Number(e.target.value))} className="mt-2 w-full" />
        <div className="text-sm text-gray-600">{rating} / 5</div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Message</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className="mt-1 block w-full rounded border px-3 py-2" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Attach images</label>
        <input type="file" accept="image/*" multiple onChange={(e) => handleFiles(e.target.files)} className="mt-2" />

        {imagePreviews.length > 0 && (
          <div className="mt-3 grid grid-cols-3 gap-2">
            {imagePreviews.map((src, i) => (
              <img key={i} src={src} className="w-full h-24 object-cover rounded" alt={`preview-${i}`} />
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Submit</button>
        <button type="button" onClick={() => { setAuthor(''); setSpecies(''); setRating(5); setMessage(''); setImagePreviews([])}} className="px-3 py-2 rounded border">Reset</button>
      </div>
    </form>
  )
}
