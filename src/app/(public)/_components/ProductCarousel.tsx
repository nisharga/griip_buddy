/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/src/components/common/container";
import ProductCard from "@/src/components/common/product-card";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { useGetAllProductsQuery } from "@/src/redux/api/product-api";
import ProductCardSkeleton from "@/src/components/skeleton/ProductCardSkeleton";

const categoryLabel = "Mobile Cover";

export default function ProductCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 },
    },
  });

  const {
    data: productData = [],
    isLoading,
    isError,
  } = useGetAllProductsQuery({});

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: any) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const handleAddToCart = (productId: string) => {
    console.log(`Added product ${productId} to cart`);
  };

  if (isError) {
    return null;
  }
  return (
    <Container className="pb-4 sm:pb-8 px-0 sm:px-2 lg:px-4 relative">
      {/* Navigation Controls (Prev/Next/Dots) */}

      <button
        onClick={scrollPrev}
        className="absolute cursor-pointer left-0 top-1/2 -translate-y-1/2 bg-white/60 backdrop-blur-sm hover:bg-white transition-all duration-200 rounded-full p-1 sm:p-2 z-10 border"
      >
        <ChevronLeft className="md:size-6 size-4 text-slate-700" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-0 cursor-pointer top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 rounded-full p-1 sm:p-2 z-10 border"
      >
        <ChevronRight className="md:size-6 size-4 text-slate-700" />
      </button>
      {/* End Navigation Controls (Prev/Next/Dots) */}

      <div className="flex items-center justify-between mb-2 sm:mb-4 px-2 sm:px-0">
        {/* old title */}
        {/*  <div>
          <h1 className="text-xl sm:text-2xl font-medium text-gray-900">
            {categoryLabel}
          </h1>
          <Link
            className="py-3 hover:text-primary hover:underline text-sm sm:text-base"
            href={"/view-category"}
          >
            View All
          </Link>
        </div> */}

        <div className="flex items-center justify-between w-full">
          <div>
            <h3 className="font-bold uppercase tracking-wide text-secondary">
              {categoryLabel}
            </h3>
            <div className="mt-1 h-0.5 w-full bg-secondary"></div>
          </div>
          <Link
            className="inline-flex text-xs items-center gap-2"
            href="/view-category"
          >
            <button
              data-slot="button"
              className="whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-xs has-[&gt;svg]:px-2.5 bg-secondary text-xs text-white hover:bg-secondary/90 rounded-md px-2 h-7 flex items-center justify-center md:h-9 gap-0"
            >
              See More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-chevron-right size-3"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </button>
          </Link>
        </div>

        {/* old slider arrow */}
        {/*  <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            className="h-8 w-8 bg-transparent shadow-none"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            className="h-8 w-8 shadow-none bg-transparent"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next slide</span>
          </Button>
        </div> */}
      </div>

      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="embla__slide flex-none w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 sm:pl-2 first:pl-0"
                >
                  <ProductCardSkeleton />
                </div>
              ))
            : productData?.map((product) => (
                <div
                  key={product.id}
                  className={`embla__slide flex-none w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 pl sm:pl-2 first:pl-0`}
                >
                  <div className="pr-0">
                    <ProductCard
                      product={product as any}
                      onAddToCart={handleAddToCart}
                    />
                  </div>
                </div>
              ))}
        </div>
      </div>
    </Container>
  );
}
