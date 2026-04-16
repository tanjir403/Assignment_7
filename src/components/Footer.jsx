import { FiFacebook, FiInstagram, FiX } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="mt-16 bg-[#2f6f60] text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 text-center sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold">
          <span className="text-white">Keen</span>
          <span className="text-green-200">Keeper</span>
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-200">
          Your personal shelf of meaningful connections. Browse, trend, and
          nurture the relationships that matter most.
        </p>

        <div className="mt-6">
          <p className="mb-3 text-sm font-medium text-gray-100">Social Links</p>

          <div className="flex justify-center gap-3">
            <button className="rounded-full bg-white p-2 text-slate-800">
              <FiFacebook size={16} />
            </button>
            <button className="rounded-full bg-white p-2 text-slate-800">
              <FiInstagram size={16} />
            </button>
            <button className="rounded-full bg-white p-2 text-slate-800">
              <FiX size={16} />
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 text-xs text-gray-300 md:flex-row">
          <p>© 2026 KeenKeeper. All rights reserved.</p>

          <div className="flex gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer