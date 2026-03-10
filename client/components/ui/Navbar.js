'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link href="/feed" className="text-2xl font-bold text-blue-600 tracking-tight">
          ✈️ Xplore
        </Link>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-gray-500">
                Hi, <span className="font-medium text-gray-700">{user.name}</span>
              </span>
              <Link
                href="/create"
                className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                + New Listing
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-500 hover:text-red-500 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-gray-600 hover:text-blue-600 transition"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="sm:hidden text-gray-600 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-3">
          {user ? (
            <>
              <p className="text-sm text-gray-500">
                Hi, <span className="font-medium text-gray-700">{user.name}</span>
              </p>
              <Link
                href="/create"
                onClick={() => setMenuOpen(false)}
                className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg text-center font-medium"
              >
                + New Listing
              </Link>
              <button
                onClick={() => { handleLogout(); setMenuOpen(false) }}
                className="text-sm text-red-500 text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="text-sm text-gray-600"
              >
                Log in
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg text-center font-medium"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}