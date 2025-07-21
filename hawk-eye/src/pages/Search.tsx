import { useMemo, useState } from 'react'
import { useStudyData } from '../contexts/StudyDataContext'

function SearchPage() {
  const { studyAreas } = useStudyData()
  const [query, setQuery] = useState('')
  const [buildingFilter, setBuildingFilter] = useState('All')

  // derive list of buildings for filter dropdown
  const buildings = useMemo(() => ['All', ...new Set(studyAreas.map((a) => a.building))], [studyAreas])

  const filtered = useMemo(() => {
    return studyAreas.filter((a) => {
      const matchesQuery = a.name.toLowerCase().includes(query.toLowerCase())
      const matchesBuilding = buildingFilter === 'All' || a.building === buildingFilter
      return matchesQuery && matchesBuilding
    })
  }, [studyAreas, query, buildingFilter])

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Search &amp; Filter</h1>

      {/* Controls */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
        <input
          type="text"
          placeholder="Search study areas..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
        />

        <select
          value={buildingFilter}
          onChange={(e) => setBuildingFilter(e.target.value)}
          className="w-48 rounded-md border border-gray-300 px-3 py-2"
        >
          {buildings.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Study Area</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Location</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Available/Capacity</th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">Occupancy</th>
              
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((area) => (
              <tr key={area.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">{area.name}</td>
                <td className="px-4 py-3 whitespace-nowrap">{area.building}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {area.seatsOpen}/{area.capacity}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const barColor =
                        area.occupancyPct <= 50
                          ? 'bg-green-500'
                          : area.occupancyPct < 75
                            ? 'bg-orange-400'
                            : 'bg-red-500'
                      return (
                        <div className="h-2 w-20 overflow-hidden rounded-full bg-gray-200">
                          <div
                            className={`h-full ${barColor}`}
                            style={{ width: `${area.occupancyPct}%` }}
                          />
                        </div>
                      )
                    })()}
                    <span>{area.occupancyPct}%</span>
                  </div>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}

export default SearchPage 