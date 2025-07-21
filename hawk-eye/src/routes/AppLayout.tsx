import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { StudyDataProvider } from '../contexts/StudyDataContext'

function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <StudyDataProvider>
        <div className="flex-1 bg-white">
          <Outlet />
        </div>
      </StudyDataProvider>
      <Footer />
    </div>
  )
}

export default AppLayout 