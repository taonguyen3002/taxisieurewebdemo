import Image from "next/image";
import ClientMeta from "@/components/Client/ClientMetadata/ClientMetadata";
import { siteConfig } from "@/config/default.config";
import BreadcrumbsComponent from "@/components/Blogs/Breadcrumbs";
const services = [
  {
    title: "Taxi 4 Chỗ",
    description:
      "Phù hợp cho cá nhân hoặc gia đình nhỏ. Di chuyển linh hoạt trong nội thành và liên tỉnh.",
    image: "/taxi-4-cho.png",
  },
  {
    title: "Taxi 7 Chỗ",
    description:
      "Không gian rộng rãi cho nhóm bạn hoặc gia đình đông người. An toàn và tiện nghi.",
    image: "/taxi-7-cho.jpg",
  },
  {
    title: "Đặt Xe Liên Tỉnh",
    description:
      "Chuyên tuyến đi tỉnh, đảm bảo giờ giấc và sự thoải mái trong suốt hành trình.",
    image: "/taxi-lien-tinh.png",
  },
  {
    title: "Đặt Xe Hẹn Giờ",
    description:
      "Lên lịch sẵn cho các chuyến đi quan trọng. Đúng giờ – Đúng xe – Đúng giá.",
    image: "/grab-image-5.png",
  },
  {
    title: "Đưa Đón Sân Bay",
    description:
      "Phục vụ 24/7, đưa đón tận nơi đến tất cả sân bay lớn tại miền Nam.",
    image: "/taxi-san-bay.png",
  },
];

export default function AboutPage() {
  return (
    <>
      <ClientMeta
        title={siteConfig.name + " | Giới Thiệu"}
        slug="/about"
        isIndex={true}
        description={siteConfig.description + " | Giới Thiệu"}
      />
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="my-6">
          <BreadcrumbsComponent
            breadcrumbs={[{ name: "Trang Chủ", url: "/" }]}
            currentTitle="Giới Thiệu"
          />
        </div>
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-green-700">
            Giới Thiệu Dịch Vụ Taxi 4 & 7 Chỗ Miền Nam
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Chúng tôi là đơn vị chuyên cung cấp dịch vụ Taxi 4 chỗ & 7 chỗ tại
            Miền Nam. Với tiêu chí an toàn – đúng giờ – giá hợp lý, chúng tôi
            phục vụ đa dạng nhu cầu di chuyển của quý khách.
          </p>
        </div>

        {/* Danh sách dịch vụ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <div className="relative w-full h-48">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-green-700">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
