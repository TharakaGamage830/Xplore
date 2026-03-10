'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import Navbar from '@/components/ui/Navbar'
import api from '@/lib/api'
import { useAuth } from '@/context/AuthContext'

export default function ListingDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { user } = useAuth()

  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await api.get(`/listings/${id}`)
        const data = res.data.listing
        setListing(data)
        setLikesCount(data.likes?.length || 0)

        if (user) {
          setLiked(data.likes?.includes(user.id))
        }
      } catch (err) {
        setError('Listing not found')
      } finally {
        setLoading(false)
      }
    }
    fetchListing()
  }, [id, user])

  // Check saved status
  useEffect(() => {
    const checkSaved = async () => {
      if (!user) return
      try {
        const res = await api.get('/listings/saved')
        const savedIds = res.data.listings.map(l => l._id)
        setSaved(savedIds.includes(id))
      } catch (err) {}
    }
    checkSaved()
  }, [id, user])

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this listing?')) return
    setDeleting(true)
    try {
      await api.delete(`/listings/${id}`)
      router.push('/feed')
    } catch (err) {
      alert('Failed to delete listing')
      setDeleting(false)
    }
  }

  const handleLike = async () => {
    if (!user) { router.push('/login'); return }
    try {
      const res = await api.put(`/listings/${id}/like`)
      setLiked(res.data.isLiked)
      setLikesCount(res.data.likesCount)
    } catch (err) {}
  }

  const handleSave = async () => {
    if (!user) { router.push('/login'); return }
    try {
      const res = await api.put(`/listings/${id}/save`)
      setSaved(res.data.isSaved)
    } catch (err) {}
  }

  const isOwner = user && listing && user.id === listing.createdBy?._id

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-teal-500"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col justify-center items-center text-center px-4">
          <span className="text-6xl mb-4">🏜️</span>
          <p className="text-slate-600 text-xl font-medium mb-6">{error}</p>
          <Link href="/feed" className="bg-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-teal-600 transition-colors shadow-md">
            ← Back to Explore
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8 w-full flex-1">

        {/* Back Button */}
        <Link href="/feed" className="inline-flex items-center gap-2 text-slate-500 font-medium hover:text-teal-600 transition-colors mb-6 group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Feed
        </Link>

        <div className="glass rounded-3xl shadow-xl overflow-hidden border border-white/60">

          {/* Image Header */}
          <div className="h-[400px] md:h-[500px] relative overflow-hidden group">
            <img
              src={listing.imageUrl || 'https://images.unsplash.com/photo-1504280390267-31422abeb8e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'}
              alt={listing.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent pointer-events-none" />
            
            {/* Overlay Location & Price */}
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-3 shadow-lg">
                  📍 {listing.location}
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-md">
                  {listing.title}
                </h1>
              </div>
              {listing.price && (
                <span className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-black text-2xl md:text-3xl px-6 py-2 rounded-2xl shadow-xl border border-white/20">
                  ${listing.price}
                </span>
              )}
            </div>
          </div>

          {/* Content Body */}
          <div className="p-8 md:p-10 bg-white">

            {/* Description */}
            <h3 className="text-xl font-bold text-slate-800 mb-4 font-heading">About this Experience</h3>
            <p className="text-slate-600 leading-relaxed text-lg mb-10 whitespace-pre-wrap">
              {listing.description}
            </p>

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-slate-100 mb-8">
              
              <div className="flex gap-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-sm border ${
                    liked
                      ? 'bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100 hover:shadow-md'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <span className={`text-xl ${liked ? 'scale-110' : ''} transition-transform`}>{liked ? '❤️' : '🤍'}</span>
                  <span>{likesCount} {likesCount === 1 ? 'Like' : 'Likes'}</span>
                </button>

                <button
                  onClick={handleSave}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-sm border ${
                    saved
                      ? 'bg-teal-50 text-teal-600 border-teal-200 hover:bg-teal-100 hover:shadow-md'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <span className="text-xl">🔖</span> {saved ? 'Saved' : 'Save for later'}
                </button>
              </div>

            </div>

            {/* Creator Info + Owner Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 border-2 border-teal-200 flex items-center justify-center text-teal-700 font-bold text-xl shadow-inner">
                  {listing.createdBy?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Experience curated by</p>
                  <p className="text-slate-900 font-bold text-lg">{listing.createdBy?.name}</p>
                  <p className="text-xs text-slate-400 font-medium mt-1">
                    Posted {formatDistanceToNow(new Date(listing.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>

              {/* Owner Actions */}
              {isOwner && (
                <div className="flex gap-3">
                  <Link
                    href={`/listings/${id}/edit`}
                    className="bg-slate-100 text-slate-700 font-semibold px-6 py-3 rounded-xl hover:bg-slate-200 transition-colors shadow-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="bg-rose-50 text-rose-600 font-semibold px-6 py-3 rounded-xl hover:bg-rose-100 border border-rose-100 transition-colors disabled:opacity-50 shadow-sm"
                  >
                    {deleting ? 'Removing...' : 'Delete'}
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}