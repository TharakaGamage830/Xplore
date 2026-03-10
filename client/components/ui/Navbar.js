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
    <nav className="glass sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link href="/feed" className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500 tracking-tight flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-2xl text-black">✈️</span> Xplore
        </Link>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-slate-500 font-medium">
                Hi, <span className="font-bold text-slate-800">{user.name}</span>
              </span>
              <Link
                href="/create"
                className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5 transition-all font-semibold"
              >
                + New Listing
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-slate-500 hover:text-red-500 font-medium transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5 transition-all font-semibold"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="sm:hidden text-slate-600 focus:outline-none p-2 rounded-lg hover:bg-slate-100 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-white/95 backdrop-blur-md border-t border-slate-100 px-4 py-4 flex flex-col gap-4 shadow-xl absolute w-full test-mobile-menu">
          {user ? (
            <>
              <p className="text-sm text-slate-500 px-2">
                Hi, <span className="font-bold text-slate-800">{user.name}</span>
              </p>
              <Link
                href="/create"
                onClick={() => setMenuOpen(false)}
                className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm px-4 py-3 rounded-xl text-center font-semibold shadow-md"
              >
                + New Listing
              </Link>
              <button
                onClick={() => { handleLogout(); setMenuOpen(false) }}
                className="text-sm text-red-500 text-left font-medium px-2 py-2 hover:bg-red-50 rounded-lg transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-slate-600 px-2 py-2 hover:bg-slate-50 rounded-lg transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm px-4 py-3 rounded-xl text-center font-semibold shadow-md"
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