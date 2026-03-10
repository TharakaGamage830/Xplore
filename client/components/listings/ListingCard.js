import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

export default function ListingCard({ listing }) {
  const timeAgo = formatDistanceToNow(new Date(listing.createdAt), { addSuffix: true })

  return (
    <Link href={`/listings/${listing._id}`}>
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group h-full flex flex-col">

        {/* Image */}
        <div className="h-52 overflow-hidden relative">
          <img
            src={listing.imageUrl}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {listing.price && (
            <span className="absolute top-3 right-3 bg-white text-blue-700 font-bold text-sm px-3 py-1 rounded-full shadow">
              ${listing.price}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">

          {/* Location */}
          <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-1">
            📍 {listing.location}
          </p>

          {/* Title */}
          <h3 className="text-gray-900 font-bold text-lg leading-tight mb-2 group-hover:text-blue-600 transition-colors">
            {listing.title}
          </h3>

          {/* Description */}
          <p className="text-gray-500 text-sm line-clamp-2 flex-1 mb-4">
            {listing.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                {listing.createdBy?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-xs font-medium text-gray-700">{listing.createdBy?.name}</p>
                <p className="text-xs text-gray-400">{timeAgo}</p>
              </div>
            </div>
            <span className="text-blue-600 text-xs font-medium group-hover:underline">
              View →
            </span>
          </div>

        </div>
      </div>
    </Link>
  )
}