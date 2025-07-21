export interface Seat {
  id: string // e.g., "B3"
  occupied: boolean
}

export interface StudyArea {
  id: string
  name: string
  building: string
  capacity: number
  seatsOpen: number // derived
  occupancyPct: number // 0–100
  lastUpdated: string
  seats?: Seat[]
} 