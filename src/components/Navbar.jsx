import { NavLink } from 'react-router-dom'
import { FiHome, FiBarChart2, FiClock } from 'react-icons/fi'

const navItems = [
  { to: '/', label: 'Home', icon: <FiHome size={15} /> },
  { to: '/timeline', label: 'Timeline', icon: <FiClock size={15} /> },
  { to: '/stats', label: 'Stats', icon: <FiBarChart2 size={15} /> },
]

const Navbar = () => {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-extrabold tracking-tight">
          <span className="text-slate-900">Keen</span>
          <span className="text-[#2f6f60]">Keeper</span>
        </h1>

        <nav className="flex items-center gap-3 sm:gap-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-[#2f6f60] text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar