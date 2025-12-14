"use client";

export default function ProductDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      <div className="py-8 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Left side - Image */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-200 rounded-lg" />
            <div className="flex gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg" />
              ))}
            </div>
          </div>

          {/* Right side - Details */}
          <div className="space-y-6">
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-6 w-3/4 bg-gray-200 rounded" />

            <div className="flex items-center gap-4">
              <div className="h-4 w-20 bg-gray-200 rounded" />
              <div className="h-4 w-16 bg-gray-200 rounded" />
            </div>

            <div className="h-6 w-20 bg-gray-200 rounded" />
            <div className="flex gap-3 pt-1">
              <div className="flex-1 h-10 bg-gray-200 rounded" />
              <div className="flex-1 h-10 bg-gray-200 rounded" />
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded-md" />
              ))}
            </div>

            <div className="md:flex md:gap-4 pt-4">
              <div className="flex-1 h-12 bg-gray-200 rounded" />
              <div className="flex-1 h-12 bg-gray-200 rounded" />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-3">
          <div className="h-5 w-40 bg-gray-200 rounded" />
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 w-full bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
