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

const HeroMain = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "/sample_banner.png",
    },
    {
      id: 2,
      image: "/sample_banner.png",
    },
  ];

  const sideCards = [
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
  ];

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
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="py-4 px-0 sm:px-2 lg:px-4">
      {/* Main Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-0 sm:mb-6 lg:mb-12">
        <div className="lg:col-span-2 relative">
          <div className="relative h-50 md:h-125 overflow-hidden">
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
              {slides.map((_, index) => (
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

        <div className="space-y-4 sm:space-y-8 grid md:flex flex-col grid-cols-2 gap-2">
          {sideCards.map((card, index) => (
            <div
              key={card.id}
              className=" md:h-[47%] h-25 overflow-hidden relative group cursor-pointer transition-all duration-300"
            >
              <div className="relative w-full h-full">
                <Image
                  sizes="100vw"
                  fill
                  src={card.image}
                  alt={`Side product ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

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
