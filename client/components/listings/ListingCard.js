import Link from 'next/link'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import LikedByModal from './LikedByModal'

export default function ListingCard({ listing }) {
  const { user } = useAuth()
  const [showLikes, setShowLikes] = useState(false)
  
  const timeAgo = formatDistanceToNow(new Date(listing.createdAt), { addSuffix: true })
  const isAuthor = user && user.id?.toString() === listing.createdBy?._id?.toString()
  const likesCount = listing.likes?.length || 0

  return (
    <>
      <div suppressHydrationWarning className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 overflow-hidden cursor-pointer group h-full flex flex-col hover:-translate-y-1">
        <Link href={`/listings/${listing._id}`} className="flex-1 flex flex-col">
          {/* Image */}
          <div className="h-56 overflow-hidden relative bg-slate-100">
            <Image
              src={listing.imageUrl || 'https://images.unsplash.com/photo-1504280390267-31422abeb8e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
              alt={listing.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Action Bar (Author Only) */}
            {isAuthor && (
              <div className="absolute top-4 left-4 flex gap-2">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowLikes(true);
                  }}
                  className="bg-white/95 backdrop-blur-sm text-slate-700 font-bold text-xs px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 hover:bg-teal-500 hover:text-white transition-all cursor-pointer z-20"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" /></svg>
                  <span>{likesCount} {likesCount === 1 ? 'like' : 'likes'}</span>
                </button>
              </div>
            )}

            {listing.price && (
              <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-teal-700 font-bold text-sm px-3 py-1.5 rounded-full shadow-lg">
                ${listing.price}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-1 relative bg-white">

            {/* Location Badge */}
            <div className="absolute -top-5 left-4 bg-white px-3 py-1.5 rounded-full shadow-md border border-slate-50 flex items-center gap-1.5 z-10 transition-transform group-hover:scale-105">
              <svg className="w-3.5 h-3.5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span className="text-[11px] text-teal-600 font-bold uppercase tracking-wider">
                {listing.location}
              </span>
            </div>

            <div className="mt-3">
              {/* Title */}
              <h3 className="text-slate-900 font-bold text-xl leading-snug mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
                {listing.title}
              </h3>

              {/* Description */}
              <p className="text-slate-500 text-sm line-clamp-2 flex-1 mb-5">
                {listing.description}
              </p>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 border border-teal-200 flex items-center justify-center text-teal-700 font-bold text-xs shadow-inner">
                  {listing.createdBy?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-700">{listing.createdBy?.name}</span>
                  <span className="text-[10px] text-slate-400 font-medium">{timeAgo}</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </div>
            </div>

          </div>
        </Link>
      </div>

      {showLikes && (
        <LikedByModal 
          listingId={listing._id} 
          onClose={() => setShowLikes(false)} 
        />
      )}
    </>
  )
}