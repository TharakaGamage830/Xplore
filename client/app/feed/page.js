'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import Navbar from '@/components/ui/Navbar'
import ListingCard from '@/components/listings/ListingCard'
import ListingSkeleton from '@/components/listings/ListingSkeleton'
import api from '@/lib/api'

export default function FeedPage() {
  const { user } = useAuth()
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [activeTab, setActiveTab] = useState('explore') // explore, saved, liked

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true)
      try {
        let endpoint = '/listings'
        let params = { search }
        
        if (activeTab === 'saved') {
          endpoint = '/listings/saved'
          params = {} // Saved often doesn't need search for now
        } else if (activeTab === 'liked') {
          endpoint = '/listings/liked'
          params = {}
        }

        const res = await api.get(endpoint, { params })
        setListings(res.data.listings)
      } catch (err) {
        setError('Failed to load listings')
      } finally {
        setLoading(false)
      }
    }
    fetchListings()
  }, [search, activeTab])

  const handleSearch = (e) => {
    e.preventDefault()
    setSearch(searchInput)
  }

  const handleClear = () => {
    setSearchInput('')
    setSearch('')
  }

  const tabs = [
    { id: 'explore', name: 'Explore', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5a2.5 2.5 0 012.5 2.5v.5m-6.5 6.5l.074.074A2 2 0 0113 18v-1.5a2 2 0 00-2-2h-3a2 2 0 01-2-2V7H4.062M20 12a8 8 0 11-16 0 8 8 0 0116 0z" /></svg>
    )},
    { id: 'saved', name: 'Saved', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
    )},
    { id: 'liked', name: 'Liked', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
    )}
  ]

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

        {search && !loading && (activeTab === 'explore') && (
          <p className="text-sm text-slate-500 mb-6 font-medium bg-white px-4 py-2 rounded-lg inline-block shadow-sm">
            {listings.length} result{listings.length !== 1 ? 's' : ''} for{' '}
            <span className="font-bold text-teal-700">"{search}"</span>
          </p>
        )}

        {/* Tab Switcher & Actions */}
        {loading || (user && !loading) ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 w-fit">
              {loading ? (
                <div className="flex gap-2 px-6 py-2.5">
                  <div className="w-20 h-5 bg-slate-100 animate-pulse rounded-md" />
                  <div className="w-20 h-5 bg-slate-100 animate-pulse rounded-md" />
                  <div className="w-20 h-5 bg-slate-100 animate-pulse rounded-md" />
                </div>
              ) : (
                tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30 -translate-y-0.5'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                    }`}
                  >
                    {tab.icon}
                    {tab.name}
                  </button>
                ))
              )}
            </div>

            {loading ? (
              <div suppressHydrationWarning className="w-32 h-11 bg-slate-100 animate-pulse rounded-2xl" />
            ) : user && (
              <Link
                href="/create"
                className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-8 py-3 rounded-2xl text-sm font-bold hover:shadow-xl hover:shadow-teal-500/30 hover:-translate-y-1 transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                <span>New Listing</span>
              </Link>
            )}
          </div>
        ) : null}

        {/* Loading Skeleton Grid */}
        {loading && (
          <div suppressHydrationWarning className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <ListingSkeleton key={idx} />
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-20 text-red-500">{error}</div>
        )}

        {!loading && !error && listings.length === 0 && (
          <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm px-6">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
               {activeTab === 'saved' ? (
                 <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
               ) : activeTab === 'liked' ? (
                 <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
               ) : (
                 <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
               )}
            </div>
            {search ? (
              <>
                <p className="text-slate-800 text-xl font-bold">No results found for "{search}"</p>
                <p className="text-slate-400 mt-2 font-medium">Try checking your spelling or use more general terms.</p>
              </>
            ) : activeTab === 'saved' ? (
              <>
                <p className="text-slate-800 text-xl font-bold">No saved experiences yet</p>
                <p className="text-slate-400 mt-2 font-medium">Items you save for later will appear here.</p>
              </>
            ) : activeTab === 'liked' ? (
              <>
                <p className="text-slate-800 text-xl font-bold">No liked experiences yet</p>
                <p className="text-slate-400 mt-2 font-medium">Experiences you've liked will be gathered here.</p>
              </>
            ) : (
              <>
                <p className="text-slate-800 text-xl font-bold">No listings yet</p>
                <p className="text-slate-400 mt-2 font-medium">Be the first to share an unforgettable travel experience!</p>
              </>
            )}
          </div>
        )}

        {/* Grid */}
        {!loading && !error && listings.length > 0 && (
          <div suppressHydrationWarning className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}