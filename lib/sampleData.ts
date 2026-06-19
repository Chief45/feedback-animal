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

    createdAt: new Date().toISOString(),
  },
]
