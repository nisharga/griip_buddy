"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Share2,
  MessageCircle,
  Settings,
} from "lucide-react";
import Image from "next/image";
import { Container } from "@/src/components/common/container";
import { useGetAllSlidesQuery } from "@/src/redux/api/category-api";
import { useGetAllSlideCardQuery } from "@/src/redux/api/slider-api";
import HeroImageSkeleton, {
  SlideCardSkeleton,
} from "@/src/components/skeleton/HeroImageSkeleton";

const HeroMain = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  /* const slides = [
    {
      id: 1,
      image: "/sample_banner.png",
    },
    {
      id: 2,
      image: "/sample_banner.png",
    },
  ]; */
  const {
    data: slides = [],
    isLoading: isLoadingSlides,
    isError: isErrorSlides,
  } = useGetAllSlidesQuery({});

  const {
    data: sideCards = [],
    isLoading: isLoadingSlideCard,
    isError: isErrorSlideCard,
  } = useGetAllSlideCardQuery({});

  /*  const sideCards = [
    {
      id: 1,
      image:
        "https://res.cloudinary.com/dlxfa1n08/image/upload/v1751185565/image_4_kakzm5.png",
    },
    {
      id: 2,
      image:
        "https://res.cloudinary.com/dlxfa1n08/image/upload/v1751177016/image_3_veify2.png",
    },
  ]; */

  const features = [
    {
      icon: Smartphone,
      title: "Outfit Finder",
      description: "Find Outfit for Gadgets",
    },
    {
      icon: Share2,
      title: "Share Experience",
      description: "We Value your Feedback",
    },
    {
      icon: MessageCircle,
      title: "Online Support",
      description: "Get Support on WhatsApp",
    },
    {
      icon: Settings,
      title: "Customer Care",
      description: "Repair Your Device",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides?.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides?.length) % slides?.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isErrorSlides || isErrorSlideCard) {
    return null;
  }

  return (
    <Container className="py-4 px-0 sm:px-2 lg:px-4">
      {/* Main Hero Section */}
      {/* Main Hero Section: The container handles the full width and overall padding */}
      <div className="mb-0 sm:mb-6 lg:mb-12">
        {/* 1. Side Cards */}
        <div className="hidden lg:grid grid-cols-3 gap-4">
          {/* SLIDER (Takes up 2/3 width) */}
          <div className="lg:col-span-2 relative">
            <div className="relative h-50 md:h-125 overflow-hidden">
              {isLoadingSlides ? (
                <HeroImageSkeleton currentSlide={currentSlide} />
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="absolute inset-0"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        sizes="100vw"
                        fill
                        src={slides[currentSlide]?.image}
                        alt={`Product ${currentSlide + 1}`}
                        className="w-full h-full object-cover"
                        priority={currentSlide === 0}
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}

              {/* Navigation Controls (Prev/Next/Dots) */}
              <button
                onClick={prevSlide}
                className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 rounded-full p-2 z-10"
              >
                <ChevronLeft className="md:size-6 size-4 text-slate-700" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 cursor-pointer top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 rounded-full p-2 z-10"
              >
                <ChevronRight className="md:size-6 size-4 text-slate-700" />
              </button>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {isLoadingSlides
                  ? ""
                  : slides?.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-3 rounded-full transition-all duration-300 ${
                          index === currentSlide
                            ? "bg-orange-500 w-8"
                            : "bg-white/60 hover:bg-white/80 w-3"
                        }`}
                      />
                    ))}
              </div>
            </div>
          </div>

          {/* SIDE CARDS (Takes up 1/3 width, stacked vertically) */}
          <div className="grid grid-cols-1 gap-4">
            {/* Use a simple grid for stacking */}
            {isLoadingSlideCard ? (
              <SlideCardSkeleton />
            ) : (
              sideCards?.map((card) => (
                <div
                  key={card.id}
                  className="h-full overflow-hidden relative group cursor-pointer transition-all duration-300"
                >
                  <div className="relative w-full h-full aspect-2/1">
                    {/* Using aspect ratio for height control */}
                    <Image
                      sizes="100vw"
                      fill
                      src={card.image}
                      alt={`Side product`}
                      className="w-full h-full object-cover transition-transform duration-300"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 2. MD/SM Layout (Only Slider, Full Width) */}
        {/* This structure is ONLY visible between 'sm' and 'lg' screen sizes. */}
        <div className="hidden sm:block lg:hidden">
          {/* SLIDER (Full Width) */}
          <div className="relative">
            <div className="relative h-50 md:h-125 overflow-hidden">
              {/* SLIDER CONTENT HERE (Identical to LG slider content, but full width) */}
              {/* ... (AnimatePresence, motion.div, Image, Nav buttons, Dots) ... */}
              {isLoadingSlides ? (
                <HeroImageSkeleton currentSlide={currentSlide} />
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="absolute inset-0"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        sizes="100vw"
                        fill
                        src={slides[currentSlide]?.image}
                        alt={`Product ${currentSlide + 1}`}
                        className="w-full h-full object-cover"
                        priority={currentSlide === 0}
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}

              <button
                onClick={prevSlide}
                className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 rounded-full p-2 z-10"
              >
                <ChevronLeft className="md:size-6 size-4 text-slate-700" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 cursor-pointer top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 rounded-full p-2 z-10"
              >
                <ChevronRight className="md:size-6 size-4 text-slate-700" />
              </button>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {isLoadingSlides
                  ? ""
                  : slides?.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-3 rounded-full transition-all duration-300 ${
                          index === currentSlide
                            ? "bg-orange-500 w-8"
                            : "bg-white/60 hover:bg-white/80 w-3"
                        }`}
                      />
                    ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Mobile Layout (Slider + Side Cards stacked at the bottom) */}
        {/* This structure is ONLY visible on 'sm' screens and smaller. */}
        <div className="grid sm:hidden  grid-cols-1 gap-4 mb-4">
          {/* SLIDER (Full Width) */}
          <div className="relative">
            <div className="relative h-50 md:h-125 overflow-hidden">
              {/* SLIDER CONTENT HERE (Identical to MD/SM slider content) */}
              {/* ... (AnimatePresence, motion.div, Image, Nav buttons, Dots) ... */}
              {isLoadingSlides ? (
                <HeroImageSkeleton currentSlide={currentSlide} />
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="absolute inset-0"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        sizes="100vw"
                        fill
                        src={slides[currentSlide]?.image}
                        alt={`Product ${currentSlide + 1}`}
                        className="w-full h-full object-cover"
                        priority={currentSlide === 0}
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}

              <button
                onClick={prevSlide}
                className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 rounded-full p-2 z-10"
              >
                <ChevronLeft className="md:size-6 size-4 text-slate-700" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 cursor-pointer top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 rounded-full p-2 z-10"
              >
                <ChevronRight className="md:size-6 size-4 text-slate-700" />
              </button>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {isLoadingSlides
                  ? ""
                  : slides?.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-3 rounded-full transition-all duration-300 ${
                          index === currentSlide
                            ? "bg-orange-500 w-8"
                            : "bg-white/60 hover:bg-white/80 w-3"
                        }`}
                      />
                    ))}
              </div>
            </div>
          </div>

          {/* SIDE CARDS (Stacked below the slider on mobile) */}
          <div className="grid grid-cols-2 gap-4">
            {/* Side-by-side on mobile */}
            {isLoadingSlides ? (
              <>
                <SlideCardSkeleton />
                <SlideCardSkeleton />
              </>
            ) : (
              sideCards?.map((card) => (
                <div
                  key={card.id}
                  className="h-full overflow-hidden relative group cursor-pointer transition-all duration-300"
                >
                  <div className="relative w-full h-full aspect-2/1">
                    <Image
                      sizes="100vw"
                      fill
                      src={card.image}
                      alt={`Side product`}
                      className="w-full h-full object-cover transition-transform duration-300"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Hero cards list */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6 px-2 sm:px-0"
      >
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded px-2 py-2 sm:px-4 sm:py-4 shadow hover:shadow-lg transition-all duration-300 group cursor-pointer"
          >
            <div className="flex items-center sm:items-start gap-2 sm:gap-4">
              <div className="bg-primary border border-gray-100 rounded-full p-2 sm:p-3 group-hover:scale-110 transition-transform duration-200">
                <feature.icon className="md:size-6 size-4 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-sm md:text-base text-slate-800 mb-1 group-hover:text-primary transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-sm md:block hidden text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </Container>
  );
};

export default HeroMain;
