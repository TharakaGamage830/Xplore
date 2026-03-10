'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/ui/Navbar'
import ListingCard from '@/components/listings/ListingCard'
import api from '@/lib/api'

export default function FeedPage() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await api.get('/listings')
        setListings(res.data.listings)
      } catch (err) {
        setError('Failed to load listings')
      } finally {
        setLoading(false)
      }
    }
    fetchListings()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Discover Experiences</h1>
          <p className="text-gray-500 mt-1">Find unique travel experiences around the world</p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-20 text-red-500">{error}</div>
        )}

        {/* Empty */}
        {!loading && !error && listings.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No listings yet</p>
            <p className="text-gray-400 text-sm mt-1">Be the first to share an experience!</p>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && listings.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}