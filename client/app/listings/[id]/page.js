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
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="text-center py-20">
          <p className="text-red-500 text-lg">{error}</p>
          <Link href="/feed" className="text-blue-600 text-sm mt-4 inline-block hover:underline">
            ← Back to Feed
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Back Button */}
        <Link href="/feed" className="text-blue-600 text-sm hover:underline mb-6 inline-block">
          ← Back to Feed
        </Link>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">

          {/* Image */}
          <div className="h-72 overflow-hidden">
            <img
              src={listing.imageUrl}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-6">

            {/* Location */}
            <p className="text-blue-600 text-sm font-medium uppercase tracking-wide mb-2">
              📍 {listing.location}
            </p>

            {/* Title + Price */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {listing.title}
              </h1>
              {listing.price && (
                <span className="bg-blue-50 text-blue-700 font-bold text-lg px-4 py-1 rounded-full whitespace-nowrap">
                  ${listing.price}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-6">
              {listing.description}
            </p>

            {/* Like & Save Buttons */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                  liked
                    ? 'bg-red-50 text-red-500 hover:bg-red-100'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {liked ? '❤️' : '🤍'} {likesCount} {likesCount === 1 ? 'Like' : 'Likes'}
              </button>

              <button
                onClick={handleSave}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                  saved
                    ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {saved ? '🔖 Saved' : '🔖 Save'}
              </button>
            </div>

            {/* Creator Info + Owner Actions */}
            <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Posted by</p>
                <p className="text-gray-800 font-medium">{listing.createdBy?.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {formatDistanceToNow(new Date(listing.createdAt), { addSuffix: true })}
                </p>
              </div>

              {/* Owner Actions */}
              {isOwner && (
                <div className="flex gap-3">
                  <Link
                    href={`/listings/${id}/edit`}
                    className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg hover:bg-red-100 transition disabled:opacity-50"
                  >
                    {deleting ? 'Deleting...' : 'Delete'}
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