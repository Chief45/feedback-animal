export type Feedback = {
  id: string
  _id?: string
  animalId?: string
  animalName?: string
  author: string
  species: string
  rating: number
  message: string
  images: string[]
  createdAt: string
}

export type Animal = {
  id: string
  name: string
  scientificName: string
  category: string
  habitat: string
  imageUrl: string
  description: string
}
