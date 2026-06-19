import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IFeedback extends Document {
  author: string
  animalId?: string
  animalName?: string
  species: string
  rating: number
  message: string
  images: string[]
  createdAt: Date
}

const FeedbackSchema = new Schema<IFeedback>({
  author: { type: String, required: true },
  animalId: { type: String },
  animalName: { type: String },
  species: { type: String, required: true },
  rating: { type: Number, required: true },
  message: { type: String },
  images: { type: [String], default: [] },
  createdAt: { type: Date, default: () => new Date() },
})

const Feedback: Model<IFeedback> = (mongoose.models.Feedback as Model<IFeedback>) || mongoose.model<IFeedback>('Feedback', FeedbackSchema)

export default Feedback
