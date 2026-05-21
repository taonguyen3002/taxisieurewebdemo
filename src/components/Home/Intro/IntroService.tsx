import Image from "next/image";
import { siteConfig } from "@/config/default.config";

const TaxiServiceIntro = () => {
  return (
    <div className="px-4 md:px-8 pt-2 md:pt-4 pb-5 mt-2 md:mt-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Text Section */}
        <div className="md:col-span-8">
          <h2 className="text-red-600 text-lg font-semibold mb-2">
            Taxi - Tổng Đài Đặt Xe Toàn Quốc
          </h2>
          <h1
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg, #FFD700, #32CD32)",
              WebkitBackgroundClip: "text",
            }}
          >
            Dịch vụ Taxi 4 Chỗ, 7 Chỗ, Giao Hàng, Xe Máy
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-800">
            Chúng tôi cung cấp dịch vụ Taxi 4 chỗ, 7 chỗ, giao hàng và xe máy
            chất lượng cao, giá cả cạnh tranh, phục vụ 24/7 trên toàn quốc. Đảm
            bảo an toàn, đúng giờ và chuyên nghiệp.
          </p>
          <p className="mt-2 text-base md:text-lg text-gray-700">
            Hỗ trợ đặt xe đi tỉnh, thuê xe theo giờ, đưa đón sân bay, du lịch,
            đi chợ, giao hàng và nhiều dịch vụ tiện ích khác. Đáp ứng mọi nhu
            cầu di chuyển của bạn một cách linh hoạt và nhanh chóng.
          </p>
        </div>

        {/* Logo + Hotline Section */}
        <div className="hidden sm:flex md:col-span-4">
          <div className="flex flex-col items-center justify-center w-full shadow-lg rounded-lg p-4">
            <Image
              src="/grab-image-5.png"
              alt={siteConfig.name}
              width={200}
              height={100}
              className="object-contain"
            />
            <a
              href={`tel:${siteConfig.contactInfo.phone}`}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full transition"
            >
              HOTLINE: {siteConfig.contactInfo.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxiServiceIntro;
