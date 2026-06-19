import { Feedback } from '../types'

export async function listFeedback(animalId?: string): Promise<Feedback[]> {
  const query = animalId ? `?animalId=${encodeURIComponent(animalId)}` : ''
  const res = await fetch(`/api/feedback${query}`)
  if (!res.ok) throw new Error('Failed to load')
  return res.json()
}

export async function createFeedback(payload: Omit<Feedback, 'id' | 'createdAt'>) {
  const res = await fetch('/api/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Failed to create')
  return res.json()
}
