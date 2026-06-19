import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || ''

if (!MONGODB_URI) {
  console.warn('MONGODB_URI not set — falling back to in-memory (no DB).')
}

let cached: { conn: typeof mongoose | null } = { conn: null }

export async function connectToDatabase() {
  if (cached.conn) return cached.conn
  if (!MONGODB_URI) return null

  try {
    await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      connectTimeoutMS: 5000,
      serverSelectionTimeoutMS: 5000,
    })
    cached.conn = mongoose
    return cached.conn
  } catch (error) {
    console.warn('Failed to connect to MongoDB, falling back to sample data:', error)
    return null
  }
}
