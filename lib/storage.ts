import { Feedback } from '../types'

const KEY = 'animal_feedback_storage_v1'

function read(): Feedback[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function write(items: Feedback[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEY, JSON.stringify(items))
}

export const storage = {
  list(): Feedback[] {
    return read().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
  },
  get(id: string) {
    return read().find((f) => f.id === id) || null
  },
  create(payload: Omit<Feedback, 'id' | 'createdAt'>) {
    const items = read()
    const newItem: Feedback = {
      ...payload,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    items.push(newItem)
    write(items)
    return newItem
  },
  clear() {
    write([])
  }
}
