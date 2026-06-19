import FeedbackForm from '../components/FeedbackForm'

export default function SubmitPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Submit Animal Feedback</h1>
      <div className="bg-white rounded shadow p-6">
        <FeedbackForm />
      </div>
    </div>
  )
}
