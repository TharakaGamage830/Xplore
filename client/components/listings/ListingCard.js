import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

export default function ListingCard({ listing }) {
  const timeAgo = formatDistanceToNow(new Date(listing.createdAt), { addSuffix: true })

  return (
    <Link href={`/listings/${listing._id}`}>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer">

        {/* Image */}
        <div className="h-48 overflow-hidden">
          <img
            src={listing.imageUrl}
            alt={listing.title}
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-4">

          {/* Location */}
          <p className="text-xs text-blue-600 font-medium uppercase tracking-wide mb-1">
            📍 {listing.location}
          </p>

          {/* Title */}
          <h3 className="text-gray-900 font-semibold text-lg leading-tight mb-2">
            {listing.title}
          </h3>

          {/* Description */}
          <p className="text-gray-500 text-sm line-clamp-2 mb-4">
            {listing.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400">By {listing.createdBy?.name}</p>
              <p className="text-xs text-gray-400">{timeAgo}</p>
            </div>
            {listing.price && (
              <span className="bg-blue-50 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">
                ${listing.price}
              </span>
            )}
          </div>

        </div>
      </div>
    </Link>
  )
}