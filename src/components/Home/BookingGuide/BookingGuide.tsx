"use client";

import { siteConfig } from "@/config/default.config";
import {
  PhoneIcon,
  MapPinIcon,
  DevicePhoneMobileIcon,
  TruckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

const steps = [
  {
    id: 1,
    title: "Bước 1: Truy Cập Website đặt xe",
    description: "Truy cập vào trang web" + siteConfig.domain,
    icon: <DevicePhoneMobileIcon className="w-10 h-10 text-green-600" />,
    image: "/anh-dai-dien-grab-3.png",
  },
  {
    id: 2,
    title: "Bước 2: Chọn Cách Đặt Xe",
    description: "Chọn Cách đặt xe bằng cách click vào góc phải dưới màn hình.",
    icon: <MapPinIcon className="w-10 h-10 text-green-600" />,
    image: "/taxi-4-cho.png",
  },
  {
    id: 3,
    title: "Bước 3: Điền Thông Tin",
    description: "Điền Đầy Đủ Thông Tin Theo Yêu Cầu ",
    icon: <TruckIcon className="w-10 h-10 text-green-600" />,
    image: "/slider1.png",
  },
  {
    id: 4,
    title: "Bước 4: Gọi đặt xe",
    description: "Nhấn đặt xe hoặc gọi trực tiếp tổng đài.",
    icon: <PhoneIcon className="w-10 h-10 text-green-600" />,
    image: "/slider2.png",
  },
];

const BookingGuide = () => {
  const [current, setCurrent] = useState(0);

  const nextStep = () => setCurrent((prev) => (prev + 1) % steps.length);
  const prevStep = () =>
    setCurrent((prev) => (prev - 1 + steps.length) % steps.length);

  useEffect(() => {
    const interval = setInterval(nextStep, 5000);
    return () => clearInterval(interval);
  }, []);

  const step = steps[current];

  return (
    <section className="px-4 md:px-8 py-10 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Hình ảnh */}
        <div className="relative w-full max-w-md mx-auto">
          <div className="relative w-full h-[300px] md:h-[360px] max-h-[400px]">
            <img
              src={step.image}
              alt={step.title}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>

        {/* Right: Mô tả bước */}
        <div className="relative w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-6">
            Hướng dẫn đặt xe
          </h2>

          <div className="flex items-start gap-4 transition duration-500">
            <div className="min-w-[48px]">{step.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>

          {/* Điều hướng */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={prevStep}
              className="flex items-center gap-1 text-green-600 hover:underline"
            >
              <ChevronLeftIcon className="w-5 h-5" />
              Trước
            </button>
            <div className="flex gap-2">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-3 h-3 rounded-full ${
                    current === idx ? "bg-green-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextStep}
              className="flex items-center gap-1 text-green-600 hover:underline"
            >
              Sau
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingGuide;
