import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <Navbar />

      <main className="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="rounded-md border border-gray-200 bg-gray-50 px-8 py-14">
          <h1 className="text-6xl font-bold text-[#2f6f60]">404</h1>
          <p className="mt-4 text-xl font-semibold text-slate-800">
            Oops! Page not found
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm text-gray-500">
            The page you are looking for does not exist or may have been moved.
          </p>

          <Link
            to="/"
            className="mt-6 inline-block rounded-md bg-[#2f6f60] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#285e52]"
          >
            Back to Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default NotFound