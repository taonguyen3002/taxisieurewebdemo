"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { siteConfig } from "@/config/default.config";

type Slide = {
  id: number;
  image: string;
  title: string;
  description: string;
};

const slides: Slide[] = [
  {
    id: 1,
    image: "/slider1.png",
    title: "Đặt xe giá rẻ - Nhanh chóng",
    description: "Tận hưởng hành trình an toàn và tiện lợi cùng chúng tôi.",
  },
  {
    id: 2,
    image: "/grab-image-5.png",
    title: "Giao hàng siêu tốc toàn quốc",
    description: "Nhanh - Gọn - An toàn.",
  },
  {
    id: 3,
    image: "/slider2.png",
    title: "Taxi 4-7 chỗ toàn quốc",
    description: "Đón tận nơi, phục vụ 24/7.",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-20" : "opacity-0 z-10"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-8 md:px-16">
            <h2 className="text-white text-3xl md:text-5xl font-bold drop-shadow mb-3">
              {slide.title}
            </h2>
            <p className="text-white text-lg md:text-xl drop-shadow">
              {slide.description}
            </p>
            <a
              href={`tel:${siteConfig.contactInfo.phone}`}
              className="mt-6 w-max inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold text-sm md:text-base transition"
            >
              Gọi ngay: {siteConfig.contactInfo.phone}
            </a>
          </div>
        </div>
      ))}

      {/* Nút điều hướng */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full z-30"
        aria-label="Prev slide"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full z-30"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
