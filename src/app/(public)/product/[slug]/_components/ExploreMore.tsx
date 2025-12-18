/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Container } from "@/src/components/common/container";
import ProductCard from "@/src/components/common/product-card";
import { Button } from "@/src/components/ui/button";

import { product_data } from "@/src/lib/data";
import { useGetAllProductsQuery } from "@/src/redux/api/product-api";

export default function ExploreMore() {
  const { data, isLoading, isError } = useGetAllProductsQuery({});

  const productData = data?.data?.data;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 },
    },
  });

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

    // onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const handleAddToCart = (productId: string) => {
    console.log(`Added product ${productId} to cart`);
    // Implement your add to cart logic here
    alert(`Product ${productId} added to cart!`);
  };

  const handleBuyNow = (productId: string) => {
    console.log(`Buy now clicked for product ${productId}`);
    // Implement your buy now logic here
    alert(`Redirecting to checkout for product ${productId}`);
  };

  return (
    <div className="py-2 lg:py-4">
      <Container className="c">
        <div className="flex items-center justify-between mb-4 relative">
          <h1 className="text-2xl font-medium text-gray-900 ">
            Recommended For You
          </h1>
          {/* <div className="flex gap-2">
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

          {/* Navigation Controls (Prev/Next/Dots) */}

          <button
            onClick={scrollPrev}
            className="absolute cursor-pointer left-0 top-48 -translate-y-1/2 bg-white/60 backdrop-blur-sm hover:bg-white transition-all duration-200 rounded-full p-1 sm:p-2 z-10 border"
          >
            <ChevronLeft className="md:size-6 size-4 text-slate-700" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 cursor-pointer top-48 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 rounded-full p-1 sm:p-2 z-10 border"
          >
            <ChevronRight className="md:size-6 size-4 text-slate-700" />
          </button>
        </div>

        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {productData?.map((product: any) => (
              <div
                key={product.id}
                className="embla__slide flex-none w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 pl-0 sm:pl-2 first:pl-0"
              >
                <div className="sm:pr-2">
                  <ProductCard
                    product={product as any}
                    onAddToCart={handleAddToCart}
                    // onBuyNow={handleBuyNow}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
