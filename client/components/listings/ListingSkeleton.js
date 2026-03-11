export default function ListingSkeleton() {
  return (
    <div suppressHydrationWarning className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden h-full flex flex-col animate-pulse">
      {/* Image Skeleton */}
      <div suppressHydrationWarning className="h-56 bg-slate-100" />

      {/* Content Skeleton */}
      <div suppressHydrationWarning className="p-5 flex flex-col flex-1 relative bg-white">
        
        {/* Location Badge Skeleton */}
        <div suppressHydrationWarning className="absolute -top-5 left-4 bg-white px-3 py-1.5 rounded-full shadow-md border border-slate-50 flex items-center gap-2 z-10 w-24 h-8" />

        <div className="mt-4 space-y-3">
          {/* Title Skeleton */}
          <div className="h-6 bg-slate-100 rounded-md w-3/4" />
          <div className="h-6 bg-slate-100 rounded-md w-1/2" />

          {/* Description Skeleton */}
          <div className="space-y-2 mt-4">
            <div className="h-3.5 bg-slate-50 rounded-md w-full" />
            <div className="h-3.5 bg-slate-50 rounded-md w-5/6" />
          </div>
        </div>

        {/* Footer Skeleton */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-100" />
            <div className="space-y-1.5">
              <div className="h-2.5 bg-slate-100 rounded-md w-16" />
              <div className="h-2 bg-slate-50 rounded-md w-12" />
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-50" />
        </div>

      </div>
    </div>
  )
}
