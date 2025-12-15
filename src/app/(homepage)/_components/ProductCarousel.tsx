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

type ProductCarouselProps = {
  categoryLabel: string;
};

export default function ProductCarousel({
  categoryLabel,
}: ProductCarouselProps) {
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

    onSelect(emblaApi);
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
    <main className="py-8">
      <Container className="c">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-medium text-gray-900">
              {categoryLabel}
            </h1>
            <Link
              className="py-3 hover:text-primary hover:underline"
              href={"/view-category"}
            >
              View All
            </Link>
          </div>

          <div className="flex gap-2">
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
          </div>
        </div>

        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex pb-4">
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="embla__slide flex-none w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 pl-2 first:pl-0"
                  >
                    <ProductCardSkeleton />
                  </div>
                ))
              : productData?.map((product) => (
                  <div
                    key={product.id}
                    className={`embla__slide flex-none w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 pl-2 first:pl-0`}
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
    </main>
  );
}
