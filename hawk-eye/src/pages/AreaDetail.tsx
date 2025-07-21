import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useStudyData } from '../contexts/StudyDataContext'

function Seat({ occupied, id }: { occupied: boolean; id: string }) {
  return (
    <div
      title={`Seat ${id} • ${occupied ? 'Occupied' : 'Open'}`}
      className={
        'aspect-square w-6 rounded-sm border transition ' +
        (occupied
          ? 'border-red-600 bg-red-500/80 hover:bg-red-600'
          : 'border-green-600 bg-green-500/80 hover:bg-green-600')
      }
    />
  )
}

function AreaDetail() {
  const { studyAreas } = useStudyData()
  const params = useParams()
  const initialArea = studyAreas.find((a) => a.id === params.areaId) ?? studyAreas[0]
  const [selectedId, setSelectedId] = useState<string>(initialArea.id)

  const area = studyAreas.find((a) => a.id === selectedId)!

  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-6">{area.name}</h1>

      {/* Area selector */}
      <div className="mb-8">
        <label htmlFor="area-select" className="mr-2 font-medium text-gray-700">
          Select Study Area:
        </label>
        <select
          id="area-select"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2"
        >
          {studyAreas.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
      </div>

      {/* Seat map */}
      <div
        key={selectedId}
        className="mb-4 flex flex-wrap gap-1 rounded-lg border border-gray-200 p-4 animate-fadeIn"
      >
        {area.seats?.map((seat) => (
          <Seat key={seat.id} id={seat.id} occupied={seat.occupied} />
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1">
          <span className="inline-block h-4 w-4 rounded-sm bg-green-500" /> Open
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block h-4 w-4 rounded-sm bg-red-500" /> Occupied
        </div>
      </div>
    </main>
  )
}

export default AreaDetail 