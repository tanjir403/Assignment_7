const StatsCard = ({ value, title }) => {
  return (
    <div className="rounded-md border border-gray-100 bg-white p-5 text-center shadow-sm">
      <h3 className="text-2xl font-bold text-[#1f5b4d]">{value}</h3>
      <p className="mt-2 text-xs text-gray-500">{title}</p>
    </div>
  )
}

export default StatsCard