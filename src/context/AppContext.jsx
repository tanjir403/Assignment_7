import { createContext, useContext, useMemo, useState } from 'react'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [timeline, setTimeline] = useState([
    {
      id: 1,
      type: 'text',
      title: 'Text with Sarah Chen',
      date: '2026-03-20',
    },
    {
      id: 2,
      type: 'call',
      title: 'Call with David Kim',
      date: '2026-03-18',
    },
    {
      id: 3,
      type: 'video',
      title: 'Video with Emma Wilson',
      date: '2026-03-15',
    },
  ])

  const addTimelineEntry = (entry) => {
    const newEntry = {
      id: Date.now(),
      ...entry,
    }

    setTimeline((prev) => [newEntry, ...prev])
  }

  const value = useMemo(
    () => ({
      timeline,
      addTimelineEntry,
    }),
    [timeline]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)