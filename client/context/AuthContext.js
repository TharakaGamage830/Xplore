'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { getMe, loginUser, registerUser, logoutUser } from '@/lib/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMe()
        setUser(res.data.user)
      } catch (err) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const login = async (email, password) => {
    const res = await loginUser({ email, password })
    setUser(res.data.user)
    return res.data
  }

  const register = async (name, email, password) => {
    const res = await registerUser({ name, email, password })
    return res.data
  }

  const logout = async () => {
    await logoutUser()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)