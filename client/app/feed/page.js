'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/ui/Navbar'
import ListingCard from '@/components/listings/ListingCard'
import api from '@/lib/api'

export default function FeedPage() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true)
      try {
        const res = await api.get('/listings', {
          params: { search }
        })
        setListings(res.data.listings)
      } catch (err) {
        setError('Failed to load listings')
      } finally {
        setLoading(false)
      }
    }
    fetchListings()
  }, [search])

  const handleSearch = (e) => {
    e.preventDefault()
    setSearch(searchInput)
  }

  const handleClear = () => {
    setSearchInput('')
    setSearch('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Discover Experiences</h1>
          <p className="text-gray-500 mt-1">Find unique travel experiences around the world</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-8">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by title, location or description..."
              className="w-full border border-gray-300 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            Search
          </button>
          {search && (
            <button
              type="button"
              onClick={handleClear}
              className="border border-gray-300 text-gray-600 px-4 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition"
            >
              Clear
            </button>
          )}
        </form>

        {/* Search Result Info */}
        {search && !loading && (
          <p className="text-sm text-gray-500 mb-4">
            {listings.length} result{listings.length !== 1 ? 's' : ''} for{' '}
            <span className="font-medium text-gray-700">"{search}"</span>
          </p>
        )}

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
            {search ? (
              <>
                <p className="text-gray-400 text-lg">No results found for "{search}"</p>
                <p className="text-gray-400 text-sm mt-1">Try a different search term</p>
              </>
            ) : (
              <>
                <p className="text-gray-400 text-lg">No listings yet</p>
                <p className="text-gray-400 text-sm mt-1">Be the first to share an experience!</p>
              </>
            )}
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