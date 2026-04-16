import { Link } from 'react-router-dom'

const statusClasses = {
  overdue: 'bg-red-100 text-red-600',
  'almost due': 'bg-yellow-100 text-yellow-700',
  'on-track': 'bg-green-100 text-green-700',
}

const FriendCard = ({ friend }) => {
  const { id, name, picture, days_since_contact, tags, status } = friend

  return (
    <Link
      to={`/friend/${id}`}
      className="block rounded-lg border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex flex-col items-center text-center">
        <img
          src={picture}
          alt={name}
          className="h-16 w-16 rounded-full object-cover"
        />

        <h3 className="mt-3 text-sm font-bold text-slate-800">{name}</h3>

        <p className="mt-1 text-xs text-gray-500">
          <span className="font-medium">Days Since Contact:</span>{' '}
          {days_since_contact}
        </p>

        <div className="mt-2 flex flex-wrap justify-center gap-1">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="rounded-full bg-slate-100 px-2 py-1 text-[10px] text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>

        <span
          className={`mt-3 rounded-full px-3 py-1 text-[10px] font-semibold capitalize ${statusClasses[status]}`}
        >
          {status}
        </span>
      </div>
    </Link>
  )
}

export default FriendCard