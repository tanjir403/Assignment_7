import { FiPhone, FiMessageSquare, FiVideo } from 'react-icons/fi'

const iconMap = {
  call: <FiPhone size={16} />,
  text: <FiMessageSquare size={16} />,
  video: <FiVideo size={16} />,
}

const iconBgMap = {
  call: 'bg-blue-100 text-blue-600',
  text: 'bg-slate-100 text-slate-600',
  video: 'bg-purple-100 text-purple-600',
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  })
}

const TimelineItem = ({ item }) => {
  return (
    <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${
            iconBgMap[item.type] || 'bg-slate-100 text-slate-600'
          }`}
        >
          {iconMap[item.type] || <FiMessageSquare size={16} />}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-800">{item.title}</h3>
          <p className="mt-1 text-xs text-gray-500">{formatDate(item.date)}</p>
        </div>
      </div>
    </div>
  )
}

export default TimelineItem