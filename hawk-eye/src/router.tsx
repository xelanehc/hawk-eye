import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import AppLayout from './routes/AppLayout'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import MapPage from './pages/AreaDetail'
import SearchPage from './pages/Search'
import SeatDetail from './pages/SeatDetail'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route path="/" element={<Dashboard />} />
      <Route path="/about" element={<About />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/map/:areaId" element={<MapPage />} />
      <Route path="/seat/:areaId/:seatId" element={<SeatDetail />} />
    </Route>,
  ),
)

export default router 