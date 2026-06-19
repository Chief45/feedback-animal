import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../lib/mongodb'
import Feedback from '../../../models/FeedbackModel'
import { sampleFeedback } from '../../../lib/sampleData'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb',
    },
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await connectToDatabase()

  if (req.method === 'GET') {
    const { animalId } = req.query
    const filter: any = {}
    if (animalId) filter.animalId = animalId

    if (!db) {
      return res.status(200).json(
        animalId
          ? sampleFeedback.filter((item) => item.animalId === animalId)
          : sampleFeedback
      )
    }

    try {
      const items = await Feedback.find(filter).sort({ createdAt: -1 }).lean()
      return res.status(200).json(items)
    } catch (error) {
      console.error('Failed loading feedback:', error)
      return res.status(200).json(
        animalId
          ? sampleFeedback.filter((item) => item.animalId === animalId)
          : sampleFeedback
      )
    }
  }

  if (req.method === 'POST') {
    const { author, animalId, animalName, species, rating, message } = req.body as {
      author: string
      animalId?: string
      animalName?: string
      species: string
      rating: number
      message: string
    }

    const feedbackPayload = {
      author: author || 'Anonymous',
      animalId: animalId || undefined,
      animalName: animalName || undefined,
      species: species || 'Unknown',
      rating: rating || 0,
      message: message || '',
      createdAt: new Date().toISOString(),
    }

    if (!db) {
      const fallbackItem = {
        id: `sample-${sampleFeedback.length + 1}`,
        ...feedbackPayload,
      }
      sampleFeedback.unshift(fallbackItem)
      return res.status(201).json(fallbackItem)
    }

    try {
      const doc = await Feedback.create(feedbackPayload)
      return res.status(201).json(doc)
    } catch (error) {
      console.error('Failed saving feedback:', error)
      const fallbackItem = {
        id: `sample-${sampleFeedback.length + 1}`,
        ...feedbackPayload,
      }
      sampleFeedback.unshift(fallbackItem)
      return res.status(201).json(fallbackItem)
    }
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
