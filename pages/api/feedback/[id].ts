import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../lib/mongodb'
import Feedback from '../../../models/FeedbackModel'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await connectToDatabase()
  if (!db) {
    return res.status(503).json({ error: 'Database unavailable' })
  }
  const { id } = req.query

  if (req.method === 'GET') {
    const doc = await Feedback.findById(id).lean()
    if (!doc) return res.status(404).end()
    return res.status(200).json(doc)
  }

  if (req.method === 'DELETE') {
    await Feedback.findByIdAndDelete(id)
    return res.status(204).end()
  }

  if (req.method === 'PUT') {
    const update = req.body
    const doc = await Feedback.findByIdAndUpdate(id, update, { new: true }).lean()
    return res.status(200).json(doc)
  }

  res.setHeader('Allow', ['GET', 'DELETE', 'PUT'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
