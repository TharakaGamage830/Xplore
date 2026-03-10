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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative bg-slate-900 border-b border-transparent">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Travel background mountain" 
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/20 to-slate-900/60" />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 pt-24 pb-16 text-center z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white tracking-tight drop-shadow-lg">
            Go Boundless
          </h1>
          <p className="text-slate-100 text-xl md:text-2xl max-w-2xl mx-auto font-medium drop-shadow-md mb-12">
            Discover hidden gems, connect with local explorers, and share your most unforgettable travel experiences.
          </p>
          
          {/* Search Bar Float */}
          <div className="max-w-3xl mx-auto drop-shadow-2xl">
            <form onSubmit={handleSearch} className="glass rounded-2xl p-3 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </span>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Where do you want to explore?"
                  className="w-full bg-white/90 border-0 rounded-xl pl-14 pr-4 py-4 text-slate-800 placeholder:text-slate-500 focus:ring-2 focus:ring-teal-500 transition-all font-medium text-lg outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-10 py-4 rounded-xl text-lg font-bold hover:shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5 transition-all w-full sm:w-auto"
              >
                Search
              </button>
              {search && (
                 <button
                   type="button"
                   onClick={handleClear}
                   className="bg-white/90 border border-slate-200 text-slate-600 px-8 py-4 rounded-xl text-lg hover:bg-slate-50 transition-colors w-full sm:w-auto font-semibold"
                 >
                   Clear
                 </button>
              )}
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-12 pb-24 flex-1 w-full">

        {/* Search Result Info */}
        {search && !loading && (
          <p className="text-sm text-slate-500 mb-6 font-medium bg-white px-4 py-2 rounded-lg inline-block shadow-sm">
            {listings.length} result{listings.length !== 1 ? 's' : ''} for{' '}
            <span className="font-bold text-teal-700">"{search}"</span>
          </p>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-teal-500"></div>
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