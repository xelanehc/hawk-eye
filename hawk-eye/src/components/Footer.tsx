function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-100 py-6 mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
        <span>© {year} Hawk-Eye. All rights reserved.</span>
        <div className="flex items-center gap-4">
          {/* Social Icon placeholders */}
          <a href="#" className="hover:text-blue-600">Twitter</a>
          <a href="#" className="hover:text-blue-600">LinkedIn</a>
          <a href="#" className="hover:text-blue-600">GitHub</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer 