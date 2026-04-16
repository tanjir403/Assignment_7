import { useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import TimelineItem from '../components/TimelineItem'
import { useAppContext } from '../context/AppContext'

const Timeline = () => {
  const { timeline } = useAppContext()
  const [filter, setFilter] = useState('all')

  const filteredTimeline = useMemo(() => {
    const sorted = [...timeline].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    )

    if (filter === 'all') {
      return sorted
    }

    return sorted.filter((item) => item.type === filter)
  }, [timeline, filter])

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-md border border-gray-200 bg-gray-50 p-5 md:p-8">
          <h2 className="text-3xl font-bold text-slate-800">Timeline</h2>

          <div className="mt-5 flex flex-wrap gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none"
            >
              <option value="all">All Interactions</option>
              <option value="call">Call</option>
              <option value="text">Text</option>
              <option value="video">Video</option>
            </select>
          </div>

          <div className="mt-6 space-y-4">
            {filteredTimeline.length > 0 ? (
              filteredTimeline.map((item) => (
                <TimelineItem key={item.id} item={item} />
              ))
            ) : (
              <div className="rounded-md bg-white p-8 text-center text-sm text-gray-500 shadow-sm">
                No timeline entries found for this filter.
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Timeline