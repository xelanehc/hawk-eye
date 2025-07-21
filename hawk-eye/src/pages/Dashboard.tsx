import { useStudyData } from '../contexts/StudyDataContext'

function Dashboard() {
  const { studyAreas } = useStudyData()

  const popularAreas = studyAreas.slice(0, 4)

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <section className="mb-10 text-center animate-fadeIn">
        <h1 className="text-4xl font-bold mb-2">Find Your Perfect Study Spot</h1>
        <p className="text-gray-600 mb-6">Real-time seat availability across campus</p>

        {/* Placeholder global search bar */}
        <div className="mx-auto w-full max-w-lg">
          <input
            type="text"
            placeholder="Search for a study area (demo placeholder)"
            className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
            disabled
          />
        </div>
      </section>

      {/* Popular Study Areas */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Popular Study Areas</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popularAreas.map((area) => (
            <div
              key={area.id}
              className="rounded-lg border border-gray-200 p-4 shadow-sm transition hover:shadow-md"
            >
              <h3 className="text-lg font-medium mb-2">{area.name}</h3>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full bg-blue-600 transition-all"
                  style={{ width: `${area.occupancyPct}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-gray-600">
                {area.occupancyPct}% occupied • {area.seatsOpen} open / {area.capacity}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* All Study Areas table */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">All Study Areas</h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Study Area</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Building</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Occupancy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {studyAreas.map((area) => (
                <tr key={area.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">{area.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{area.building}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full bg-blue-600"
                          style={{ width: `${area.occupancyPct}%` }}
                        />
                      </div>
                      <span>{area.occupancyPct}%</span>
                      <a
                        href={`/area/${area.id}`}
                        className="ml-4 text-blue-600 hover:underline"
                      >
                        Details
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}

export default Dashboard 