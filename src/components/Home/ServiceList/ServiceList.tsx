"use client";

import Image from "next/image";

type Service = {
  img: string;
  title: string;
  desc: string;
};

const services: Service[] = [
  {
    img: "/taxi-4-cho.png",
    title: "Taxi 4 Chỗ",
    desc: "Di chuyển tiện lợi, nhanh chóng và tiết kiệm chi phí cho cá nhân hoặc gia đình nhỏ.",
  },
  {
    img: "/taxi-7-cho.jpg",
    title: "Taxi 7 Chỗ",
    desc: "Phù hợp cho nhóm bạn hoặc gia đình đông người, không gian rộng rãi, thoải mái.",
  },
  {
    img: "/taxi-lien-tinh.png",
    title: "Xe Đi Tỉnh",
    desc: "Chuyên tuyến liên tỉnh, đảm bảo an toàn, tài xế chuyên nghiệp, phục vụ tận nơi.",
  },
  {
    img: "/taxi-san-bay.png",
    title: "Giao Hàng Nhanh",
    desc: "Giao hàng siêu tốc trong ngày, phù hợp với shop, cửa hàng và cá nhân.",
  },
];

export default function ServiceList() {
  return (
    <section className="px-4 md:px-8 py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-green-700 mb-8">
          Dịch Vụ Của Chúng Tôi
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center gap-4"
            >
              <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-md">
                <Image
                  src={service.img}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 px-2">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
