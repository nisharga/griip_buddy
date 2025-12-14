import { List, ChevronRight } from "lucide-react"

export default function LoadingHeroSkeleton() {
    return (
        <div className="w-full flex flex-col lg:flex-row h-auto md:max-h-[430px] gap-0.5 sm:gap-4 md:gap-5 sm:max-container">
            {/* Desktop categories skeleton */}
            <div className="w-full hidden lg:flex flex-col shrink-0 max-w-[340px] h-auto rounded-t-xl overflow-hidden drop-shadow-[1px_1px_4px_0px_#0000001A]">
                <div className="w-full h-fit px-4 py-3 text-background font-medium bg-primary p-4 rounded-t-lg flex items-center gap-2 sticky top-0 z-10">
                    <h1 className="flex items-center gap-2">
                        <List size={20} /> All Categories
                    </h1>
                </div>
                <div className="w-full h-auto grow bg-white px-4 overflow-auto hide-scrollbar">
                    {/* Category skeleton items */}
                    {Array(8)
                        .fill(0)
                        .map((_, i) => (
                            <div className="py-3 border-b border-[#E5E5E5] flex items-center justify-between" key={i}>
                                <div className="flex items-center gap-2">
                                    <div className="w-[50px] h-[50px] rounded-md bg-gray-200 relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                    </div>
                                    <div className="w-32 h-5 bg-gray-200 rounded relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                    </div>
                                </div>
                                <ChevronRight className="size-4 text-gray-200" />
                            </div>
                        ))}
                </div>
            </div>

            {/* Hero images skeleton */}
            <div className="grow sm:rounded lg:rounded-xl overflow-hidden h-fit order-1 lg:order-2">
                <div className="h-fit md:h-full w-full relative overflow-hidden">
                    {/* Desktop banner skeleton */}
                    <div className="hidden sm:block w-full lg:max-h-[430px] h-[300px] md:h-[430px] bg-gray-200 relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                    </div>

                    {/* Mobile banner skeleton */}
                    <div className="block sm:hidden w-full h-[150px] bg-gray-200 relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                    </div>

                    {/* Dots skeleton */}
                    <div className="flex justify-center items-center z-50 absolute bottom-2 md:bottom-4 w-full gap-1">
                        {Array(4)
                            .fill(0)
                            .map((_, inx) => (
                                <div key={inx} className={`rounded-full bg-gray-300 ${inx === 0 ? "w-8" : "w-2"} h-2`}></div>
                            ))}
                    </div>
                </div>
            </div>

            {/* Mobile categories skeleton */}
            <div className="order-2 lg:hidden w-full px-2 sm:px-0 mt-4">
                <div className="w-full flex items-center justify-between">
                    <h1>Categories</h1>
                    <div className="w-12 h-4 bg-gray-200 rounded relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                    </div>
                </div>
                <div className="w-full overflow-scroll flex items-center gap-1.5 no-scrollbar mt-2 pb-2">
                    {Array(8)
                        .fill(0)
                        .map((_, i) => (
                            <div className="flex flex-col items-center gap-1 min-w-[60px] p-2 bg-white rounded-lg" key={i}>
                                <div className="w-[30px] h-[30px] rounded-full bg-gray-200 relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                </div>
                                <div className="w-12 h-3 bg-gray-200 rounded relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-white to-gray-200"></div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}