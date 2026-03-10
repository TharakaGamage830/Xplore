import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

export default function ListingCard({ listing }) {
  const timeAgo = formatDistanceToNow(new Date(listing.createdAt), { addSuffix: true })

  return (
    <Link href={`/listings/${listing._id}`}>
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 overflow-hidden cursor-pointer group h-full flex flex-col hover:-translate-y-1">

        {/* Image */}
        <div className="h-56 overflow-hidden relative">
          <img
            src={listing.imageUrl || 'https://images.unsplash.com/photo-1504280390267-31422abeb8e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {listing.price && (
            <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-teal-700 font-bold text-sm px-3 py-1.5 rounded-full shadow-lg">
              ${listing.price}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1 relative bg-white">

          {/* Location Badge */}
          <div className="absolute -top-5 left-4 bg-white px-3 py-1.5 rounded-full shadow-md border border-slate-50 flex items-center gap-1 z-10">
            <span className="text-xs">📍</span>
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
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
              <span className="text-slate-400 group-hover:text-teal-600 text-lg transition-colors">→</span>
            </div>
          </div>

        </div>
      </div>
    </Link>
  )
}