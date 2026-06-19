import { Feedback } from '../types'

export default function FeedbackCard({ item }: { item: Feedback }) {
  return (
    <article className="bg-white rounded shadow p-4">
      <div className="flex items-start space-x-4">
        <div className="flex-1">
          <div className="flex items-baseline justify-between">
            <h3 className="font-medium">{item.species}</h3>
            <div className="text-sm text-gray-500">{new Date(item.createdAt).toLocaleString()}</div>
          </div>
          <div className="text-sm text-gray-600">by {item.author} · {item.rating}/5</div>
          <p className="mt-2 text-gray-800">{item.message}</p>
        </div>
        {item.images && item.images.length > 0 && (
          <div className="w-24 grid gap-1">
            {item.images.slice(0,3).map((src, i) => (
              <img key={i} src={src} alt={`${item.species}-${i}`} className="w-24 h-16 object-cover rounded" />
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
