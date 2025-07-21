import type { StudyArea, Seat } from '../types'

function generateSeats(capacity: number): Seat[] {
  return Array.from({ length: capacity }, (_, idx) => ({
    id: `S${idx + 1}`,
    occupied: Math.random() < 0.5,
  }))
}

function computeStats(seats: Seat[]): { seatsOpen: number; occupancyPct: number } {
  const occupied = seats.filter((s) => s.occupied).length
  const seatsOpen = seats.length - occupied
  const occupancyPct = Math.round((occupied / seats.length) * 100)
  return { seatsOpen, occupancyPct }
}

export function createInitialStudyAreas(): StudyArea[] {
  const now = new Date().toISOString()
  const areas: StudyArea[] = [
    {
      id: 'lib-1',
      name: 'Main Library – Floor 1',
      building: 'Main Library',
      capacity: 30,
      seatsOpen: 0,
      occupancyPct: 0,
      lastUpdated: now,
    },
    {
      id: 'lib-2',
      name: 'Main Library – Floor 2',
      building: 'Main Library',
      capacity: 28,
      seatsOpen: 0,
      occupancyPct: 0,
      lastUpdated: now,
    },
    {
      id: 'cafe',
      name: 'Campus Café',
      building: 'Student Center',
      capacity: 24,
      seatsOpen: 0,
      occupancyPct: 0,
      lastUpdated: now,
    },
    {
      id: 'eng-lab',
      name: 'Engineering Study Lab',
      building: 'Engineering Hall',
      capacity: 36,
      seatsOpen: 0,
      occupancyPct: 0,
      lastUpdated: now,
    },
  ]

  // attach seats and compute stats
  areas.forEach((area) => {
    const seats = generateSeats(area.capacity)
    const { seatsOpen, occupancyPct } = computeStats(seats)
    area.seats = seats
    area.seatsOpen = seatsOpen
    area.occupancyPct = occupancyPct
  })

  return areas
}

export function randomizeOccupancy(area: StudyArea): StudyArea {
  if (!area.seats) return area

  // randomize 10% of seats toggled
  const seats = area.seats.map((seat) => {
    if (Math.random() < 0.1) {
      return { ...seat, occupied: !seat.occupied }
    }
    return seat
  })

  const { seatsOpen, occupancyPct } = computeStats(seats)

  return {
    ...area,
    seats,
    seatsOpen,
    occupancyPct,
    lastUpdated: new Date().toISOString(),
  }
} 