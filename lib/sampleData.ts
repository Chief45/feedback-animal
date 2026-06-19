import { Feedback } from '../types'

export const sampleFeedback: Feedback[] = [
  {
    id: 'sample-1',
    animalId: 'elephant',
    animalName: 'African Elephant',
    author: 'Amina',
    species: 'African Elephant',
    rating: 5,
    message: 'Beautiful animal and very calm while being observed.',
    images: ['https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sample-2',
    animalId: 'fox',
    animalName: 'Red Fox',
    author: 'David',
    species: 'Red Fox',
    rating: 4,
    message: 'Quick and alert, a great example of a wild fox sighting.',
    images: ['https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sample-3',
    animalId: 'giraffe',
    animalName: 'Giraffe',
    author: 'Mwana',
    species: 'Giraffe',
    rating: 5,
    message: 'Tall and graceful, a much-loved sight in the reserve.',
    images: ['https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=80'],
    createdAt: new Date().toISOString(),
  },
]
