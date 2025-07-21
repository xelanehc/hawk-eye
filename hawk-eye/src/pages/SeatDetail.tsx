import { useNavigate, useParams } from 'react-router-dom'
import { useStudyData } from '../contexts/StudyDataContext'
import { useMemo } from 'react'

function SeatDetail() {
  const { areaId, seatId } = useParams()
  const navigate = useNavigate()
  const { getAreaById } = useStudyData()
  const area = getAreaById(areaId!)
  const seat = area?.seats?.find((s) => s.id === seatId)

  const timeRemaining = useMemo(() => Math.floor(Math.random() * 45) + 5, []) // 5–50 min

  if (!area || !seat) {
    return (
      <div className="p-10 text-center">
        <p className="mb-4 text-gray-600">Seat not found.</p>
        <button onClick={() => navigate(-1)} className="text-blue-600 underline">
          Go Back
        </button>
      </div>
    )
  }

  const occupied = seat.occupied

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">
        {area.name} • Seat {seat.id}
      </h1>

      {occupied ? (
        <p className="mb-6 text-gray-700">Estimated time until free: {timeRemaining} minutes</p>
      ) : (
        <p className="mb-6 text-green-600">Seat is currently open</p>
      )}

      <div className="flex flex-col gap-4">
        {occupied && (
          <button
            className="rounded bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
            onClick={() => alert('Occupier notified via email!')}
          >
            Bump current occupier
          </button>
        )}
        {!occupied && (
          <button
            className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
            onClick={() => alert('Seat reserved!')}
          >
            Reserve seat
          </button>
        )}
        <button
          onClick={() => navigate(-1)}
          className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
        >
          Back to Map
        </button>
      </div>
    </main>
  )
}

export default SeatDetail 