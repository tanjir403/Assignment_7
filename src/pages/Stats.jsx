import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAppContext } from '../context/AppContext'

const COLORS = ['#7c3aed', '#9ca3af', '#2f6f60']

const Stats = () => {
  const { timeline } = useAppContext()

  const callCount = timeline.filter((item) => item.type === 'call').length
  const textCount = timeline.filter((item) => item.type === 'text').length
  const videoCount = timeline.filter((item) => item.type === 'video').length

  const chartData = [
    { name: 'Call', value: callCount },
    { name: 'Text', value: textCount },
    { name: 'Video', value: videoCount },
  ]

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-md border border-gray-200 bg-gray-50 p-5 md:p-8">
          <h2 className="text-3xl font-bold text-slate-800">
            Friendship Analytics
          </h2>

          <p className="mt-3 text-sm text-gray-500">
            By Interaction Type (Call, Text, Video)
          </p>

          <div className="mt-8 rounded-md bg-white p-6 shadow-sm">
            <div className="mx-auto h-80 w-full max-w-2xl">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={4}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Stats