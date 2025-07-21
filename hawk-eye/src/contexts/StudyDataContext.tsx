import { createContext, useContext, useEffect, useState } from 'react'
import type { StudyArea } from '../types'
import { createInitialStudyAreas, randomizeOccupancy } from '../utils/demoData'

interface StudyDataContextValue {
  studyAreas: StudyArea[]
  getAreaById: (id: string) => StudyArea | undefined
}

const StudyDataContext = createContext<StudyDataContextValue | undefined>(undefined)

export function StudyDataProvider({ children }: { children: React.ReactNode }) {
  const [studyAreas, setStudyAreas] = useState<StudyArea[]>(createInitialStudyAreas())

  useEffect(() => {
    const interval = setInterval(() => {
      setStudyAreas((prev) => prev.map((a) => randomizeOccupancy(a)))
    }, 10_000) // 10 seconds

    return () => clearInterval(interval)
  }, [])

  const getAreaById = (id: string) => studyAreas.find((a) => a.id === id)

  return (
    <StudyDataContext.Provider value={{ studyAreas, getAreaById }}>
      {children}
    </StudyDataContext.Provider>
  )
}

export function useStudyData() {
  const ctx = useContext(StudyDataContext)
  if (!ctx) {
    throw new Error('useStudyData must be used within StudyDataProvider')
  }
  return ctx
} 