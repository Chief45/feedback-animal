import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../lib/mongodb'
import Feedback from '../../../models/FeedbackModel'
import fs from 'fs'
import path from 'path'
import { v2 as cloudinary } from 'cloudinary'
import { sampleFeedback } from '../../../lib/sampleData'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb',
    },
  },
}

if (process.env.CLOUDINARY_URL) {
  cloudinary.config({ secure: true })
}

async function saveImageLocally(dataUrl: string, index: number) {
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })
  const matches = dataUrl.match(/^data:(image\/\w+);base64,(.+)$/)
  if (!matches) return null
  const ext = matches[1].split('/')[1]
  const base64 = matches[2]
  const filename = `${Date.now()}-${index}.${ext}`
  const filepath = path.join(uploadsDir, filename)
  fs.writeFileSync(filepath, Buffer.from(base64, 'base64'))
  return `/uploads/${filename}`
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
    const { author, animalId, animalName, species, rating, message, images } = req.body as {
      author: string
      animalId?: string
      animalName?: string
      species: string
      rating: number
      message: string
      images: string[]
    }

    const savedImageUrls: string[] = []
    if (Array.isArray(images)) {
      for (let i = 0; i < images.length; i++) {
        const img = images[i]
        if (process.env.CLOUDINARY_URL) {
          try {
            const result = await cloudinary.uploader.upload(img, { folder: 'animal-feedback' })
            savedImageUrls.push(result.secure_url)
            continue
          } catch (e) {
            // fallback to local
          }
        }
        const local = await saveImageLocally(img, i)
        if (local) savedImageUrls.push(local)
      }
    }

    const feedbackPayload = {
      author: author || 'Anonymous',
      animalId: animalId || undefined,
      animalName: animalName || undefined,
      species: species || 'Unknown',
      rating: rating || 0,
      message: message || '',
      images: savedImageUrls,
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
