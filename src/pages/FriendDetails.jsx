import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import {
  FiClock,
  FiArchive,
  FiTrash2,
  FiPhone,
  FiMessageSquare,
  FiVideo,
} from 'react-icons/fi'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'

const statusClasses = {
  overdue: 'bg-red-100 text-red-600',
  'almost due': 'bg-yellow-100 text-yellow-700',
  'on-track': 'bg-green-100 text-green-700',
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
}

const FriendDetails = () => {
  const { id } = useParams()
  const [friend, setFriend] = useState(null)
  const [loading, setLoading] = useState(true)
  const { addTimelineEntry } = useAppContext()

  useEffect(() => {
    const loadFriend = async () => {
      try {
        const response = await fetch('/friends.json')
        const data = await response.json()
        const foundFriend = data.find((item) => item.id === Number(id))

        setTimeout(() => {
          setFriend(foundFriend || null)
          setLoading(false)
        }, 150)
      } catch (error) {
        console.error('Failed to load friend details:', error)
        setLoading(false)
      }
    }

    loadFriend()
  }, [id])

  const handleCheckIn = (type) => {
    if (!friend) return

    const entry = {
      type: type.toLowerCase(),
      title: `${type} with ${friend.name}`,
      date: new Date().toISOString().split('T')[0],
    }

    addTimelineEntry(entry)
    toast.success(`${type} logged for ${friend.name}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f4f6]">
        <Navbar />
        <Loader />
        <Footer />
      </div>
    )
  }

  if (!friend) {
    return (
      <div className="min-h-screen bg-[#f3f4f6]">
        <Navbar />
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h2 className="text-3xl font-bold text-slate-800">Friend not found</h2>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-md border border-gray-200 bg-gray-50 p-5 md:p-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-4">
              <div className="rounded-md bg-white p-5 shadow-sm">
                <div className="flex flex-col items-center text-center">
                  <img
                    src={friend.picture}
                    alt={friend.name}
                    className="h-20 w-20 rounded-full object-cover"
                  />

                  <h2 className="mt-3 text-xl font-bold text-slate-800">
                    {friend.name}
                  </h2>

                  <span
                    className={`mt-2 rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusClasses[friend.status]}`}
                  >
                    {friend.status}
                  </span>

                  <div className="mt-3 flex flex-wrap justify-center gap-2">
                    {friend.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-slate-100 px-2 py-1 text-[11px] text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="mt-4 text-sm text-gray-500">{friend.bio}</p>

                  <p className="mt-3 text-sm text-slate-700">
                    <span className="font-semibold">Email:</span> {friend.email}
                  </p>
                </div>
              </div>

              <button className="flex w-full items-center justify-center gap-2 rounded-md border bg-white px-4 py-3 text-sm text-slate-700 shadow-sm hover:bg-slate-50">
                <FiClock size={16} />
                Snooze 2 Weeks
              </button>

              <button className="flex w-full items-center justify-center gap-2 rounded-md border bg-white px-4 py-3 text-sm text-slate-700 shadow-sm hover:bg-slate-50">
                <FiArchive size={16} />
                Archive
              </button>

              <button className="flex w-full items-center justify-center gap-2 rounded-md border bg-white px-4 py-3 text-sm text-red-500 shadow-sm hover:bg-red-50">
                <FiTrash2 size={16} />
                Delete
              </button>
            </div>

            <div className="space-y-5 lg:col-span-2">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-md bg-white p-5 text-center shadow-sm">
                  <h3 className="text-2xl font-bold text-[#2f6f60]">
                    {friend.days_since_contact}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">Days Since Contact</p>
                </div>

                <div className="rounded-md bg-white p-5 text-center shadow-sm">
                  <h3 className="text-2xl font-bold text-[#2f6f60]">
                    {friend.goal}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">Goal (Days)</p>
                </div>

                <div className="rounded-md bg-white p-5 text-center shadow-sm">
                  <h3 className="text-xl font-bold text-[#2f6f60]">
                    {formatDate(friend.next_due_date)}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">Next Due</p>
                </div>
              </div>

              <div className="rounded-md bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-800">
                    Relationship Goal
                  </h3>
                  <button className="rounded border border-[#2f6f60] px-3 py-1 text-xs text-[#2f6f60] hover:bg-green-50">
                    Edit
                  </button>
                </div>

                <p className="mt-4 text-sm text-gray-600">
                  Connect every <span className="font-semibold">{friend.goal} days</span>
                </p>
              </div>

              <div className="rounded-md bg-white p-5 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800">Quick Check-In</h3>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <button
                    onClick={() => handleCheckIn('Call')}
                    className="flex flex-col items-center justify-center rounded-md border px-4 py-5 text-slate-700 transition hover:bg-slate-50"
                  >
                    <FiPhone size={18} />
                    <span className="mt-2 text-sm font-medium">Call</span>
                  </button>

                  <button
                    onClick={() => handleCheckIn('Text')}
                    className="flex flex-col items-center justify-center rounded-md border px-4 py-5 text-slate-700 transition hover:bg-slate-50"
                  >
                    <FiMessageSquare size={18} />
                    <span className="mt-2 text-sm font-medium">Text</span>
                  </button>

                  <button
                    onClick={() => handleCheckIn('Video')}
                    className="flex flex-col items-center justify-center rounded-md border px-4 py-5 text-slate-700 transition hover:bg-slate-50"
                  >
                    <FiVideo size={18} />
                    <span className="mt-2 text-sm font-medium">Video</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default FriendDetails