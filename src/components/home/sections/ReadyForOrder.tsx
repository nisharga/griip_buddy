/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Container } from "@/components/common/container";
import ProductCard from "@/components/common/product-card";
import { Button } from "@/components/ui/button";

import { product_data } from "@/lib/data";

export default function ReadyForOrder() {
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

    onSelect(emblaApi);
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
    <main className=" py-8">
      <Container className="c">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-medium text-gray-900">
            Ready For Order
          </h1>
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
          <div className="embla__container flex">
            {product_data.map((product) => (
              <div
                key={product.id}
                className="embla__slide flex-none w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 pl-2 first:pl-0"
              >
                <div className="pr-2">
                  <ProductCard
                    product={product as any}
                    onAddToCart={handleAddToCart}
                    onBuyNow={handleBuyNow}
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
