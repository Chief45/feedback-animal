import FeedbackForm from '../components/FeedbackForm'
import { motion } from 'framer-motion'

export default function SubmitPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">Submit Animal Feedback</h1>
      <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl p-8">
        <FeedbackForm />
      </div>
    </motion.div>
  )
}
