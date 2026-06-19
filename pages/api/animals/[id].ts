import type { NextApiRequest, NextApiResponse } from 'next'
import { animals } from '../../../lib/animals'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  const { id } = req.query
  const animal = animals.find((item) => item.id === id)
  if (!animal) return res.status(404).json({ error: 'Animal not found' })
  return res.status(200).json(animal)
}
