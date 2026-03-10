'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/ui/Navbar'
import api from '@/lib/api'
import { useAuth } from '@/context/AuthContext'

export default function CreateListingPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  const [form, setForm] = useState({
    title: '',
    location: '',
    imageUrl: '',
    description: '',
    price: ''
  })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Redirect if not logged in
  if (!loading && !user) {
    router.push('/login')
    return null
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const payload = {
        title: form.title,
        location: form.location,
        imageUrl: form.imageUrl,
        description: form.description,
        price: form.price ? Number(form.price) : null
      }

      const res = await api.post('/listings', payload)
      router.push(`/listings/${res.data.listing._id}`)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create listing')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col">
      <Navbar />

      {/* Decorative Background Shapes */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-teal-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>

      <div className="max-w-3xl mx-auto px-4 py-12 w-full relative z-10 flex-1">

        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Create New Listing</h1>
          <p className="text-slate-500 mt-3 font-medium text-lg">Share your unforgettable travel experience with the world</p>
        </div>

        <div className="glass p-8 sm:p-10 rounded-3xl shadow-2xl border border-white/60">

          {/* Error */}
          {error && (
            <div className="bg-red-50 text-red-600 px-5 py-4 rounded-xl mb-8 text-sm font-medium border border-red-100 flex items-center gap-3 shadow-inner">
              <span className="text-lg">⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Experience Title <span className="text-teal-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Sunset Boat Tour in Santorini"
                required
                className="w-full bg-white/70 border border-slate-200 rounded-xl px-5 py-3.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all shadow-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Location <span className="text-teal-500">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Bali, Indonesia"
                  required
                  className="w-full bg-white/70 border border-slate-200 rounded-xl px-5 py-3.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all shadow-sm"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Price <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    min="0"
                    className="w-full bg-white/70 border border-slate-200 rounded-xl pl-8 pr-5 py-3.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Image URL <span className="text-teal-500">*</span>
              </label>
              <input
                type="url"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/stunning-view.jpg"
                required
                className="w-full bg-white/70 border border-slate-200 rounded-xl px-5 py-3.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all shadow-sm"
              />
              {/* Image Preview */}
              {form.imageUrl && (
                <div className="mt-4 h-56 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-md relative group">
                  <img
                    src={form.imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Description <span className="text-teal-500">*</span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe what makes this experience special..."
                required
                rows={5}
                className="w-full bg-white/70 border border-slate-200 rounded-xl px-5 py-4 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all shadow-sm resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 bg-white/80 border border-slate-200 text-slate-600 py-3.5 rounded-xl text-lg font-semibold hover:bg-slate-50 hover:text-slate-800 transition-colors shadow-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3.5 rounded-xl text-lg font-bold shadow-md hover:shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {submitting ? 'Publishing...' : 'Publish Experience'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}