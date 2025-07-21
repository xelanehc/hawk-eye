import type { StudyArea, Seat } from '../types'

function generateSeats(capacity: number): Seat[] {
  const rowsNeeded = Math.ceil(capacity / 6)
  const seats: Seat[] = []

  for (let r = 0; r < rowsNeeded; r++) {
    const letter = String.fromCharCode(65 + r) // A, B, C...
    for (let c = 1; c <= 6 && seats.length < capacity; c++) {
      seats.push({
        id: `${letter}${c}`,
        occupied: Math.random() < 0.5,
      })
    }
  }

  // Shuffle seats to randomize layout for each area
  for (let i = seats.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[seats[i], seats[j]] = [seats[j], seats[i]]
  }

  return seats
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
      name: 'PG1',
      building: 'CULC',
      capacity: 30,
      seatsOpen: 0,
      occupancyPct: 0,
      lastUpdated: now,
    },
    {
      id: 'lib-2',
      name: 'PG2',
      building: 'CULC',
      capacity: 28,
      seatsOpen: 0,
      occupancyPct: 0,
      lastUpdated: now,
    },
    {
      id: 'rec-area',
      name: 'Rec Area',
      building: 'Student Center',
      capacity: 24,
      seatsOpen: 0,
      occupancyPct: 0,
      lastUpdated: now,
    },
    {
      id: 'crosland-6',
      name: 'Crosland 6',
      building: 'Crosland',
      capacity: 26,
      seatsOpen: 0,
      occupancyPct: 0,
      lastUpdated: now,
    },
    {
      id: 'crosland-7',
      name: 'Crosland 7',
      building: 'Crosland',
      capacity: 26,
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
    // assign random occupancy percentage 0–100
    const occupancyPct = Math.floor(Math.random() * 101)
    const seatsOpen = Math.round(((100 - occupancyPct) / 100) * area.capacity)
    area.seats = seats
    area.seatsOpen = seatsOpen
    area.occupancyPct = occupancyPct
  })

  return areas
}

export function randomizeOccupancy(area: StudyArea): StudyArea {
  if (!area.seats) return area

  // generate brand-new random occupancy percentage
  const occupancyPct = Math.floor(Math.random() * 101)
  const seatsOpen = Math.round(((100 - occupancyPct) / 100) * area.capacity)

  return {
    ...area,
    seats: area.seats, // keep existing seat IDs
    seatsOpen,
    occupancyPct,
    lastUpdated: new Date().toISOString(),
  }
} 