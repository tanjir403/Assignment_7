import { useEffect, useState } from 'react'
import { FiUserPlus } from 'react-icons/fi'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import StatsCard from '../components/StatsCard'
import FriendCard from '../components/FriendCard'
import { useAppContext } from '../context/AppContext'

const Home = () => {
  const [friends, setFriends] = useState([])
  const [loading, setLoading] = useState(true)
  const { timeline } = useAppContext()

  useEffect(() => {
    const loadFriends = async () => {
      try {
        const response = await fetch('/friends.json')
        const data = await response.json()

        setTimeout(() => {
          setFriends(data)
          setLoading(false)
        }, 150)
      } catch (error) {
        console.error('Failed to load friends:', error)
        setLoading(false)
      }
    }

    loadFriends()
  }, [])

  const totalFriends = friends.length
  const onTrack = friends.filter((friend) => friend.status === 'on-track').length
  const needAttention = friends.filter(
    (friend) => friend.status === 'overdue' || friend.status === 'almost due'
  ).length
  const interactions = timeline.length

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-md border border-gray-200 bg-gray-50 px-6 py-10 text-center">
          <h2 className="text-3xl font-bold text-slate-800 sm:text-4xl">
            Friends to keep close in your life
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-500">
            Your personal shelf of meaningful connections. Browse, trend, and
            nurture the relationships that matter most.
          </p>

          <button className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#2f6f60] px-5 py-3 text-base font-semibold text-white hover:bg-[#285e52]">
            <FiUserPlus size={18} />
            Add a Friend
          </button>
        </section>

        {loading ? (
          <Loader />
        ) : (
          <>
            <section className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
              <StatsCard value={totalFriends} title="Total Friends" />
              <StatsCard value={onTrack} title="On Track" />
              <StatsCard value={needAttention} title="Need Attention" />
              <StatsCard value={interactions} title="Interactions This Month" />
            </section>

            <section className="mt-10">
              <h3 className="mb-5 text-lg font-bold text-slate-800">
                Your Friends
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {friends.map((friend) => (
                  <FriendCard key={friend.id} friend={friend} />
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default Home