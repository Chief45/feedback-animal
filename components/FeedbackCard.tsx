import { Feedback } from '../types'
import { motion } from 'framer-motion'

export default function FeedbackCard({ item }: { item: Feedback }) {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-5 hover:border-indigo-500/30 transition duration-300"
    >
      <div className="flex items-start space-x-4">
        <div className="flex-1">
          <div className="flex items-baseline justify-between">
            <h3 className="font-semibold text-lg text-indigo-200">{item.species}</h3>
            <div className="text-sm text-slate-400">{new Date(item.createdAt).toLocaleString()}</div>
          </div>
          <div className="text-sm text-slate-300 mb-2">
            <span className="font-medium text-slate-100">{item.author}</span> · {item.rating}/5
          </div>
          <p className="text-slate-200 leading-relaxed">{item.message}</p>
        </div>

      </div>
    </motion.article>
  )
}
