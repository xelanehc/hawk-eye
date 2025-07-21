import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import AppLayout from './routes/AppLayout'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import AreaDetail from './pages/AreaDetail'
import SearchPage from './pages/Search'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/about" element={<About />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/area/:areaId" element={<AreaDetail />} />
    </Route>,
  ),
)

export default router 