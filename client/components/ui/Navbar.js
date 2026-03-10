'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link href="/feed" className="text-2xl font-bold text-blue-600">
          Xplore
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-gray-600 hidden sm:block">
                Hi, {user.name}
              </span>
              <Link
                href="/create"
                className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                + New Listing
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-600 hover:text-red-500 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm text-gray-600 hover:text-blue-600">
                Log in
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  )
}