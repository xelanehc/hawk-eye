import { Link, NavLink } from 'react-router-dom'
import { MagnifyingGlassIcon, BellIcon } from '@heroicons/react/24/outline'

function NavBar() {
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`

  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Left - Brand */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
          <span>StudySpot</span>
        </Link>

        {/* Center - Nav links */}
        <nav className="hidden md:flex items-center gap-4">
          <NavLink to="/" className={navLinkClasses} end>
            Home
          </NavLink>
          <NavLink to="/dashboard" className={navLinkClasses}>
            Dashboard
          </NavLink>
          <NavLink to="/search" className={navLinkClasses}>
            Search
          </NavLink>
          <NavLink to="/about" className={navLinkClasses}>
            About
          </NavLink>
        </nav>

        {/* Right - Icons */}
        <div className="flex items-center gap-4">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-600 hover:text-blue-600 cursor-pointer" />
          <BellIcon className="h-6 w-6 text-gray-600 hover:text-blue-600 cursor-pointer" />
          <div className="h-8 w-8 rounded-full bg-gray-300" />
        </div>
      </div>
    </header>
  )
}

export default NavBar 